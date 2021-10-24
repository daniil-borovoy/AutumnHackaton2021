import { useCallback, useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Switch, NavLink } from 'react-router-dom'
import styles from './App.module.scss'
import Chart from './chart/Chart'
import Main from './main/Main'
import { useHttp } from '../hooks/http.hook'
import TransactionList from './TransactionList/TransactionList'
import BottomMenu from './bottomMenu/BottomMenu'

function App() {
	const isMobile = (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
	const [data, setData] = useState(null)
	const { loading, request } = useHttp()
	const getData = useCallback(async () => {
		try {
			const userData = await request('api/get', 'GET', null, {})
			setData(userData)
		} catch (e) { console.log(e) }
	}, [request])

	useEffect(() => {
		getData()
	}, [])
	if (data) {
		return (
			<div className={styles.app}>
				<Main/>
				<Router>
					<div className={styles.navButtons}>
						<NavLink activeClassName={styles.activeNavButton} to='/chart' >
							<button className={styles.navButton}>График</button>
						</NavLink>
						<NavLink activeClassName={styles.activeNavButton} to='/transactions' >
							<button className={styles.navButton}>Транзакции</button>
						</NavLink>
					</div>
					<Switch>
						<Route path='/chart'><Chart data={data} /></Route>
						<Route path='/transactions'><TransactionList data={data}/></Route>
					</Switch>
				</Router>
				<BottomMenu/>
				{ isMobile ? null :
					<div className={styles.log}>
						<h1>Для запустка приложения необходим мобильный телефон!</h1>
					</div>
				}
			</div>
		)
	} return null
}

export default App