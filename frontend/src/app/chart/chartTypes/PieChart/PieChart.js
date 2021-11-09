import React from 'react'
import { ResponsivePie } from '@nivo/pie'
import styles from './PieChart.module.scss'

export const PieChart = ({
  data,
  setDate,
  date,
  dataConverter,
  period,
  months,
  type,
  convertData,
  categorySumm,
  getConvertData,
}) => (
  <div className={styles.timeChange}>
    <button
      className={styles.decrement}
      onClick={() => setDate(date > 0 ? date - 1 : date)}
    >
      <svg width={15} style={{ transform: 'rotate(180deg)' }} viewBox="0 0 5 9">
        <path d="M0.419,9.000 L0.003,8.606 L4.164,4.500 L0.003,0.394 L0.419,0.000 L4.997,4.500 L0.419,9.000 Z" />
      </svg>
    </button>
    <ResponsivePie
      data={dataConverter(data, null, period, date)}
      margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
      enableArcLabels={false}
      innerRadius={0.8}
      enableArcLinkLabels={false}
      activeOuterRadiusOffset={20}
      borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
      arcLabelsSkipAngle={10}
    />
    <h2 className={styles.date}>{months[date]} 2021</h2>
    {dataConverter(data, type, period, date).length ? (
      <p className={styles.summ}>
        {categorySumm(
          getConvertData(data, date),
          Object.keys(getConvertData(data, date))
        )}{' '}
        руб.
      </p>
    ) : (
      <p className={styles.expenses}>Расходы отсутвтуют</p>
    )}
    <button
      className={styles.increment}
      onClick={() => setDate(date < 11 ? date + 1 : date)}
    >
      <svg width={15} viewBox="0 0 5 9">
        <path d="M0.419,9.000 L0.003,8.606 L4.164,4.500 L0.003,0.394 L0.419,0.000 L4.997,4.500 L0.419,9.000 Z" />
      </svg>
    </button>
  </div>
)
