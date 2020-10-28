import Head from 'next/head';
import Link from 'next/link';

import styles from '../styles/Home.module.css';
import Button from '../components/Button';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>SalesLoft Code Test</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Link href="/frequenceUniqueChars" passHref>
          <Button>Frequency of Unique Characters</Button>
        </Link>
        <Link href="/duplicatePeople" passHref>
          <Button>Duplicate People</Button>
        </Link>
      </main>
    </div>
  )
}
