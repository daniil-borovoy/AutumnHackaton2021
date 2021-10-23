import { useCallback, useEffect, useState } from 'react'
import logo from '../logo.svg'
import styles from './App.module.scss'
import Chart from './chart/Chart'
import { useHttp } from '../hooks/http.hook'

function App() {
  const [data, setData] = useState(null)
  const {loading, request} = useHttp()
  const getData = useCallback(async () => {
    try {
      const userData = await request ('get', 'GET', null, {})
      setData(userData)
    } catch (e) {console.log(e)}
  }, [request])

  useEffect(() => {
    getData()
  }, [])
  if(data){
    return (
      <div className={styles.logo}>
        <Chart data={data}/>
      </div>
    )}

    return (
      <div className={styles.logo}>
      </div>
    )
}

export default App