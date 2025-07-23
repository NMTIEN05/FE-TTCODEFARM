import React from 'react'

import Commet from './components/Commet'

import Detail from './components/Detail'

type Props = {}

const DetelProduct = (props: Props) => {
  return (
   <>
    <Detail />  
    <Commet bookId="abc123" />
    </>
  )
}

export default DetelProduct