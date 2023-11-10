"use client"
import styles from './page.module.css'
import AppLayout from './components/AppLayout'
import MainBoard from './components/MainBoard'

export default function Home() {
  return (
    <main className={styles.main}>
      <AppLayout >
        <MainBoard />
      </AppLayout>
    </main>
  )
}
