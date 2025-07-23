import React from 'react'
import Header from '../common/Header'
import Footer from '../common/Footer'
import QuickOrderSummary from '../common/QuickOrderSummary'
import { Outlet } from 'react-router-dom'
import ScrollToTop from '../ScrollToTop'

type Props = {}

const MainLayout = (props: Props) => {
  return (
    <>
    <ScrollToTop />
    <Header />
    <Outlet />
    <QuickOrderSummary />
    <Footer />
    </>
  )
}

export default MainLayout