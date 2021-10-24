import styles from './Transaction.module.scss'

const Transaction = ({ nameTransaction, sphereTransaction, valueTransaction }) => {
	return (
		<div className={styles.transaction}>
			<img className={styles.transactionLogo} src="https://yt3.ggpht.com/ytc/AAUvwnjFk8FtWP1WUuDewIKdgQntT-ybNi9ufQtBcyYU=s900-c-k-c0x00ffffff-no-rj" alt="" />
			<div className={styles.transactionInfo}>
				<div className={styles.transactionContent}>
					<div className={styles.transactionName}>
						{nameTransaction}
					</div>
					<div className={styles.transactionSphere}>
						{sphereTransaction}
					</div>
				</div>
				<div className={styles.transactionValue}>
					{valueTransaction}
				</div>
			</div>
		</div>
	);
};

export default Transaction;