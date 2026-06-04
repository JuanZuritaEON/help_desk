import { toast } from 'react-toastify';
import { Pending, Process, Failed, Success } from '../assets/images'
export const getInitials = (userName: string) => {
  if(userName === '') return 'LI';
  const [name, ...rest] = userName.split(/\s+/)
  const firstName = name.slice(0, 1)
  const lastName = rest.at(-1)?.slice(0,1) || ''
  return `${firstName}${lastName}`.toUpperCase().trim()
}

export const validateActualDate = (date: Date) => {
  const actualDate = new Date()
  const { day: actualDay, month: actualMonth, year: actualYear } = {
    year: actualDate.getFullYear(),
    month: actualDate.getMonth() + 1,
    day: actualDate.getDate()
  }
  const { day, month, year } = {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate()
  }
  let toModified = new Date(date)
  const isToday = year === actualYear && month === actualMonth && day === actualDay
  if (isToday && actualDay !== 1) toModified.setDate(day - 1)
  else { toModified = new Date(year, month - 1, 0) }
  return {
    isExactToday: isToday,
    date: isToday ? toModified : date
  }
}

export const dateTransform = (date: Date) => {
  const day = date.getDate()
  const month = date.getMonth()
  const year = date.getFullYear()
  const formattedDate = `${year}-${month+1 < 10 ? '0'+ (month + 1) : month + 1}-${day < 10 ? '0' + day : day}`
  return formattedDate
};


export const convertToMonth = (value: string) => {
  let letra = ''
  const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]
  const numberMonth = Number.parseInt(value)
  if(numberMonth >= 1  && numberMonth <= 12 ) {
    letra = months[numberMonth - 1]
  }
  return letra
}

export const assignPeriodDate = (dates: {fechaInicio: Date | string, fechaFin?: Date | string}, explicitDate?: boolean) => {
  const { fechaInicio, fechaFin = '' } = dates
  if (!fechaInicio && !fechaFin) return '--------------'
  const transformInitDate = typeof fechaInicio === 'string' ? fechaInicio : dateTransform(fechaInicio)
  const transformFinDate = typeof fechaFin === 'string' ? fechaFin : dateTransform(fechaFin)
  const init = transformInitDate.split('-')
  const initialMonth = convertToMonth(init[1])
  if (transformFinDate) {
    const fin = transformFinDate.split('-');
    const finalMonth = convertToMonth(fin[1]);
    if (explicitDate) return `${init[2]} de ${initialMonth} de ${init[0]} Al ${fin[2]} de ${finalMonth} de ${fin[0]}`
    return `${initialMonth}/${init[0]} - ${finalMonth}/${fin[0]}`
  }
  if (explicitDate) return `${init[2]} de ${initialMonth} de ${init[0]}`
  return `${initialMonth}/${init[0]}`
}

export const getStatusInfo = (status: string, showText?: boolean) => {
  switch (status) {
    case 'Pendiente de Resolver':
    case 'Pendiente': return showText ? 'Pendiente de resolver' : Pending;
    case 'En proceso': return showText ? 'Procesando...' : Process;
    case 'Fallida': return showText ? 'Fallida' : Failed;
    case 'Reporte':
    case 'Completada': return showText ? 'Solicitud Completada' : Success;
  }
}

export const formatTableElement = (text: string) => <div title={text}>{text}</div>
export const reportStatus = (status: string) => status === 'Fallida' || status === 'Completada' ? 'Consulta el detalle para más información.' : 'Reporte en Proceso.'

export const sendToastMessage = ({
  position = "top-right",
  message,
  type,
  isError,
  error,
  closeTimer,
  progress,
  optionalComponent
}: {
  position?: 'top-right' | 'top-center' | 'top-left' | 'bottom-right' | 'bottom-center' | 'bottom-left';
  message?: string;
  type: 'error' | 'success' | 'warning' | 'info';
  isError: boolean; 
  error?: any;
  closeTimer?: number;
  progress?: number;
  optionalComponent?: () => JSX.Element;
}) => {

  let responseMessage = optionalComponent;

  
  toast[type](isError || optionalComponent ? responseMessage : message, {
    position,
    autoClose: closeTimer ?? false,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    progress,
    theme: "colored",
  });
}