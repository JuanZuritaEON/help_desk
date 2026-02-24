import { es } from 'date-fns/locale'
import { memo } from 'react'
import ReactDatePicker, {
  ReactDatePickerProps,
  registerLocale
} from "react-datepicker"
import "./Datepicker.css"
registerLocale("es", es)

const Datepicker = ({
  dateFormat = "dd/MM/yy",
  maxDate = new Date(),
  ...props
}: ReactDatePickerProps) => (
  <ReactDatePicker
    className='inputContenteDate form-control'
    calendarClassName="card"
    locale="es"
    dateFormat={dateFormat}
    maxDate={maxDate}
    onKeyDown={(e) => e.preventDefault()}
    {...props}
  />
)

export default memo(Datepicker)
