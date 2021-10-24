import { ResponsivePie } from '@nivo/pie'
import { ResponsiveStream } from '@nivo/stream'
import { useState } from 'react'
import MCC from '../mcc.json'
import styles from './Chart.module.scss'
let _ = require('lodash')
const months = [ "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь","Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь" ]
export const mccDecoder = (mcc) => {
  for (let i = 0; i < MCC.length; i++) {
    if ( MCC[i].mcc === mcc) {
      return MCC[i].edited_description
    }
  }
}

const calcValue = (tranzaktions) => { // сумма в категории (mcc) за месяцы
  if (tranzaktions) {
  let s = 0
  for (let i = 0; i < tranzaktions.length; i++){
    s += tranzaktions[i].amount
  } return String(s)
  } 
}


const dateConverter = (data, date) => {
  for (let i = 0; i < data.length; i++) {
    let tranDate
    tranDate = new Date(data[i].date)
    if (data[i].tranDate) {
      data[i].tranDate = tranDate.toUTCString()
      data[i].monthNumber = tranDate.getUTCMonth()
    } else {
      data[i].date = tranDate.toUTCString()
      data[i].monthNumber = tranDate.getUTCMonth()
    } 
  }
  return _.groupBy(data, 'monthNumber')[date]
}
const categorySumm = (data, mcc) => {
  let s = 0
  for (let i = 1; i < mcc.length; i++) {
    for (let j = 0; j < data[mcc[i]].length; j++) {
      s += data[mcc[i]][j].amount
    }
  } return s
}

const dataConverterPercent = (data, date) => {
  let convertData = []
  let monthsData = []
  let All = []
  for (let i = 0; i < 12; i++) {
    
    convertData = dateConverter(data, i) // сортируем по дате
    convertData = _.groupBy(convertData, 'MCC') // сортируем по типу транзакции
    const mcc = Object.keys(convertData)
    const summMonth = categorySumm(convertData, mcc)
    let a = []
    for (let i = 0; i < mcc.length; i++) {
      if (mcc[i] === '0') {
        continue
      }
      let s = 0
      s = ( calcValue(convertData[mcc[i]]) / summMonth )* 100
      a.push(s)
    }
    if (a.length) {
      All.push(a)
    }
  }
  let gArray = []
  for (let i = 0; i < 8; i++) {
    gArray.push(
      {
        "Фастфуд": All[i][0],
        "Розничные магазины": All[i][1] || 0,
        "Снятие наличных": All[i][2] || 0,
        "Торговля и услуги": All[i][3] || 0,
        "Программирование": All[i][4] || 0
      }
    )
  }
  return gArray
}

let convertData = []
const dataConverter = (data, type, period, date) => {

  let sortArray = []
  convertData = dateConverter(data, date) // сортируем по дате
  convertData = _.groupBy(convertData, 'MCC') // сортируем по типу транзакции
  const mcc = Object.keys(convertData) // определяем номера транзацкций
  // заполняем сортированный массив
  for (let i = 0; i < mcc.length; i++) {
    if(mcc[i] === '0') { // временно пропускаем INSIDE транзакции
      continue
    }
      sortArray.push({
        'id': mccDecoder(mcc[i]),
        'label': '',
        'mcc': i,
        'value': calcValue(convertData[mcc[i]]),
        'color': 'hsl(85, 70%, 50%)'
      })
  }
  if (sortArray.length) {
    return sortArray
  } return []
}


