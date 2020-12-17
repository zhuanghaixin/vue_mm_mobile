
import moment from 'moment'

/* 时间过滤器 - 年月日-时分 */
export const dateFormat = (value) => {
  // return moment(value).fromNow()
  moment.locale('zh-cn')
  const a = moment()
  const b = moment(value)
  const _diff = a.diff(b, 'h')
  if (_diff <= 1) {
    return b.fromNow()
  } else {
    return b.format('YYYY-MM-DD')
  }
}
