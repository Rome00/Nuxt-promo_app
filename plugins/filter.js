import Vue from 'vue'
import moment from 'moment'

Vue.filter('shorten', (text, maxLength = 300) => {
  if (text && typeof text === 'string') {
    const ending = text.length > maxLength ? '...' : ''
    return text.substr(0, maxLength) + ending
  }
  return ''
})

Vue.filter('date', (date, dateFormat = 'LL') => {
  if (!date) return ''
  return moment(date).format(dateFormat)
})
