import React from 'react'

export default function Sidebar2() {
  return (
<><div id="mySidebar" class="sidebar">
  <a href="#">About</a>
  <a href="#">Services</a>
  <a href="#">Clients</a>
  <a href="#">Contact</a>
</div>

<div id="main">
  <button id="sidebarButton" class="openbtn">☰</button>  
  <h2>Collapsed Sidebar</h2>
  <p>Click on the hamburger menu/bar icon to open the sidebar, and push this content to the right.</p>
</div></>

  )
}
