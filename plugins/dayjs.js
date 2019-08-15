import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/tr'
import 'dayjs/locale/ru'
dayjs.locale('en')
dayjs.extend(relativeTime)
window.moment = dayjs