const Chart = ({ data }) => {

  const [type, setType] = useState('expenses')
  const [period, setPeriod] = useState('month')
  const initialDate = new Date()
  const [chartType, setChartType] = useState('expenses')
  const [date, setDate] = useState(initialDate.getUTCMonth())
  dataConverterPercent(data, date)

  if (data) {
    return (
    <div className={styles.chart}>
      {chartType === 'expenses' ? (
        <div className={styles.timeChange}>
        <button className={styles.decrement} onClick={() => setDate(date > 0 ? date - 1 : date)}><svg width={15}  style={{transform: 'rotate(180deg)'}} viewBox='0 0 5 9'>
        <path d='M0.419,9.000 L0.003,8.606 L4.164,4.500 L0.003,0.394 L0.419,0.000 L4.997,4.500 L0.419,9.000 Z' />
        </svg></button>
        <ResponsivePie
            style={{position: 'relative'}}
            data={dataConverter(data, type, period, date)}
            margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
            enableArcLabels={false}
            innerRadius={0.7}
            padAngle={0.7}
            sortByValue={true}
            cornerRadius={0}
            enableArcLinkLabels={false}
            activeOuterRadiusOffset={10}
            borderWidth={2}
            borderColor={{ from: 'color', modifiers: [ [ 'darker', 0.2 ] ] }}
            arcLabelsSkipAngle={10}
        />
          <h2 className={styles.date}>{months[date]} 2021</h2>
          {dataConverter(data, type, period, date).length ? <p className={styles.summ}>{categorySumm(convertData, Object.keys(convertData))} руб.</p> : <p className={styles.expenses}>Расходы отсутвтуют</p>}
          <button className={styles.increment} onClick={() => setDate(date < 11 ? date + 1 : date)}><svg width={15}  viewBox="0 0 5 9">
          <path d="M0.419,9.000 L0.003,8.606 L4.164,4.500 L0.003,0.394 L0.419,0.000 L4.997,4.500 L0.419,9.000 Z" /></svg></button>
          </div>
        ):
        (
          <div className={styles.streamGraph}>
            <ResponsiveStream
            data={dataConverterPercent(data)}
            keys={[ 'Фастфуд', 'Розничные магазины', 'Снятие наличных', 'Торговля и услуги', 'Программирование']}
            margin={{ top: 50, right: 60, bottom: 50, left: 60 }}
            offsetType="expand"
            axisTop={null}
            axisRight={null}
            axisBottom={{
                orient: 'bottom',
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: '',
                legendOffset: 36
            }}
            enableDots={true}
            axisLeft={{ orient: 'left', tickSize: 5, tickPadding: 5, tickRotation: 0, legend: '', legendOffset: -40 }}
            enableGridX={true}
            enableGridY={false}
            offsetType="silhouette"
            colors={{ scheme: 'nivo' }}
            fillOpacity={0.85}
            borderColor={{ theme: 'background' }}
            defs={[
                {
                    id: 'dots',
                    type: 'patternDots',
                    background: 'inherit',
                    color: '#2c998f',
                    size: 4,
                    padding: 2,
                    stagger: true
                },
                {
                    id: 'squares',
                    type: 'patternSquares',
                    background: 'inherit',
                    color: '#e4c912',
                    size: 6,
                    padding: 2,
                    stagger: true
                }
            ]}
            fill={[
                {
                    match: {
                        id: 'Paul'
                    },
                    id: 'dots'
                },
                {
                    match: {
                        id: 'Marcel'
                    },
                    id: 'squares'
                }
            ]}
            dotSize={8}
            dotColor={{ from: 'color' }}
            dotBorderWidth={2}
            dotBorderColor={{ from: 'color', modifiers: [ [ 'darker', 0.7 ] ] }}/>
          </div>
        )
      }
      <div className={styles.buttons}>
        <div className={styles.chartTypes}>
          <button className={type === 'expenses' ? styles.active : ''} onClick={() => 
          {
            setType('expenses')
            setChartType('expenses')
          }}>Расходы</button>
          <button className={type === 'comparison' ? styles.active : ''} onClick={() => {
            setType('comparison')
            setChartType('comparison')
          }}>Сравнение расходов</button>
        </div>
        <div className={styles.chartPeriods}>
          <button className={period === 'year' ? styles.active : ''} onClick={() => setPeriod('year')}>Год</button>
          <button className={period === 'month' ? styles.active : ''} onClick={() => setPeriod('month')}>Месяц</button>
          <button className={period === 'week' ? styles.active : ''} onClick={() => setPeriod('week')}>Неделя</button>
          <button className={period === 'day' ? styles.active : ''} onClick={() => setPeriod('day')}>День</button>
        </div>
        </div>
      </div>
    )
  } return null
}

export default Chart