import { Link, Navigate } from 'react-router-dom'
import { useState } from 'react'
import { evaluateForm } from '../../utils/evaluateForm'
import { formEntries } from '../formEntries'
import { getUserObject } from '../../utils/auth'
import ErrorPage from '../error/Error'
import { postData2 } from '../../utils/postMongo'
import { getAuth } from "firebase/auth";

export default function Questionnaire() {
    const [isCheckedObject, setIsCheckedObject] = useState({
        offwork: false,
        treatment: false,
        duration: true,
        diagnosis: true,
        bodypart: true,
    })

    const [submitted, setSubmitted] = useState(false)
    const user = getUserObject();
    console.log(user);
    async function handleSubmit(event) {
        event.preventDefault()
        const form = event.target
        const fd = new FormData(form)

        const arrayData = Array.from(fd.entries());
        let dictFromData = Object.fromEntries(arrayData);
        dictFromData = {...dictFromData, user}
        const auth = getAuth();
        const loggedInUser = auth.currentUser;
        console.log(loggedInUser);
        // const token = await loggedInUser.getIdToken(true);
        const spreadEntriesData = arrayData.map(([key, value]) => ({
            [key]: value,
        }))
       
        console.log(dictFromData);
        console.log(spreadEntriesData);
        evaluateForm(spreadEntriesData)
        postData2(dictFromData);
        setSubmitted(true)
    }

    return user ? (submitted ? (
        <Navigate to="/results" />
    ) : (
        <div className="extra-padding rounded-3xl">
            <div className="questionnaire-box ">
                <form key='23w5e4'
                    className="grid rounded-3xl border-2  border-black p-5 ~text-xs/lg ~mt-5/20"
                    onSubmit={handleSubmit}
                >
                    {formEntries.map((entry) => {
                        switch (entry.type) {
                            case 'text':
                                if (isCheckedObject[String(entry.parent)]) {
                                    return (
                                        <div key={entry.id} className="mt-2">
                                            <label
                                                htmlFor={entry.id}
                                                key={entry.id}
                                            >
                                                {entry.label}
                                            </label>
                                            <select
                                                key={entry.id+'select'}
                                                name={entry.id}
                                                id={entry.id}
                                                className="ease m-2 h-6 cursor-pointer appearance-none rounded border border-slate-200 bg-transparent  px-1 text-center leading-tight shadow-sm transition duration-300 hover:border-slate-400 focus:border-slate-400 focus:shadow-md focus:outline-none"
                                            >
                                                <option key={entry.id+'option'} value=""></option>
                                                {entry.options.map((option) => {
                                                    return (
                                                        <option
                                                            key={option}
                                                            defaultValue={''}
                                                        >
                                                            {option}
                                                        </option>
                                                    )
                                                })}
                                            </select>
                                        </div>
                                    )
                                } else {
                                    break
                                }
                            case 'radio':
                                if (isCheckedObject[String(entry.parent)]) {
                                    return (
                                        <fieldset key={entry.label}>
                                            {' '}
                                            <div className="grid gap-4">
                                                <legend>{entry.label}</legend>
                                                <div className="flex gap-2 ">
                                                    {entry.options.map(
                                                        (option) => {
                                                            return (
                                                                <label
                                                                    key={option}
                                                                >
                                                                    <input
                                                                        type={
                                                                            entry.type
                                                                        }
                                                                        key={entry.options.indexOf(
                                                                            option
                                                                        )}
                                                                        id={
                                                                            entry.id
                                                                        }
                                                                        name={
                                                                            entry.id
                                                                        }
                                                                        value={
                                                                            option
                                                                        }
                                                                    ></input>
                                                                    {' ' +
                                                                        option}
                                                                </label>
                                                            )
                                                        }
                                                    )}
                                                </div>
                                            </div>
                                        </fieldset>
                                    )
                                } else {
                                    break
                                }
                            case 'checkbox':
                                if (entry.parent) {
                                    return (
                                        <div
                                            className="m-2 flex gap-2"
                                            key={entry.id}
                                        >
                                            <input
                                                type={entry.type}
                                                id={entry.id}
                                                name={entry.id}
                                                value={
                                                    isCheckedObject[entry.id]
                                                        ? 'Yes'
                                                        : 'No'
                                                }
                                                onChange={() =>
                                                    entry.func(
                                                        event,
                                                        setIsCheckedObject,
                                                        isCheckedObject
                                                    )
                                                }
                                                checked={
                                                    isCheckedObject[entry.id]
                                                }
                                            ></input>
                                            <label htmlFor={entry.id}>
                                                {entry.label}
                                            </label>
                                        </div>
                                    )
                                } else {
                                    break
                                }
                        }
                    })}
                    <div>
                        <button
                            className="submit-button my-2 ~text-xs/lg ~xs/md:~p-1/4"
                            type="submit"
                        >
                            Submit your form
                        </button>
                    </div>

                    <Link to="/" className="mt-2">
                        Back to root
                    </Link>
                </form>
            </div>
        </div>
    )) : (<ErrorPage loggedIn={"noToken"}></ErrorPage>)
}
