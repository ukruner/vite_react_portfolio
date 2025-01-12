import React from 'react'
import {Link} from 'react-router-dom';
import AuthBox from './AuthBox';
import { switcherActions } from '../store/slices/switchers';
import mainStore from '../store';

import { useState } from 'react';
import WhaleSidebarButton from './whaleSidebarButton';
import HeaderNavbar from './HeaderNavbar';

export default function Header() {
  

  
  


  return (

     <header className='custom-header fixed '>
      <div id='mainheader' className='flex justify-between'>
      <WhaleSidebarButton></WhaleSidebarButton>
      <HeaderNavbar></HeaderNavbar>
      <AuthBox >Account</AuthBox>
    
    </div></header>
  )
}
