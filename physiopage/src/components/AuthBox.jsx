import React from 'react'
import { switcherActions } from '../store/slices/switchers'
import mainStore from '../store'

export default function AuthBox({children}) {
  return (
    <div id="authdiv" className='mr-4 h-20 w-[10rem] flex place-items-end justify-end'>
        <button className='auth-button mr-[1rem]'>{children}</button>
        <button className='auth-button ml-[1rem] mr-[1rem]'> Login </button>
        </div>
  )
}
