import React from 'react'
import FlasSale from './components/FlasSale'
import { useStore } from '../../stores/common.store'
import Product from './components/Product'
import { SearchOutlined, UserOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import Nav from './components/Nav';
import Blog from './components/Blog';
import ServiceInfo from './components/ServiceInfo';


type Props = {}

const HomePage = (props: Props) => {
  const bears = useStore((state) => state.bears)
  console.log('bears: ', bears);
  

  return (
    <>
    <Nav/>
    <FlasSale />
    <div className='text-red-500 text-14 font-bold underline'></div>

    <Product/>
    <Blog/>
    <ServiceInfo/>
    </>
  )
}

export default HomePage