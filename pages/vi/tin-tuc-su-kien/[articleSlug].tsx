import { fetchArticleSlugs } from '@/libs/static-build/articlePaths'
import { ArticleDetailContainer } from '@/plugins/front/article/components'
import { GetStaticPaths, GetStaticProps } from 'next'

export default function BlogDetailsPage() {
  return (
    <>
      <ArticleDetailContainer />
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  // Fetch both 'news' and 'event' types
  const [newsSlugs, eventSlugs] = await Promise.all([
    fetchArticleSlugs('vi', 'news'),
    fetchArticleSlugs('vi', 'event'),
  ])

  // Combine and deduplicate slugs
  const allSlugs = Array.from(new Set([...newsSlugs, ...eventSlugs]))

  return {
    paths: allSlugs.map((articleSlug) => ({
      params: {
        articleSlug,
      },
    })),
    fallback: 'blocking', // Cho phép render dynamic routes không có trong paths
  }
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  }
}
