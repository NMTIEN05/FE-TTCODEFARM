import React from 'react'
import { Button } from 'antd'
import { RightOutlined } from '@ant-design/icons'

type Props = {}

const ViewAllButton = (props: Props) => {
  return (
    <div className="flex justify-center items-center mt-5 ">
      <Button
        type="primary"
        className="rounded-full px-6 py-2 text-lg font-semibold shadow-lg hover:shadow-xl transition-shadow duration-300 flex items-center gap-2"
        style={{ backgroundColor: "#f97316", borderColor: "#ea580c" }} // màu cam Tailwind orange-500
      > 
        Xem tất cả
        <RightOutlined />
      </Button>
    </div>
  )
}

export default ViewAllButton
