import React from 'react'
import { useState } from 'react'
import { PieChart } from './chartTypes/PieChart/PieChart'
import { StreamChart } from './chartTypes/StreamChart/StreamChart'
import styles from './Chart.module.scss'
import {
  dataConverter,
  dataConverterPercent,
  months,
  convertData,
  categorySumm,
  getConvertData,
} from './functions'

const Chart = ({ data }) => {
  const [type, setType] = useState('expenses')
  const [period, setPeriod] = useState('month')
  const initialDate = new Date()
  const [chartType, setChartType] = useState('expenses')
  const [date, setDate] = useState(initialDate.getUTCMonth())

  const chartTypeHandler = (chartType) => {
    if (chartType === 'expenses') {
      return (
        <PieChart
          data={data}
          setDate={setDate}
          date={date}
          dataConverter={dataConverter}
          type={type}
          period={period}
          months={months}
          categorySumm={categorySumm}
          convertData={convertData}
          dataConverterPercent={dataConverterPercent}
          getConvertData={getConvertData}
        />
      )
    } else if (chartType === 'stonks') {
      return (
        <>
          <StreamChart
            data={data}
            setDate={setDate}
            date={date}
            dataConverter={dataConverter}
            type={type}
            period={period}
            months={months}
            categorySumm={categorySumm}
            convertData={convertData}
            dataConverterPercent={dataConverterPercent}
          />
        </>
      )
    } else {
      return null
    }
  }

  if (data) {
    return (
      <>
        <div className={styles.toogleChartButtons}>
          <button
            className={
              chartType === 'expenses'
                ? styles.toogleChartButton + ' ' + styles.active
                : styles.toogleChartButton
            }
            onClick={() => setChartType('expenses')}
          >
            Бублик
          </button>
          <button
            className={
              chartType === 'stonks'
                ? styles.toogleChartButton + ' ' + styles.active
                : styles.toogleChartButton
            }
            onClick={() => setChartType('stonks')}
          >
            Точечный
          </button>
        </div>
        <div className={styles.chart}>{chartTypeHandler(chartType)}</div>
      </>
    )
  }
  return null
}

export default Chart
