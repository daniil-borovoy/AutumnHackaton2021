import styles from './Transaction.module.scss'

const Transaction = ({ nameTransaction, sphereTransaction, valueTransaction }) => {
	return (
		<div className={styles.transaction}>
			<img className={styles.transactionLogo} src="https://is2-ssl.mzstatic.com/image/thumb/Purple124/v4/76/96/ff/7696fffc-19d4-f201-3c4f-6b3a7b4d3411/AppIcon-fora-1x_U007emarketing-0-10-0-sRGB-85-220.png/1200x630wa.png" alt="" />
			<div className={styles.transactionInfo}>
				<div className={styles.transactionContent}>
					<p className={styles.transactionName}>
						{nameTransaction}
					</p>
					<p className={styles.transactionSphere}>
						{sphereTransaction}
					</p>
				</div>
				<div className={styles.transactionValue}>
					{valueTransaction}
				</div>
			</div>
		</div>
	);
};

export default Transaction;

{/* <div className={styles.transaction}>
	<Box className={styles.nameTransaction}>
		<img className={styles.cardMedia} src="https://is2-ssl.mzstatic.com/image/thumb/Purple124/v4/76/96/ff/7696fffc-19d4-f201-3c4f-6b3a7b4d3411/AppIcon-fora-1x_U007emarketing-0-10-0-sRGB-85-220.png/1200x630wa.png" alt="" />
		<Box>
			<Typography>
				{nameTransaction}
			</Typography>
			<Typography>
				{sphereTransaction}
			</Typography>
		</Box>
	</Box>
	<Typography>
		{valueTransaction}
	</Typography>

</div> */}