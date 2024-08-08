import Layout from "../../components/layout"
import { GetStaticProps, GetStaticPaths } from "next";
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { getAllPostIds, getPostData } from '../../lib/posts'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import { Suspense, HTMLProps, PropsWithoutRef, } from "react";
import {Raleway, Open_Sans} from "next/font/google";

const raleway = Raleway({ weight: '500', subsets: ['latin'] });
const openSans = Open_Sans({ subsets: ['latin'] });

export function getPostDateStr(date: string) {
  const event = new Date(date);
  return event.toLocaleDateString(undefined,
      { year: 'numeric', month: 'short', day: 'numeric' });
}

const components = { Image, YouTube: (props: {videoId: string}) => {
  return <a href={`https://youtube.com/watch?v=${props.videoId}`}>YouTube Link</a>
}};

export default function Post(
  {
    postData
  }: {
    postData: {
      id: string
      title: string
      date: string
      description: string
      content: MDXRemoteSerializeResult
    }
  }
) {
  return (
    <Layout key={postData.id}>
      <Head>
        <title>{postData.title}</title>
        <meta name="description" content={postData.description} />
      </Head>
      <article className={openSans.className}>
        <section className="article-header">
          <section className="article-header-flex-section">
            <ul className={`${raleway.className} article-header-flex`} style={{ width: "fit-content" }}>
              <li key={'site-name'}><Link href="/"><h1 className={raleway.className}>yourWaifu</h1></Link></li>
            </ul>
            <ul className="article-header-flex right-menu">
              <li key={'github-link'}><a href="https://github.com/yourWaifu" aria-label="GitHub"><i className="fab fa-github fa-2x" ></i></a></li>
            </ul>
          </section>
          <section className="article-header-info">
            <h1 className={`${raleway.className} article-header-title`}>{postData.title}</h1>
            <div><p>written on {getPostDateStr(postData.date)} by Hao Qi Wu</p></div>
          </section>
        </section>
        <div className="article">
          <section className="article-content">
            <MDXRemote {...postData.content} components={components}/>
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