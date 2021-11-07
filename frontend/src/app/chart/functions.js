import MCC from '../mcc.json'
import _ from 'lodash'

export const months = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь',
]

export const mccDecoder = (mcc) => {
  for (let i = 0; i < MCC.length; i++) {
    if (MCC[i].mcc === mcc) {
      return MCC[i].edited_description
    }
  }
}

export const calcValue = (tranzaktions) => {
  // сумма в категории (mcc) за месяцы
  if (tranzaktions) {
    let s = 0
    for (let i = 0; i < tranzaktions.length; i++) {
      s += tranzaktions[i].amount
    }
    return String(s)
  }
}

export const dateConverter = (data, date) => {
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

export const categorySumm = (data, mcc) => {
  let s = 0
  for (let i = 1; i < mcc.length; i++) {
    for (let j = 0; j < data[mcc[i]].length; j++) {
      s += data[mcc[i]][j].amount
    }
  }
  return s
}

export const dataConverterPercent = (data, date) => {
  let convertData = []
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
      s = (calcValue(convertData[mcc[i]]) / summMonth) * 100
      a.push(s)
    }
    if (a.length) {
      All.push(a)
    }
  }
  let gArray = []
  for (let i = 0; i < 8; i++) {
    gArray.push({
      Фастфуд: All[i][0],
      'Розничные магазины': All[i][1] || 0,
      'Снятие наличных': All[i][2] || 0,
      'Торговля и услуги': All[i][3] || 0,
      Программирование: All[i][4] || 0,
    })
  }
  return gArray
}

export let convertData = []

export const getConvertData = (data, date) => {
  let convertData = data
  convertData = dateConverter(data, date) // сортируем по дате
  convertData = _.groupBy(convertData, 'MCC') // сортируем по типу транзакции
  return convertData
}
export const dataConverter = (data, type, period, date) => {
  let sortArray = []
  convertData = dateConverter(data, date) // сортируем по дате
  convertData = _.groupBy(convertData, 'MCC') // сортируем по типу транзакции
  const mcc = Object.keys(convertData) // определяем номера транзацкций
  // заполняем сортированный массив
  for (let i = 0; i < mcc.length; i++) {
    if (mcc[i] === '0') {
      // временно пропускаем INSIDE транзакции
      continue
    }
    sortArray.push({
      id: mccDecoder(mcc[i]),
      label: '',
      mcc: i,
      value: calcValue(convertData[mcc[i]]),
      color: 'hsl(85, 70%, 50%)',
    })
  }
  if (sortArray.length) {
    return sortArray
  }
  return []
}
