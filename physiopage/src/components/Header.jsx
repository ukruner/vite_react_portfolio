import React from 'react'
import {Link} from 'react-router-dom';
import MoveStuffAround from './MoveStuffAround'

export default function Header() {
  return (

    <main className='bg-gradient-to-r from-sky-300 to-sky-600 h-300rem'>
      <div className='flex flex-row'>
    <div className='p-4 '>
    <Link >NavBar placeholder</Link>
    </div>
    <div className='p-4'>
    <Link >Why us</Link>
    </div>
    <div className='p-4'>
    <Link >Importance of exercise</Link>
    </div>
    <div className='p-4'>
    <Link >About the team</Link>
    </div>
    <div className='p-4'>
    <Link >Contact</Link>
    </div>
    <div className='p-4'>
    <Link >Resources</Link>
    </div>
    </div>
    </main>
  )
}
