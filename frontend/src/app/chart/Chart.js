import { ResponsivePie } from '@nivo/pie'
import { useState } from 'react'
import MCC from '../mcc.json'
import styles from './Chart.module.scss'
let _ = require('lodash')

const mccDecoder = (mcc) => {
  for (let i = 0; i < MCC.length; i++) {
    if ( Number(MCC[i].mcc) === mcc) {
      return MCC[i].edited_description
    }
  }
}

const calcValue = (values) => {
  let s = 0
  for (let i = 0; i < values.length; i++){
    s += values[i].amount
  }
  return String(s)
}

const mccIdentifier = (data) => {
  const mcc = []
  for (let i = 0; i < data.length; i++) {
    if (!mcc.includes(data[i].MCC) && data[i].MCC !== 0) {
      mcc.push(data[i].MCC)
    }
  }
  return mcc
}

const dateConverter = (data, type = 'month') => {
  // const months = [ "January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December" ]
  for (let i = 0; i < data.length; i++) {
    let property
    property = new Date(data[i].date).toUTCString()
    if (data[i].tranDate) {
      data[i].tranDate = property
    } else {
      data[i].date = property
    }
  }
}
const categorySumm = (data, mcc) => {
  let s = 0

  for (let i = 0; i < mcc.length; i++) {
    for (let j = 0; j < data[mcc[i]].length; j++) {
      s += data[mcc[i]][j].amount
    }
  }
  return s
}
const dataConverter = (data, type, period) => {
  let sortArray = []
  let othermcc = []
  dateConverter(data)
  let convertData = _.groupBy(data, 'MCC')
  const mcc = mccIdentifier(data)

  let summ = categorySumm(convertData, mcc)
  const other = (convertData, mcc) => {
    for (let i = 0; i < mcc.length; i++) {
      if ( ( (calcValue(convertData[mcc[i]]))/summ*100) <= 10) {
        console.log(`${mccDecoder(mcc[i]) } меньше чем 10%`)
        othermcc.push(mcc[i])
        // console.log(othermcc)
      }
    }
    
    
  }

  other(convertData, mcc)
  console.log(othermcc)
  const mcc2 = [6011, 6012] // WIP
  console.log(sortArray)
  for (let i = 0; i < mcc2.length; i++) {
      sortArray.push({
        'id': mccDecoder(mcc2[i]),
        'label': '',
        'mcc': mcc2[i],
        'value': calcValue(convertData[mcc2[i]]),
        'color': 'hsl(85, 70%, 50%)'
      })
    
  }
  sortArray.push(
    {
      'id': 'Прочее',
      'label': '',
      'mcc': othermcc,
      'value': categorySumm(convertData, othermcc),
      'color': 'hsl(85, 70%, 50%)'
    }
  )
  return sortArray
}


const Chart = ({ data }) => {

  const [type, setType] = useState('expenses')
  const [period, setPeriod] = useState('month')
  const initialDate = new Date()
  const [date, setDate] = useState(initialDate.getMonth())
  
  return (
    <>
    <ResponsivePie
        data={dataConverter(data.data, type, period)}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={0}
        activeOuterRadiusOffset={8}
        borderWidth={2}
        borderColor={{ from: 'color', modifiers: [ [ 'darker', 0.2 ] ] }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor='#fff'
        arcLinkLabelsThickness={3}
        arcLinkLabelsColor={{ from: 'color' }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{ from: 'color', modifiers: [ [ 'brighter', 2 ] ] }}
    />
    <div className={styles.buttons}>
      <div className={styles.chartTypes}>
        <button className={type === 'stonks' ? styles.active : ''} onClick={() => setType('stonks')}>Расходы</button>
        <button className={type === 'expenses' ? styles.active : ''} onClick={() => setType('expenses')}>Доходы</button>
        <button className={type === 'comparison' ? styles.active : ''} onClick={() => setType('comparison')}>Сравнение</button>
      </div>
      <div className={styles.chartPeriods}>
        <button className={period === 'year' ? styles.active : ''} onClick={() => setPeriod('year')}>Год</button>
        <button className={period === 'month' ? styles.active : ''} onClick={() => setPeriod('month')}>Месяц</button>
        <button className={period === 'week' ? styles.active : ''} onClick={() => setPeriod('week')}>Неделя</button>
        <button className={period === 'day' ? styles.active : ''} onClick={() => setPeriod('day')}>День</button>
      </div>
      <div className={styles.timeChange}>
        
        <button className={styles.decrement} onClick={() => setDate(date > 0 ? date - 1 : date)}>-</button>
        <p style={{color: '#fff'}}>Месяц {date}</p>
        <button className={styles.increment} onClick={() => setDate(date < 12? date + 1 : date)}>+</button>
      </div>
    </div>
    </>
  )
}

export default Chart