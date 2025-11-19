import React from 'react'

export default function ResponseElement({entry}) {
  return (
    <div key={entry.label}><div className='flex gap-2 my-4'>
          <p className='text-lg'>{entry.id}</p>
          <p className='text-red-500 text-lg'>{entry.response}</p></div>
          <p className='text-sm/6'>{entry.comment}</p></div>
  )
}
