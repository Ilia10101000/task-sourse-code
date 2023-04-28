import React from 'react'

export default function InputRadio({position, hundlerPositionChange}) {
  return (
    <label><input type='radio' name='position' value={position.id} onChange={hundlerPositionChange}/><span className="custom-radio-checkbox"></span>{position.name.slice(0,1).toUpperCase() + position.name.slice(1)}</label>
  )
}
