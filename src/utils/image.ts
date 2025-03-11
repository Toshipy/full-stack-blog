import path from 'path'
import { writeFile } from 'fs/promises'
import { supabase } from '@/lib/supabase'

export async function saveImage(file: File): Promise<string | null> {
  const useSupabase = process.env.NEXT_PUBLIC_SUPABASE_STORAGE === 'true'

  if (useSupabase) {
    return await saveImageToSupabase(file)
  } else {
    return await saveImageToLocal(file)
  }
}

export async function saveImageToLocal(file: File): Promise<string | null> {
  const buffer = Buffer.from(await file.arrayBuffer())
  const fileName = `${Date.now()}_${file.name}`
  const uploadDir = path.join(process.cwd(), 'public/images')
  const filePath = path.join(uploadDir, fileName)

  try {
    await writeFile(filePath, buffer)
    return `/images/${fileName}`
  } catch (error) {
    console.error('Error saving image:', error)
    return null
  }
}

export async function saveImageToSupabase(file: File): Promise<string | null> {
  const fileName = `${Date.now()}_${file.name}`
  const { error } = await supabase.storage
    .from('full_stack_blog_bucket')
    .upload(fileName, file, {
      cacheControl: '3600',
      upsert: false
    })

  if (error) {
    console.error('Error saving image:', error)
    return null
  }

  const { data: publicUrlData } = supabase.storage
    .from('full_stack_blog_bucket')
    .getPublicUrl(fileName)

  return publicUrlData.publicUrl
}
