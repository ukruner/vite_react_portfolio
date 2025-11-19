import React from 'react'

export default function CheckBox({ entry, isCheckedObject, setIsCheckedObject }) {
    return (
        <div className="m-2 flex gap-2" key={entry.id}>
            <input
                type={entry.type}
                id={entry.id}
                name={entry.id}
                value={isCheckedObject[entry.id] ? 'Yes' : 'No'}
                onChange={() =>
                    entry.func(event, setIsCheckedObject, isCheckedObject)
                }
                checked={isCheckedObject[entry.id]}
            ></input>
            <label htmlFor={entry.id}>{entry.label}</label>
        </div>
    )
}
