import type { NextPage } from 'next'
import Head from 'next/head'
import QRCodeGenerator from '../components/QRCodeGenerator'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Generador de Código QR</title>
        <meta name="description" content="Generador de Código QR con Next.js" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Bienvenido al Generador de Código QR
        </h1>

        <QRCodeGenerator />
      </main>
    </div>
  )
}

export default Home