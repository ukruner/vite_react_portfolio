import { Link, Navigate } from 'react-router-dom'
import React, { useState } from 'react'
import { evaluateForm } from '../../utils/evaluateForm'
import { formEntries } from '../formEntries'
import { useAuthState } from '../../utils/auth'
import ErrorPage from '../error/Error'
import { postData2 } from '../../utils/postMongo'
import TextSelection from './customFormElements/textSelection'
import RadioCircle from './customFormElements/radioCircle'
import CheckBox from './customFormElements/checkBox'

export default function Questionnaire() {
    const [isCheckedObject, setIsCheckedObject] = useState({
        offwork: false,
        treatment: false,
        duration: true,
        diagnosis: true,
        bodypart: true,
        pregnancy: true,
        menopause: true
    })

    const [submitted, setSubmitted] = useState(false)
    const [submissionError, setSubmissionError] = useState('')
    const [selectedBodypart, setSelectedBodypart] = useState('')
    const [diagnosisAnswer, setDiagnosisAnswer] = useState('')

    const { user, authResolved } = useAuthState();

    // data-no-intersection-state-observed pop up in DOM tree Inspect?

    if (!authResolved) {
        return null
    }

    async function handleSubmit(event) {
        event.preventDefault()
        const form = event.target
        const fd = new FormData(form)

        const arrayData = Array.from(fd.entries())
        let dictFromData = Object.fromEntries(arrayData)
        dictFromData = { ...dictFromData, user }
       
        const spreadEntriesData = arrayData.map(([key, value]) => ({
            [key]: value,
        }))
        evaluateForm(spreadEntriesData)
        setSubmissionError('')
        try {
            await postData2(dictFromData)
            setSubmitted(true)
        } catch (error) {
            setSubmissionError(
                error?.message || 'Failed to submit questionnaire.'
            )
        }
    }

    return submitted ? (
        <Navigate to="/results" />
    ) : user ? (
        <section className="questionnaire-page-shell">
            <div className="questionnaire-hero">
                <p className="questionnaire-kicker">Personalised guidance</p>
                <h1>Tell us what is going on</h1>
                <p>
                    A short assessment helps us shape your education, resources,
                    and next steps around your symptoms and current care.
                </p>
            </div>

            <div className="questionnaire-box">
                <form
                    key="23w5e4"
                    className="questionnaire-form"
                    onSubmit={handleSubmit}
                >
                    {formEntries.map((entry) => {
                        switch (entry.type) {
                            case 'text':
                                if (isCheckedObject[String(entry.parent)]) {
                                    const extraProps =
                                        entry.id === 'bodypart'
                                            ? {
                                                  value: selectedBodypart,
                                                  onChange: (event) =>
                                                      setSelectedBodypart(
                                                          event.target.value
                                                      ),
                                              }
                                            : {}

                                    return (
                                        <TextSelection
                                            key={entry.id}
                                            entry={entry}
                                            {...extraProps}
                                        />
                                    )
                                } else {
                                    break
                                }
                            case 'radio':
                                if (entry.id === 'radiodiagnosis') {
                                    return (
                                        <React.Fragment key={entry.id}>
                                            <RadioCircle
                                                entry={entry}
                                                onChange={(event) =>
                                                    setDiagnosisAnswer(
                                                        event.target.value
                                                    )
                                                }
                                            />
                                            {diagnosisAnswer === 'Yes' && (
                                                <div className="questionnaire-field mt-2">
                                                    <label
                                                        htmlFor="diagnosisdetail"
                                                        className="questionnaire-label"
                                                    >
                                                        If yes, what is the
                                                        diagnosis?
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="diagnosisdetail"
                                                        name="diagnosisdetail"
                                                        className="questionnaire-text-input"
                                                    />
                                                </div>
                                            )}
                                        </React.Fragment>
                                    )
                                }

                                if (entry.id === 'radioneck') {
                                    if (selectedBodypart === 'Neck') {
                                        return (
                                            <RadioCircle
                                                key={entry.id}
                                                entry={entry}
                                            ></RadioCircle>
                                        )
                                    }
                                    break
                                }

                                if (isCheckedObject[String(entry.parent)]) {
                                    return (
                                        <RadioCircle
                                            key={entry.id}
                                            entry={entry}
                                        ></RadioCircle>
                                    )
                                } else {
                                    break
                                }
                            case 'checkbox':
                                if (entry.parent) {
                                    return (
                                        <CheckBox
                                            key={entry.id}
                                            entry={entry}
                                            isCheckedObject={isCheckedObject}
                                            setIsCheckedObject={
                                                setIsCheckedObject
                                            }
                                        />
                                    )
                                } else {
                                    break
                                }
                        }
                    })}
                    {submissionError && (
                        <p className="data-errors" role="alert">
                            {submissionError}
                        </p>
                    )}
                    <div className="questionnaire-actions">
                        <button className="submit-button" type="submit" data-testid={'submitbutton'}>
                            Submit your form
                        </button>

                        <Link to="/" className="questionnaire-secondary-link">
                            Back to home
                        </Link>
                    </div>
                </form>
            </div>
        </section>
    ) : (
        <ErrorPage></ErrorPage>
    )
}
