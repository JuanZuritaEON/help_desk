import React from 'react'
import { useAppDispatch, useAppSelector, Texts } from './Redux'
import { ToastContainer, toast } from 'react-toastify'
import { SAVE_ERRORS } from './Redux/Slices'
import { useLiferayData } from './Hooks'
import { Container } from './Containers'
import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  const { loading, userData } = useLiferayData()
  const { errors } = useAppSelector((state) => state.app)
  const dispatch = useAppDispatch()

  React.useEffect(() => {
    errors.forEach(({ active, code, message }) => {
      if (active) {
        toast.error(`${Texts.ERROR_CODE}: ${code && '---'} - ${message}`, {
          position: "top-right",
          autoClose: 7500,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "colored",
        })
      }
    })
    if (errors.length > 1) dispatch(SAVE_ERRORS([{
      code: '',
      message: [''],
      active: false,
    }]))
  }, [errors, dispatch])

  if (loading) return <></>
  else return (
    <>
      <ToastContainer />
      <Container numOtorgante={userData.data.numOtorgante} />
    </>
  )
}

export default App