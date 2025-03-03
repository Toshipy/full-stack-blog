import Image from 'next/image'

export const dynamic = 'force-dynamic' //SSR

export default async function SSRPage() {
  const res = await fetch('https://dog.ceo/api/breeds/image/random', {
    cache: 'no-store'
  })
  const data = await res.json()
  const image = data.message
  const timestamp = new Date().toISOString()
  return (
    <div>
      <h1>SSR</h1>
      <Image src={image} alt="犬の画像" width={500} height={500} />
      <p>{timestamp}</p>
    </div>
  )
}
