import React from 'react'

export default function RadioCircle({ entry, onChange }) {
    return (
        <fieldset key={entry.label} className="mt-2">
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
                                    data-testid={entry.id+option}
                                    name={entry.id}
                                    value={option}
                                    onChange={onChange}
                                />
                                {' ' + option}
                            </label>
                        )
                    })}
                </div>
            </div>
        </fieldset>
    )
}
