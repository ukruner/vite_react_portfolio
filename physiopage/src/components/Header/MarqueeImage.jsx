import React from 'react'

export default function MarqueeImage({ picPath }) {
    return (
        <img
            src={picPath}
            style={{ width: '2rem', height: 'auto' }}
            alt="animated gif"
        ></img>
    )
}
