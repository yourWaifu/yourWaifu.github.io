import { AppProps } from 'next/app'
import './styles.css'
import "../public/style.css";
import Router from 'next/router'
import { fadeOut } from '../lib/fade-out'

export default function App({ Component, pageProps }: AppProps) {
    Router.events.on('routeChangeStart', (url) => {
        fadeOut();
    })

    return <Component {...pageProps} />
}