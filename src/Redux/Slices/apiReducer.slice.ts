import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react'
import { RootState } from '../store'
import { Mutex } from 'async-mutex'
import CryptoJS from 'crypto-js'

const mutex = new Mutex()
const baseUrl = 'http://desarrollo:7002/consultas-historicas/historicos'
const queryUrl = ''
const rawBaseQuery = fetchBaseQuery({ baseUrl })
const s3BaseQuery = fetchBaseQuery({ baseUrl: '' })
const dynamicBaseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  await mutex.waitForUnlock()
  let resultBaseQuery
  const { 
    app: { 
      appFluxContext: { 
        liferayUser: { 
          properties: { CDC_ID_HDK, CDC_SEC_HDK, CDC_URL_HDK, CDC_SPW_HDK },
          data: { token }
        }
      }
    }
  } = api.getState() as RootState
  if (globalThis.Liferay) {
    const signRequestByKey = (request: any) => {
      const key  = CryptoJS.enc.Latin1.parse(CDC_SPW_HDK)
      const iv   = CryptoJS.enc.Latin1.parse(CDC_SPW_HDK)
      const encrypted = CryptoJS.AES.encrypt(request, key, {
        iv:iv,
        mode:CryptoJS.mode.CBC,
        padding:CryptoJS.pad.ZeroPadding
      });
      return encrypted.toString();
    }
    const body = `grant_type=client_credentials&client_id=${CDC_ID_HDK}&client_secret=${CDC_SEC_HDK}`
    const adjustedArgs = typeof args === 'string' ? args : {
      ...args,
      body,
      url: CDC_URL_HDK + '/oauth2/token',
      method: 'POST',
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    }
    const { data }: any = await rawBaseQuery(
      adjustedArgs,
      api,
      extraOptions)
    const authTokenSerialized = data.token_type + " " + data.access_token
    const addedToken = typeof args === "string" ? args : {
      ...args,
      url: CDC_URL_HDK + '/consultas-historicas/historicos/' + args.url,
      headers: {
        'Authorization': authTokenSerialized,
        'signature': signRequestByKey(JSON.stringify(args.body)),
        'token': token ?? ''
      }
    }
    resultBaseQuery = rawBaseQuery(addedToken, api, extraOptions)
  } else {
    await mutex.waitForUnlock()
    resultBaseQuery = rawBaseQuery(args, api, extraOptions)
  }
  return resultBaseQuery
}

const dynamicS3BaseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  await mutex.waitForUnlock()
  let resultBaseQuery
  const { 
    app: { 
      appFluxContext: { 
        liferayUser: { 
          properties: { CDC_AWS_HDK },
          data: { token }
        },
      }
    }
  } = api.getState() as RootState
  if (globalThis.Liferay) {
    const adjustedArgs = typeof args === 'string' ? args : {
      ...args,
      url: CDC_AWS_HDK + '/' + args.url,
      headers: {
        "Content-Type": "application/json",
        "x-jwt-token": token
      }
    }
    resultBaseQuery = s3BaseQuery(
      adjustedArgs,
      api,
      extraOptions
    )
  } else {
    await mutex.waitForUnlock()
    resultBaseQuery = s3BaseQuery(args, api, extraOptions)
  }
  return resultBaseQuery
}

export const apiSlice = createApi({
  reducerPath: 'apiRequest',
  baseQuery: dynamicBaseQuery,
  endpoints: builder => ({
    getHistoryData: builder.query<any, {numeroOtorgante: string, estatusSolicitud: string, tipoOtorgante: string}>({
      query: initialLoad => ({
        url: queryUrl + 'obtener',
        method: 'POST',
        body: initialLoad
      }),
      transformResponse: (response: { historicoConsultas: any[] }) => {
        let requestStatus;
        if (response.historicoConsultas.length === 0) {
          requestStatus = [{
            id: 0,
            status: '',
            upDate: '',
            fileName: '',
            period: {
                start: '',
                end: ''
            },
            consultNumber: '',
            companyName: '',
            shortName: '',
            consultType: '',
            lastUpdate: '',
            eTag: '',
            fileRef: '',
            viewFile: false
          }]
        } else {
          requestStatus = response.historicoConsultas.map((file: any) => ({
            id: file.idSolicitud,
            status: file.estatusSolicitud,
            upDate: file.fechaAlta,
            fileName: file.nombreArchivo,
            period: {start: file.fechaInicio, end: file.fechaFin},
            consultNumber: file.numeroOtorgante,
            companyName: file.razonSocial,
            shortName: file.nombreCorto,
            lastUpdate: file.ultimaActualizacion,
            eTag: file.eTag,
            fileRef: file.refArchivo,
            viewFile: file.visualizarArchivo
          }))
        }
        return requestStatus
      },
      transformErrorResponse: (error: any) => {
        console.log(error)
        return ({
          url: 'historicos/obtener',
          code: error.status,
          message: error?.error ?? error?.data?.error ?? error?.data?.mensaje ?? error?.data?.mensajes[0],
          active: true,
        })
      },
    }),
    newRequest: builder.query<any, {numeroOtorgante: string, tipoOtorgante: string, userId: number, fechaInicio: string, fechaFin: string}>({
      query: initialLoad => ({
        url: queryUrl + 'alta',
        method: 'POST',
        body: initialLoad
      }),
      transformErrorResponse: (error: any) => ({
        url: 'historicos/alta',
        code: error.status,
        message: error?.error ?? error?.data?.error ?? error?.data?.mensaje ?? error?.data?.mensajes[0],
        active: true,
      }),
    }),
    requestDetail: builder.query<any, { idSolicitud: number; }>({
      query: initialLoad => ({
       url: queryUrl + 'detalle',
       method: 'POST',
       body: initialLoad 
      }),
      transformResponse: (response: { detalleHistoricoConsulta: any }) => ({
        requestStatus: response.detalleHistoricoConsulta.estatusSolicitud,
        dateComplete: response.detalleHistoricoConsulta.fechaCompletada,
        dateFailed: response.detalleHistoricoConsulta.fechaFallida,
        beginProcess: response.detalleHistoricoConsulta.fechaProceso,
        moreDetails: response.detalleHistoricoConsulta.observaciones,
        idRequest: response.detalleHistoricoConsulta.idSolicitud,
        detailViewFile: response.detalleHistoricoConsulta.visualizarArchivo,
        dateExpired: response.detalleHistoricoConsulta.fechaResguardo
      }),
      transformErrorResponse: (error: any) => ({
        url: 'historicos/detalle',
        code: error.status,
        message: error?.error ?? error?.data?.error ?? error?.data?.mensaje ?? error?.data?.mensajes[0],
        active: true,
      }),
    })
  })
})

export const S3Slice = createApi({
  reducerPath: 's3Request',
  baseQuery: dynamicS3BaseQuery,
  endpoints: builder => ({
    s3DownloadFile: builder.query<any, any>({
      query: initialLoad => ({
        url: queryUrl + 'obtenerArchivo',
        body: initialLoad,
        method: 'POST'
      }),
      transformResponse: async (response: string) => {
        let isNotFound = false
        const data = await fetch(response).then(response => {
          if (response.status === 404) isNotFound = true
          return response.blob()
        }).then(blob => URL.createObjectURL(blob))
        return { data, isNotFound }
      },
      transformErrorResponse: (error: any) => ({
        url: 'obtenerArchivo',
        code: error.status,
        message: error?.data?.mensajes ?? error?.data?.errores[0]?.mensaje ?? error.error,
        active: true,
      }),
    })
  })
})


export const { useGetHistoryDataQuery } = apiSlice
export const { useS3DownloadFileQuery } = S3Slice