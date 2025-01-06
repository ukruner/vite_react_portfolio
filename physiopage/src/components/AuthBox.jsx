import React from 'react'
import { switcherActions } from '../store/slices/switchers'
import mainStore from '../store'

export default function AuthBox({children}) {
  return (
    <div className='flex place-items-end'>
        
        <div className='p-4 '>{children}</div>
        <div className='p-4'>{children}</div>
        </div>
  )
}
