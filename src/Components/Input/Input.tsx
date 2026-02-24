import React from 'react'
import './Input.css'

const Input = (props: any) => {
  const {
    id,
    aria,
    children,
    labelText,
    title,
    placeholder,
    onClick,
    onChange,
    onKeyDown,
    width,
    value,
    disabled = false
  } = props
  const handleChange = ({target}: any) => {
    if (onChange) onChange(target.value)
  }
  return (
    <div className='wrap' onClick={onClick}>
      <label className='inputLabel'>
        {labelText}
      </label>

      <div className='inputField'>
        <input
          id={id}
          className={`fielded form-control`}
          value={value}
          disabled={disabled}
          aria-describedby={aria || labelText}
          title={disabled ? title : undefined}
          placeholder={placeholder}
          onChange={handleChange}
          onKeyDown={onKeyDown}
          width={width}
          autoComplete="off"
        />
        {children}
      </div>
    </div>
  )
}

export default Input