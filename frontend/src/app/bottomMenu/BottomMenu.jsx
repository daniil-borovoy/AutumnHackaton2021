import styles from './BottomMenu.module.scss'
import creditSvg from './creditCard.svg'
import notifSvg from './notification.svg'
import menuSvg from './menu.svg'
import transaction from './transaction.svg'
const BottomMenu = () => {
    return(
        <div className={styles.menu}>
            <div className={styles.subMenu}>
                <div className={styles.imgBlock}><img src={creditSvg} alt="" /></div>
                <div className={styles.textMenu}>Главная</div>
            </div>
            <div className={styles.subMenu}>
                <div className={styles.imgBlock}><img src={transaction} alt="" /></div>
                <div className={styles.textMenu}>Операции</div>
            </div>
            <div className={styles.subMenu}>
                <div className={styles.imgBlock}><img src={notifSvg} alt="" /></div>
                <div className={styles.textMenu}>Уведомления</div>
            </div>
            <div className={styles.subMenu}>
                <div className={styles.imgBlock}><img src={menuSvg} alt="" /></div>
                <div className={styles.textMenu}>Меню</div>
            </div>
        </div>
    )
}

export default BottomMenu