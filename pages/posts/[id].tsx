import Layout from "../../components/layout"
import { GetStaticProps, GetStaticPaths } from "next";
import Head from 'next/head'
import Link from 'next/link'
import { getAllPostIds, getPostData } from '../../lib/posts'

export function getPostDateStr(date: string) {
  const event = new Date(date);
  return event.toLocaleDateString(undefined,
      { year: 'numeric', month: 'short', day: 'numeric' });
}

export default function Post(
  {
    postData
  }: {
    postData: {
      id: string
      title: string
      date: string
      content: string
    }
  }
) {
  return (
    <Layout key={postData.id}>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <section className="article-header">
          <section className="article-header-flex-section">
            <ul className="article-header-flex" style={{ width: "fit-content" }}>
              <li key={'site-name'}><Link href="/"><a><h1>yourWaifu</h1></a></Link></li>
            </ul>
            <ul className="article-header-flex right-menu">
              <li key={'github-link'}><a href="https://github.com/yourWaifu"><i className="fab fa-github fa-2x" ></i></a></li>
            </ul>
          </section>
          <section className="article-header-info">
            <h1 className="article-header-title">{postData.title}</h1>
            <div><p>written on {getPostDateStr(postData.date)} by Hao Qi Wu</p></div>
          </section>
        </section>
        <div className="article">
          <section className="article-content">
            <div dangerouslySetInnerHTML={{ __html: postData.content }} />
          </section>
        </div>
      </article>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getAllPostIds();
  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postData = await getPostData(params?.id as string);
  return {
    props: {
      postData
    }
  }
}