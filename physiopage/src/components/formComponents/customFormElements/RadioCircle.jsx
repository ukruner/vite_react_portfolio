import React from 'react'

export default function RadioCircle({ entry, onChange }) {
    return (
        <fieldset key={entry.label} className="questionnaire-field">
            <div className="grid gap-3">
                <legend className="questionnaire-label">{entry.label}</legend>
                <div className="questionnaire-radio-row">
                    {entry.options.map((option) => {

                        return (
                            <label key={option} className="questionnaire-choice">
                                <input
                                    type={entry.type}
                                    key={entry.options.indexOf(option)}
                                    id={entry.id}
                                    data-testid={entry.id+option}
                                    name={entry.id}
                                    value={option}
                                    onChange={onChange}
                                />
                                <span>{option}</span>
                            </label>
                        )
                    })}
                </div>
            </div>
        </fieldset>
    )
}
