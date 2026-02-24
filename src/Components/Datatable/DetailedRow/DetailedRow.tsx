import React from 'react'
import { apiSlice, RootState, SAVE_APP_FLUX, SAVE_ERRORS, useAppDispatch, useAppSelector } from '../../../Redux'
import { DetailedRowTypes } from './DetailedRow.types'
import { assignPeriodDate } from '../../../Utils'
import LineGraph from '../../Graph/Graph'
import Loader from '../../Loader/Loader'
import './DetailedRow.css'

const DetailedRow = (props: DetailedRowTypes) => {
  const { consultNumber, companyName, id, upDate } = props.data
  const consultName = `${consultNumber} - ${companyName}`
  const { endpoints: { requestDetail }} = apiSlice
  const dispatch = useAppDispatch()
  const {
    requestDetails,
    sectionLoader,
    liferayUser: { data: { nameUser } }
  } = useAppSelector((state: RootState) => state.app.appFluxContext)

  const [detailRow, setDetailRow] = React.useState({
    requestStatus: '',
    dateComplete: '',
    dateFailed: '',
    beginProcess: '',
    moreDetails: '',
    idRequest: 0,
    detailViewFile: false
  })
  const [dataGraph, setDataGraph] = React.useState([{
    name: '',
    uv: 0,
    text: '',
    date: ''
  }])
  const [loading, setLoading] = React.useState(sectionLoader)

  React.useEffect(() => {
    const initialValidation = async () => {
      try {
        setLoading(true)
        const existDetail = requestDetails.filter(detail => detail.idRequest === id)
        let temporalDetail
        if (existDetail.length) {
          setDetailRow(existDetail[0])
          temporalDetail = existDetail[0]
        } else {
          const detailPromise = dispatch(requestDetail.initiate({ idSolicitud: id }))
          const { data, isSuccess, isError, error }  = await detailPromise
          if (isSuccess) {
            dispatch(SAVE_APP_FLUX({ requestDetails: [...requestDetails, data]}))
            setDetailRow(data)
            temporalDetail = data
          }
          if (isError) {dispatch(SAVE_ERRORS([error])); temporalDetail = []}
        }
        const arrayOfData = [{
          name: 'Estatus Inicial',
          text: 'Se creó la Solicitud Especial con éxito.',
          date: assignPeriodDate({fechaInicio: upDate}, true),
          color: '#9fb9d5',
          type: 'neutral'
        },{
          name: 'Pendiente de Resolver',
          text: 'La Solicitud se encuentra en espera de ser atendida.',
          date: assignPeriodDate({fechaInicio: upDate}, true),
          color: '#FFC400',
          type: 'warning'
        }]
        if (temporalDetail.requestStatus !== 'Pendiente' && temporalDetail.beginProcess) arrayOfData.push({
          name: 'En proceso',
          text: 'La Solicitud comenzó a ser procesada.',
          date: assignPeriodDate({fechaInicio:temporalDetail.beginProcess.slice(0, 10)}, true),
          color: '#0007cc',
          type: 'process'
        })
        if (temporalDetail.requestStatus === 'Completada') arrayOfData.push({
          name: 'Completada',
          text: 'La Solicitud fue completada con éxito y se está generando el reporte.',
          date: assignPeriodDate({fechaInicio:temporalDetail.dateComplete.slice(0, 10)}, true),
          color: '#00B207',
          type: 'success'
        }, {
          name: 'Reporte',
          text: 'El reporte se encuentra disponible para la descarga.',
          date: assignPeriodDate({fechaInicio:temporalDetail.dateComplete.slice(0, 10)}, true),
          color: '#00B207',
          type: 'success'
        })
        if (temporalDetail.requestStatus === 'Completada' && !temporalDetail.detailViewFile) arrayOfData.push({
          name: 'Caducado',
          text: 'Archivo de reporte no disponible, por favor crea otra solicitud.',
          date: assignPeriodDate({fechaInicio:temporalDetail.dateExpired.slice(0, 10)}, true),
          color: '#FFC400',
          type: 'warning'
        })
        if (temporalDetail.requestStatus === 'Fallida') arrayOfData.push({
          name: 'Fallida',
          text: 'La Solicitud no pudo ser procesada de manera correcta.',
          date: assignPeriodDate({fechaInicio:temporalDetail.dateFailed.slice(0, 10)}, true),
          color: '#BF0000',
          type: 'failed'
        })
        setDataGraph(arrayOfData.map(data => ({...data, uv: 10})))
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    initialValidation()
  }, [dispatch, id, requestDetail, requestDetails, upDate])

  return (
    <>
      {
        loading ? <Loader width={80} height={80} wrapperClass='generalLoader'/> :
      <section className='detailContainer'>
        <div>
          <ul className='detailedRow'>
            <li>- Solicitud:  {detailRow.idRequest}</li>
            <li>- Usuario:  {nameUser || 'Lorem Ipsum Data'}</li>
            <li>- Otorgante:  {consultName}</li>
            <li>- Fecha Alta:  {assignPeriodDate({ fechaInicio: upDate }, true)}</li>
            <li>- Estatus:  {detailRow.requestStatus}</li>
            {detailRow.requestStatus === 'Completada' && 
              <>
                <li>- Fecha Completada:  {assignPeriodDate({fechaInicio:detailRow.dateComplete.slice(0, 10)}, true)}</li>
                {!detailRow.detailViewFile && <li>- Reporte: La Solicitud tiene más de 2 meses de antigüedad por lo que el archivo ya no se encuentra disponible, deberá generar una nueva Solicitud.</li>}
              </>
            }
            {detailRow.requestStatus === 'Fallida' && 
              <>
                <li>- Fecha Fallida:  {assignPeriodDate({fechaInicio:detailRow.dateFailed.slice(0, 10)}, true)}</li>
                <li>- Observaciones:  {detailRow.moreDetails}</li>
              </>
            }
          </ul>
        </div>
        <div>
          <LineGraph data={dataGraph}/>
        </div>
      </section>
      }
    </>
  )
}

export default DetailedRow