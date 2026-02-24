import React from 'react'
import { apiSlice, SAVE_APP_FLUX, SAVE_ERRORS, useAppDispatch, SpecialConsult } from '../../Redux'
import { assignPeriodDate, dateTransform, sendToastMessage } from '../../Utils'
import Datepicker from '../Datepicker/Datepicker'
import Button from '../Button/Button'
import Alert from '../Alert/Alert'
import './Special.css'

const Special = (props: SpecialConsult) => {
  const dispatch = useAppDispatch()
  const { endpoints: { newRequest, getHistoryData }} = apiSlice
  const {
    initialDate,
    finalDate,
    handleChange: { handleInitial, handleFinal },
    userData: { name, numOtor, userId }
  } = props
  
  const handleNewRequest = async () => {
    try {
      dispatch(SAVE_APP_FLUX({ sectionLoader: true }))
      const consultsPromise = dispatch(newRequest.initiate({
        numeroOtorgante: numOtor,
        tipoOtorgante: '',
        fechaInicio: dateTransform(initialDate),
        fechaFin: dateTransform(finalDate),
        userId: userId
      }, { forceRefetch: true }))
      const { isSuccess, isError, error } = await consultsPromise

      if (isSuccess) {sendToastMessage({
        isError: false,
        message: `La solicitud se generó con éxito.`,
        type: 'success',
        closeTimer: 4500,
        position: 'bottom-right'
      })}
      if (isError) dispatch(SAVE_ERRORS([error]))

      const historyPromise = dispatch(getHistoryData.initiate({
        estatusSolicitud: '',
        numeroOtorgante: numOtor,
        tipoOtorgante: ''
      }, { forceRefetch: true }))
      const { data,
        isSuccess: historySuccess,
        isError: historyError,
        isLoading: loadingHistory,
        error: errorHistory
      } = await historyPromise

      if (historySuccess) dispatch(SAVE_APP_FLUX({ requestStatus: data }))
      if (historyError) dispatch(SAVE_ERRORS([errorHistory]))
      if (!loadingHistory) dispatch(SAVE_APP_FLUX({ sectionLoader: false }))

    } catch (error) {
      dispatch(SAVE_ERRORS([error]))
      dispatch(SAVE_APP_FLUX({ sectionLoader: false }))
    }
  }

  const validateEndDate = () => {
    const today = new Date()
    today.setDate(today.getDate() - 1)
    return today
  }

  return (
    <section className='specialContainer'>
      <span className='headerTitle alert_info'>Nueva Solicitud</span>
      <span className='titleSpan'>Seleccione el periodo que desea consultar:</span>
      <article className='periodDatesSelection'>
        <div>
          <span>Fecha Inicial:</span>
          <Datepicker
            dateFormat="dd/MMMM/yyyy"
            dateFormatCalendar='MMMM'
            showYearDropdown
            dropdownMode="select"
            maxDate={finalDate}
            selected={initialDate}
            onChange={handleInitial}
          />
        </div>
        <div>
          <span>Fecha Final:</span>
          <Datepicker
            dateFormat="dd/MMMM/yyyy"
            dateFormatCalendar='MMMM'
            showYearDropdown
            dropdownMode="select"
            selected={finalDate}
            minDate={initialDate}
            maxDate={validateEndDate()}
            onChange={handleFinal}
          />
        </div>
        <Alert
          text='Para proporcionar datos correctos, te recordamos que las consultas solo pueden ser generadas a día vencido.'
          type='info'
        />
      </article>
      <div className='separatorLineSpace'/>
      <span className='titleSpan'>Solicitante:</span>
      <article className='confirmationInfoSection'>
        <ul>
          <li><p>Consultor:</p> <p>"{name}"</p></li>
          <li><p>Otorgante:</p> <p>"{numOtor}"</p></li>
          <li><p>Periodo:</p> <p>"{assignPeriodDate({ fechaInicio: initialDate, fechaFin: finalDate }, true)}"</p></li>
        </ul>
        <div className='buttonConfirms'>
          <Alert text='Al generar la solicitud, no podrás cancelarla.' type='warning' />
          <Button variant='primary' onClick={handleNewRequest}>
            Generar Solicitud
          </Button>
        </div>
      </article>
    </section>
  )
}

export default Special