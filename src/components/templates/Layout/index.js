import React from 'react'
import { NavBar } from 'components/molecules';
import { Outlet } from 'react-router-dom';
import "./index.css";

export const Layout = () => {
  return (
    <div className='layout-wrapper'>
      <NavBar/>
      <Outlet/>
    </div>
  )
}
