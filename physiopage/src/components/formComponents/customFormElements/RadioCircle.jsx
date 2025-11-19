import React from 'react'

export default function RadioCircle({ entry }) {
    return (
        <fieldset key={entry.label} className='mt-2'>
            {' '}
            <div className="grid gap-2">
                <legend>{entry.label}</legend>
                <div className="flex gap-2 ">
                    {entry.options.map((option) => {
                        return (
                            <label key={option}>
                                <input
                                    type={entry.type}
                                    key={entry.options.indexOf(option)}
                                    id={entry.id}
                                    name={entry.id}
                                    value={option}
                                ></input>
                                {' ' + option}
                            </label>
                        )
                    })}
                </div>
            </div>
        </fieldset>
    )
}
