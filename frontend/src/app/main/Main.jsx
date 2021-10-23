import Card from '../card/Card'
import styles from './Main.module.scss'

const Main = () => {
    return(
        <div style={{position: 'relative'}}>
            <div className={styles.block}></div>
            <Card/>
            <div className={styles.purse}><b>10000 руб.</b></div>
        </div>
    )
}

export default Main