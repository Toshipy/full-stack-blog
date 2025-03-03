import Image from 'next/image'

export default async function SSGPage() {
  const res = await fetch('https://dog.ceo/api/breeds/image/random', {
    cache: 'force-cache'
  })
  const data = await res.json()
  const image = data.message
  const timestamp = new Date().toISOString()
  return (
    <div>
      <h1>SSG</h1>
      <Image src={image} alt="犬の画像" width={500} height={500} />
      <p>{timestamp}</p>
    </div>
  )
}
