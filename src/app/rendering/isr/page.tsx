import Image from 'next/image'

export const revalidate = 10 //ISR

export default async function ISRPage() {
  const res = await fetch('https://dog.ceo/api/breeds/image/random', {
    next: {
      revalidate: 10
    }
  })
  const data = await res.json()
  const image = data.message
  const timestamp = new Date().toISOString()
  return (
    <div>
      <h1>ISR</h1>
      <Image src={image} alt="犬の画像" width={500} height={500} />
      <p>{timestamp}</p>
    </div>
  )
}
