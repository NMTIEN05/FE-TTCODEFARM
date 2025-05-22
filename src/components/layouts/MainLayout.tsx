import React from 'react'
import Header from '../common/Header'
import Footer from '../common/Footer'
import { Outlet } from 'react-router-dom'

type Props = {}

const MainLayout = (props: Props) => {
  return (
    <>
    <Header />
    <Outlet />
    <Footer />
    </>
  )
}

export default MainLayout