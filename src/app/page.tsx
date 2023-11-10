"use client"
import styles from './page.module.css'
import Layout from './components/Layout'
import MainBoard from './components/MainBoard'

export default function Home() {
  return (
    <main className={styles.main}>
      <Layout >
        <MainBoard />
      </Layout>
    </main>
  )
}
