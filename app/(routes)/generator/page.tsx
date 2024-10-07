import React from 'react'
import HeaderGenerator from './HeaderGenerator/HeaderGenerator'
import FormGenerator from './FormGenerator/FormGenerator'

export default function page() {
  return (
    <div>
        <HeaderGenerator />
        <FormGenerator />
    </div>
  )
}
