import Card from '../card/Card'
import styles from './Main.module.scss'

const Main = () => {
    return(
        <div style={{position: 'relative'}}>
            <div className={styles.block}></div>
            <Card className={styles.card}/>
        </div>
    )
}

export default Main