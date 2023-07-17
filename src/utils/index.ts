import { toast } from 'react-toastify'
import { tabs } from '../constants'

export const notify = (message: string, type: string) => {
  if (type == 'success') {
    toast.success(message)
  }
  if (type == 'warning') {
    toast.warning(message)
  }
  if (type == 'error') {
    toast.error(message)
  }
}

export const getNextTabName = (currentName: any) => {
  const currentIndex = tabs.findIndex((tab: any) => tab.name === currentName)
  const nextIndex = (currentIndex + 1) % tabs.length
  return tabs[nextIndex].name
}

export function generateRandomString(length: number) {
  var characters = 'abcdefghijklmnopqrstuvwxyz'
  var randomString = ''

  for (var i = 0; i < length; i++) {
    var randomIndex = Math.floor(Math.random() * characters.length)
    randomString += characters.charAt(randomIndex)
  }

  return randomString
}

export function getMonthIndex(month: any) {
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]
  return monthNames.indexOf(month)
}

export function replaceFields(storageData: any, updatedData: any): any {
  const ffdMap: any = {}
  updatedData.forEach((obj: any) => {
    ffdMap[obj.id] = obj
  })

  storageData.forEach((obj: any) => {
    const id = obj.id

    if (ffdMap.hasOwnProperty(id)) {
      const ffdObj = ffdMap[id]

      Object.keys(ffdObj).forEach((key: string) => {
        if (ffdObj[key] !== undefined) {
          obj[key] = ffdObj[key]
        }
      })
    }
  })

  return storageData
}

export const hasEmptyValueWithDateValidation = (array: any) => {
  for (const obj of array) {
    for (const key in obj) {
      const value = obj[key]
      if (value === '' || value === null || value === undefined) {
        return 'empty'
      }
    }

    if (obj.start_year && obj.start_month && obj.end_year && obj.end_month) {
      const startYear = parseInt(obj.start_year)
      const endYear = parseInt(obj.end_year)
      const startMonth = obj.start_month
      const endMonth = obj.end_month

      if (
        startYear > endYear ||
        (startYear === endYear && getMonthIndex(startMonth) > getMonthIndex(endMonth))
      ) {
        return 'validate'
      }
    }
  }

  return 'valid'
}
