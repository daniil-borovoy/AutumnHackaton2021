import React, { useCallback, useEffect, useState } from 'react'
import styles from './App.module.scss'
import Chart from './chart/Chart'
import Main from './main/Main'
import { useHttp } from '../hooks/http.hook'
import TransactionList from './transactionList/TransactionList'
import BottomMenu from './bottomMenu/BottomMenu'

function App() {
  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
  const [data, setData] = useState(null)
  const [navToogle, setNavToogle] = useState(false)
  const { request } = useHttp()

  const fetchData = useCallback(async () => {
    try {
      const userData = await request('api/get', 'GET', null, {})
      setData(userData)
    } catch (e) {
      console.log(e)
    }
  }, [request])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  if (data) {
    if (!isMobile) {
      return (
        <div className={styles.desktopLog}>
          <h1>Для запустка этого приложения необходим мобильный телефон!</h1>
        </div>
      )
    }
    return (
      <>
        <Main navToogle={navToogle} setNavToogle={setNavToogle} />
        {!navToogle ? <Chart data={data} /> : <TransactionList data={data} />}
        <BottomMenu />
      </>
    )
  }
  return null
}

export default App
