import React from 'react'
import { ResponsiveStream } from '@nivo/stream'
import styles from './StreamChart.module.scss'

export const StreamChart = ({ data, dataConverterPercent }) => {
  console.log(dataConverterPercent(data))
  return (
    <div className={styles.streamGraph}>
      <ResponsiveStream
        data={dataConverterPercent(data)}
        keys={[
          'Фастфуд',
          'Розничные магазины',
          'Снятие наличных',
          'Торговля и услуги',
          'Программирование',
        ]}
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
          legendOffset: 36,
        }}
        enableDots={true}
        axisLeft={{
          orient: 'left',
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: '',
          legendOffset: -40,
        }}
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
            stagger: true,
          },
          {
            id: 'squares',
            type: 'patternSquares',
            background: 'inherit',
            color: '#e4c912',
            size: 6,
            padding: 2,
            stagger: true,
          },
        ]}
        fill={[
          {
            match: {
              id: 'Paul',
            },
            id: 'dots',
          },
          {
            match: {
              id: 'Marcel',
            },
            id: 'squares',
          },
        ]}
        dotSize={8}
        dotColor={{ from: 'color' }}
        dotBorderWidth={2}
        dotBorderColor={{ from: 'color', modifiers: [['darker', 0.7]] }}
      />
    </div>
  )
}
