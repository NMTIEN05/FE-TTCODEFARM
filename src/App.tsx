import { RouterProvider } from 'react-router-dom';
import React from 'react';
import { router } from './router/route';

const App:React.FC = () => {
  return <RouterProvider router={router} />
}
export default App;
