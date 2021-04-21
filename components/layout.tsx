import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import * as React from "react"

const name = "Hao-Qi Wu"

export default function BlogLayout(
  {
    children
  }: {
    children: React.ReactNode
  }
) {
  React.useEffect(()=> {
    document.documentElement.lang = "en";
  });

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <link href="https://fonts.googleapis.com/css?family=Raleway:300" rel="stylesheet" />
        <link href='https://fonts.googleapis.com/css?family=Open+Sans:400,700' rel='stylesheet' type='text/css' />
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.3.1/css/all.css" integrity="sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU" crossOrigin="anonymous" />
        <link rel="stylesheet" type="text/css" href="/style.css" media="screen" />

        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main style={{top: 0, left: 0, right: 0, bottom: 0, position: "absolute"}}>{children}</main>
    </>
  );
}