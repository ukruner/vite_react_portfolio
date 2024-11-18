import React from 'react'
import { switcherActions } from '../store/slices/switchers'
import mainStore from '../store'

export default function AuthBox({children}) {
  return (
    <div className='right-0 absolute'>
        <div className='flex flex-inline'>
        <div className='p-4'>{children}</div>
        <div className='p-4'>{children}</div>
        </div></div>
  )
}
