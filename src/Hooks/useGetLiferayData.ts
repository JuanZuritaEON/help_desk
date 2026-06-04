import React from 'react'
import { SAVE_APP_FLUX } from '../Redux/Slices'
import { useAppDispatch } from '../Redux'

export const useLiferayData = () => {
  const [loading, setLoading] = React.useState(true)
  const [userData, setUserData] = React.useState<any>({
    data: {
      nameUser: '',
      numOtorgante: null,
      token: '',
      userId: 0
    },
    properties: {
      CDC_ID_HDK: '',
      CDC_SEC_HDK: '',
      CDC_URL_HDK: '',
      CDC_AWS_HDK: '',
      CDC_SPW_HDK: ''
    }
  })
  const dispatch = useAppDispatch()

  React.useEffect(() => {
    if (globalThis.Liferay) {
      const Liferay = globalThis.Liferay
      const userId = Liferay.ThemeDisplay.getUserId()
      const properties = ['CDC_ID_HDK', 'CDC_SEC_HDK', 'CDC_URL_HDK', 'CDC_AWS_HDK', 'CDC_SPW_HDK']
      const initRequest = async () => {
        try {
          await Liferay.Service(
            [
              {
                '/properties.properties/get-init-user-properties': { userId },
              },
              {
                '/properties.properties/get-properties': { properties }
              },
            ],
            (obj: any) => {
              try {
                const data = {
                  nameUser: JSON.parse(obj[0]).nameUser,
                  numOtorgante: JSON.parse(obj[0]).numOtorgante,
                  token: JSON.parse(obj[0]).token,
                  userId: JSON.parse(obj[0]).userId,
                }
                setUserData({
                  data,
                  properties: JSON.parse(obj[1]),
                })
                dispatch(SAVE_APP_FLUX({ liferayUser: {
                  data,
                  properties: JSON.parse(obj[1]),
                }}))
              } catch (error) {
                return error
              }
            }
          )
        } catch (error) {
          console.log(error)
        } finally {
          setLoading(false)
        }
      }
      initRequest()
    } else setLoading(false)
  }, [dispatch])

  return { loading, userData }
}
