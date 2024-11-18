import React from 'react'
import { switcherActions } from '../store/slices/switchers'
import mainStore from '../store'

export default function AuthBox({children}) {
  return (
    <div className='p-4 text-right'>{children}</div>
  )
}
