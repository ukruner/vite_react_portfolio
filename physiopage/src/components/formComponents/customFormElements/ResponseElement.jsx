import React from 'react'

export default function ResponseElement({entry}) {
  return (
    <>
      {entry.response && (
        <article className='response-card'>
          <div className='response-card-header'>
            <p>{entry.id}</p>
            <strong>{entry.response}</strong>
          </div>

          {entry.comment && (
            <p className='response-comment'>{entry.comment}</p>
          )}
        </article>
      )}
    </>
  )
}
