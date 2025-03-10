import path from 'path'
import { writeFile } from 'fs/promises'

export async function saveImage(file: File): Promise<string | null> {
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
