import React from 'react'

export const ErrorPage = () => {
  return (
    <div className='flex flex-col gap-3 h-[80vh] items-center justify-center'>
        <img src="\src\assets\error-404.png" alt="404" width={100} />
        <h2 className='text-2xl text-gray-600'>Page not found !!</h2>
    </div>
  )
}
