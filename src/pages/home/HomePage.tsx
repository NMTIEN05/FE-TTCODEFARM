import React from 'react'
import FlasSale from './components/FlasSale'
import { useStore } from '../../stores/common.store'
import Product from './components/Product'
import Nav from './components/Nav';
import Blog from './components/Blog';
import ServiceInfo from './components/ServiceInfo';
import HeroBanner from './components/HeroBanner';
import QuickActions from './components/QuickActions';


type Props = {}

const HomePage = (props: Props) => {
  const bears = useStore((state) => state.bears)
  console.log('bears: ', bears);
  

  return (
    <>
    <HeroBanner />
    <Nav/>
    <QuickActions />
    <FlasSale />
    <Product/>
    <Blog/>
    <ServiceInfo/>
    </>
  )
}

export default HomePage