import React from 'react'
import { ArrowPathIcon, ArrowsPointingInIcon, ArrowsPointingOutIcon, ExclamationCircleIcon, MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/16/solid'
import { SubHeaderComponentTypes } from './SubHeaderComponent.types'
import Input from '../../Input/Input'
import { isNull } from 'lodash'
import './SubHeaderComponent.css'

const SubHeaderComponent = (props: SubHeaderComponentTypes) => {

  const {
    cleanData,
    setFilterData,
    alertText = '',
    handleReload = null,
    filterValues = ['id'],
    expanded,
    setExpanded,
  } = props

  const [filterText, setFilterText] = React.useState('')
  
  const filteredItems = () => {
    const filteredByText = cleanData.filter((item) => (item.id.toString().toLowerCase().includes(filterText.toLowerCase())))
    setFilterData(filteredByText)
  };
  const clearFilter = () => {
    setFilterText('');
    setFilterData(cleanData);
  };
  const handleKeyDown = ({ key }: any) => key === "Enter" && filteredItems()

  return (
    <>
      {alertText && <div>
        <ExclamationCircleIcon  
          title={'Info'}
          className='iconStandardStyle'
        />
          {alertText}
      </div>}
      <Input
        id="search"
        labelText={'Buscar'}
        placeholder={filterValues.map(value => value.toUpperCase())}
        onChange={(newValue: any) => setFilterText(newValue)}
        onKeyDown={handleKeyDown}
        value={filterText}
      >
        <MagnifyingGlassIcon
          onClick={filteredItems}
          title={'Buscar'}
          className='iconStandardStyle svgFill'
        />
        <XMarkIcon
          onClick={clearFilter}
          title={'Limpiar'}
          className='iconStandardStyle svgFill'
        />
      </Input>
      <button title='Expandir Info' type="button" className='reportButton' onClick={() => setExpanded(!expanded)}>
        {
          expanded ?
            <ArrowsPointingInIcon
            title={'Reducir'}
            className='iconStandardStyle'
            />
          :
            <ArrowsPointingOutIcon
            title={'Expandir'}
            className='iconStandardStyle'
            />
        }
      </button>
      {!isNull(handleReload) && <button title='Actualizar' type="button" className='reportButton' onClick={handleReload}>
        <ArrowPathIcon
        title={'Actualizar'}
        className='iconStandardStyle'
        />
      </button>}
    </>
);
}

export default SubHeaderComponent