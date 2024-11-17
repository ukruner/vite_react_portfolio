import React from 'react'
import {Link} from 'react-router-dom';


export default function Header() {
  return (

    <main className='custom-header flex flex-row'>
     
      <div className='p-4'>
    <Link>NavBar placeholder</Link></div>
    <div className='md:ml-72 fixed'>
    <nav className='flex flex-row'>
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
    </nav>
    </div>
    
    </main>
  )
}
