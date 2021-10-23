import { ResponsivePie } from '@nivo/pie'
import { useState } from 'react'
import MCC from '../mcc.json'
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

const dateConverter = (data) => {
  let converted = _.groupBy(data, (e) => e.tranDate)
  console.log(converted) 
  return converted
}

const dataConverter = (data, type, period) => {

  let sortArray = []
  dateConverter(data)
  let convertData = _.groupBy(data, 'MCC')
  const mcc = mccIdentifier(data)

  for (let i = 0; i < mcc.length; i++) {
    sortArray.push({
      'id': mccDecoder(mcc[i]),
      'label': '',
      'value': calcValue(convertData[mcc[i]]),
      'color': 'hsl(85, 70%, 50%)'
    })
  }
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
        arcLinkLabelsTextColor='#333333'
        arcLinkLabelsThickness={3}
        arcLinkLabelsColor={{ from: 'color' }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{ from: 'color', modifiers: [ [ 'darker', 2 ] ] }}
    />
    <button onClick={() => setType('stonks')}>Расходы</button>
      <button onClick={() => setType('expenses')}>Доходы</button>
      <button onClick={() => setType('comparison')}>Сравнение</button>
      <div>
        <button onClick={() => setPeriod('year')}>Год</button>
        <button onClick={() => setPeriod('month')}>Месяц</button>
        <button onClick={() => setPeriod('week')}>Неделя</button>
        <button onClick={() => setPeriod('day')}>День</button>
      </div>
      <p>{period} - {date}</p>
      <button onClick={() => setDate(date < 12? date + 1 : date)}>+</button>
      <p>{period}</p>
      <button onClick={() => setDate(date > 0 ? date - 1 : date)}>-</button>
      </>
  )
}

export default Chart