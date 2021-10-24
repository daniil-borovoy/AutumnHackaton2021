import styles from './Transaction.module.scss'

const Transaction = ({ nameTransaction, sphereTransaction, valueTransaction, mccImg }) => {

	return (
		<div className={styles.transaction}>
			<img className={styles.transactionLogo} src={mccImg} alt="" />
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