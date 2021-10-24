import styles from './Info.module.scss'
import iconFastfood from './burger.svg'

const Info = ({ infoData, infoAuthor, infoSum }) => {
	return (
		<div className={styles.info}>
			<img className={styles.infoIcon} src={iconFastfood} alt="" />
			<div className={styles.infoContent}>
				<div className={styles.infoData}>
					{infoData}
				</div>
				<div className={styles.infoAuthor}>
					{infoAuthor}
				</div>
				<div className={styles.infoSum}>
					{infoSum}
				</div>
			</div>
			<div className={styles.infoFooter}>
				<div className={styles.infoPayment}>
					<div className={styles.infoPaymentText}>
						Способ оплаты
					</div>
					<div className={styles.infoPaymentCard}>
						3254
					</div>
				</div>
				<div className={styles.infoCommission}>
					<div className={styles.infoCommissionText}>
						Комиссия
					</div>
					<div className={styles.infoCommissionValue}>
						0 %
					</div>
				</div>
			</div>
		</div>
	);
};

export default Info;