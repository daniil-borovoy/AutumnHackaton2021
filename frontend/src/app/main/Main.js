import React from 'react'
import { Card } from '../card/Card'
import styles from './Main.module.scss'

export const Main = ({ navToogle, setNavToogle }) => {
  return (
    <>
      <div style={{ position: 'relative' }}>
        <div className={styles.block}></div>
        <Card />
        <div className={styles.purse}>
          <b>10000 руб.</b>
        </div>
      </div>
      <div className={styles.navButtons}>
        <button
          onClick={() => setNavToogle(false)}
          className={
            !navToogle
              ? styles.navButton + ' ' + styles.activeNavButton
              : styles.navButton
          }
        >
          График
        </button>
        <button
          onClick={() => setNavToogle(true)}
          className={
            navToogle
              ? styles.navButton + ' ' + styles.activeNavButton
              : styles.navButton
          }
        >
          Транзакции
        </button>
      </div>
    </>
  )
}
