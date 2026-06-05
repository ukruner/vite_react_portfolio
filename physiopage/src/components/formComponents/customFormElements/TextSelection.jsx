import React from 'react'

export default function TextSelection({ entry, value, onChange }) {
    const isControlled = typeof value !== 'undefined'

    return (
        <div key={entry.id} className="questionnaire-field">
            <label htmlFor={entry.id} key={entry.id} className="questionnaire-label">
                {entry.label}
            </label>
            <select
                key={entry.id + 'select'}
                name={entry.id}
                id={entry.id}
                data-testid={entry.id}
                className="questionnaire-form-select"
                value={isControlled ? value : undefined}
                onChange={onChange}
            >
                <option key={entry.id + 'option'}></option>
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
