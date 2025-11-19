import { Link, Navigate } from 'react-router-dom'
import { useState } from 'react'
import { evaluateForm } from '../../utils/evaluateForm'
import { formEntries } from '../formEntries'

import ErrorPage from '../error/Error'
import { postData2 } from '../../utils/postMongo'
import { getAuth } from 'firebase/auth'
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
    })

    const [submitted, setSubmitted] = useState(false)

    // const user = getUserObject();
    const user = 'user'

    // data-no-intersection-state-observed pop up in DOM tree Inspect?



    async function handleSubmit(event) {
        event.preventDefault()
        console.log('submitting')
        const form = event.target
        const fd = new FormData(form)

        const arrayData = Array.from(fd.entries())
        let dictFromData = Object.fromEntries(arrayData)
        dictFromData = { ...dictFromData, user }
        const auth = getAuth()
        const loggedInUser = auth.currentUser
        console.log(loggedInUser)
        // const token = await loggedInUser.getIdToken(true);
        const spreadEntriesData = arrayData.map(([key, value]) => ({
            [key]: value,
        }))
        evaluateForm(spreadEntriesData)
        postData2(dictFromData)
        setSubmitted(true)
    }

    return submitted ? (
        <Navigate to="/results" />
    ) : user ? (
        <div className="rounded-3xl">
            <div className="questionnaire-box ">
                <form
                    key="23w5e4"
                    className="questionnaire-form"
                    onSubmit={handleSubmit}
                >
                    {formEntries.map((entry) => {
                        switch (entry.type) {
                            case 'text':
                                if (isCheckedObject[String(entry.parent)]) {
                                    return <TextSelection entry={entry} />
                                } else {
                                    break
                                }
                            case 'radio':
                                if (isCheckedObject[String(entry.parent)]) {
                                    return <RadioCircle entry={entry} />
                                } else {
                                    break
                                }
                            case 'checkbox':
                                if (entry.parent) {
                                    return (
                                        <CheckBox
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
                    <div>
                        <button className="submit-button mt-4" type="submit">
                            Submit your form
                        </button>
                    </div>

                    <Link to="/" className="mt-2">
                        Back to root
                    </Link>
                </form>
            </div>
        </div>
    ) : (
        <ErrorPage></ErrorPage>
    )
}
