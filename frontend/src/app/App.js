// import logo from '../logo.svg'
import styles from './App.module.scss'
import userData from './data.json'
import Chart from './chart/Chart'

function App() {
  return (
    <div className={styles.logo}>
      <Chart data={userData}/>
    </div>
  )
}

export default App
