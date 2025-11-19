import React from 'react'

export default function TextSelection({ entry }) {
    return (
        <div key={entry.id} className="mt-2">
            <label htmlFor={entry.id} key={entry.id}>
                {entry.label}
            </label>
            <select
                key={entry.id + 'select'}
                name={entry.id}
                id={entry.id}
                className="questionnaire-form-select"
            >
                <option key={entry.id + 'option'} ></option>
                {entry.options.map((option) => {
                    return (
                        <option key={option}>
                            {option}
                        </option>
                    )
                })}
            </select>
        </div>
    )
}
