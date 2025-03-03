import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ブログ一覧記事',
  description: 'ブログ一覧記事です'
}

// Dummy
const articles = [
  { id: 1, title: 'Post 1' },
  { id: 2, title: 'Post 2' },
  { id: 3, title: 'Post 3' }
]

// 3秒かかる処理
async function getArticles() {
  await new Promise(resolve => setTimeout(resolve, 3000))
  return articles
}

export default async function BlogPage() {
  const articles = await getArticles()
  return (
    <div>
      <h1>Blog</h1>
      <ul>
        {articles.map(article => (
          <li key={article.id}>{article.title}</li>
        ))}
      </ul>
    </div>
  )
}
