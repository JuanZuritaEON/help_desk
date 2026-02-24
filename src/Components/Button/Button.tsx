import { ButtonTypes } from './Button.types'
import './Button.css'

const Button = (props: ButtonTypes) => {
  const { type = 'button', variant = 'primary', size = 'md', className = '', children } = props
  const classes = `generalButton button_${variant} size_${size} ${className}`
  return (
    <button type={type} className={classes} {...props}>
      {children}
    </button>
  )
}

export default Button