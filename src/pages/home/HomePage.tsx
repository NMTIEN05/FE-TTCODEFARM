import React from 'react'
import FlasSale from './components/FlasSale'
import { useStore } from '../../stores/common.store'

type Props = {}

const HomePage = (props: Props) => {
  const bears = useStore((state) => state.bears)
  console.log('bears: ', bears);
  

  return (
    <>
    <FlasSale />
    <div className='text-red-500 text-14 font-bold underline'></div>
    </>
  )
}

export default HomePage