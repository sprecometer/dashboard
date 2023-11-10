"use client"
import styles from './page.module.css'
import MainBoard from './components/MainBoard'

export default function Home() {
  return (
    <main className={styles.main}>
      <MainBoard />
    </main>
  )
}
