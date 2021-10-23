import { Box, Button, CardContent, Typography } from '@material-ui/core'
import Card from '@material-ui/core/Card'
import styles from './Card.module.scss'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
	mainCard: {
		margin: '0 auto 35px',
		width: '310px',
		height: '190px',
		background: '-webkit-linear-gradient(270deg, #15fcc5,#00ccff)',
		background: 'linear-gradient(270deg, #15fcc5,#00ccff)',
		boxShadow: '3px 3px 12px 0px rgba(50, 50, 50, 0.33)'
	}
})

const BoxCard = ({ numberCard, endCard, typeCard, balanceCard }) => {
	const classes = useStyles()
	return (
		<Card className={classes.mainCard}>
			<CardContent className={styles.cardContent}>
				<Box className={styles.infoCard}>
					<Typography className={styles.numberCard}>
						{numberCard}
					</Typography>
					<Typography className={styles.endCard}>
						{endCard}
					</Typography>
				</Box>
				<Box>
					<Box>
						<Typography className={styles.typeCard}>
							{typeCard}
						</Typography>
						<Typography className={styles.balanceCard}>
							{balanceCard}
						</Typography>
					</Box>
					<svg src="./img/visa-logo.svg" alt="" height={30} objectFit='cover'></svg>
				</Box>
			</CardContent>
		</Card>
	)
}

export default BoxCard