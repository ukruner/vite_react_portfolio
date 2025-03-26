import React from 'react'
import { switcherActions } from '../../store/slices/switchers'

import mainStore from '../../store'

export default function AuthBox({children}) {
  return (
    <div id="authdiv" className='h-20 flex basis-[20%] place-items-end justify-end'>
        <button className='auth-button mr-[1rem]'>{children}</button>
        <button className='auth-button ml-[1rem] mr-[1rem]'> Login </button>
        </div>
  )
}
