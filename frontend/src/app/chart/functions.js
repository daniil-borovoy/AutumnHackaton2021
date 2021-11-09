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

export const dateConverter = (data, selectedTime) => {
  let sortData = _.sortBy(data, 'date')

  sortData.forEach((tranzaktion) => {
    tranzaktion.yearNumber = new Date(tranzaktion.date).getUTCFullYear()
    tranzaktion.monthNumber = new Date(tranzaktion.date).getUTCMonth() // 0 - 11
    tranzaktion.dayNumber = new Date(tranzaktion.date).getUTCDay() // 0 - sunday
    tranzaktion.dayTime = [
      new Date(tranzaktion.date).getUTCHours(),
      new Date(tranzaktion.date).getUTCMinutes(),
    ]
  })

  return _.groupBy(sortData, 'monthNumber')[selectedTime]
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

export const dataConverter = (data, chartType, period, date) => {
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
  return sortArray
}
