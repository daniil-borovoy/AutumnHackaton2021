import { useCallback, useEffect, useState } from 'react'
import logo from '../logo.svg'
import styles from './App.module.scss'
import Chart from './chart/Chart'
import Main from './main/Main'
import { useHttp } from '../hooks/http.hook'
import BoxCard from './card/Card'
import Transaction from './transaction/Transaction'

function App() {
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
			<div className={styles.logo}>
				{/* <Chart data={data} /> */}
        <Main/>
			</div>
		)
	}

	return (
		<div className={styles.logo}>
		</div>
	)
}

export default App

{/* <div className={styles.logo}>
			<img width={100} src={logo} alt='logo'></img>
			<Container maxWidth="xs">
				<BoxCard endCard="12/24" numberCard="8800" typeCard="Platinume" balanceCard="10 230 000 P" />
				<Button
					variant='contained'
					className={styles.button}
				>
					История операций
				</Button>
				<Transaction nameTransaction="Альфа-банк" sphereTransaction="еда" valueTransaction="18 829 р" />
			</Container>
		</div> */}