import { Button, Container } from '@material-ui/core';
import logo from '../logo.svg'
import styles from './App.module.scss'
import BoxCard from './card/Card';
import Transaction from './transaction/Transaction';


function App() {
	return (
		<div className={styles.logo}>
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
		</div>
	)
}

export default App;
