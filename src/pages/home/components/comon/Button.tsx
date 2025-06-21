import React from 'react'
import { Button } from 'antd'
import { RightOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'

type Props = {
  to?: string;
  text?: string;
}

const ViewAllButton = ({ to = '/allproduct', text = 'Xem tất cả' }: Props) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(to);
  };

  return (
    <div className="flex justify-center items-center mt-5">
      <Button
        type="primary"
        onClick={handleClick}
        className="rounded-full px-6 py-2 text-lg font-semibold shadow-lg hover:shadow-xl transition-shadow duration-300 flex items-center gap-2"
        style={{ backgroundColor: "#f97316", borderColor: "#ea580c" }}
      > 
        {text}
        <RightOutlined />
      </Button>
    </div>
  )
}

export default ViewAllButton
