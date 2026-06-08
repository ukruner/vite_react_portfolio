import {
    render,
    screen,
    fireEvent,
    waitFor,
} from '@testing-library/react'
import App from '../src/App'
import { Provider } from 'react-redux'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import { configureStore } from '@reduxjs/toolkit'
import userSlice from '../src/store/slices/userSlice'
import switcherSlice from '../src/store/slices/switchers'
import chatSlice from '../src/store/slices/chatSlice'
import { vi } from 'vitest'

vi.mock('../src/utils/postMongo', () => ({
    postData2: vi.fn().mockResolvedValue(undefined),
}))

vi.mock('../src/components/chat/chatbox/chatbox-contents/geminiApi', () => ({
    fetchGemini: vi.fn(),
}))

import { fetchGemini } from '../src/components/chat/chatbox/chatbox-contents/geminiApi'
import { postData2 } from '../src/utils/postMongo'
import { routes } from '../src/router'
import mainStore from '../src/store'

describe('App testing suite, integration tests', () => {
    afterEach(() => {
        vi.clearAllMocks()
        sessionStorage.clear()
    })

    const formDataPopulate = (elementArray) => {
        elementArray.forEach((obj) => {
            const { type } = obj

            const [[key, value]] = Object.entries(obj).filter(
                ([k]) => k !== 'type'
            )

            const elementToChange = screen.getByTestId(key)

            if (type === 'radio') {
                fireEvent.click(elementToChange)
                return
            } else {
                fireEvent.change(elementToChange, { target: { value: value } })
            }
        })
    }
    beforeEach(() => {
        global.fetch = vi.fn((input) => {
            const url = typeof input === 'string' ? input : input?.url ?? ''
            const jsonResponse = (body) => ({
                ok: true,
                status: 200,
                headers: {
                    get: (name) =>
                        name === 'content-type'
                            ? 'application/json; charset=utf-8'
                            : null,
                },
                json: () => Promise.resolve(body),
            })

            if (url.includes('/backend/sessionStatus')) {
                return Promise.resolve(jsonResponse({ uid: 'Patrick' }))
            }

            return Promise.resolve(jsonResponse({}))
        })
    })

    const createTestStore = () =>
        configureStore({
            reducer: {
                userSlice,
                chatSlice,
                switcherSlice,
            },
            preloadedState: {
                userSlice: {
                    user: 'Patrick',
                    authResolved: true,
                },
            },
    })

    it('submits the form with comprehensive dummy data - and in formSummary renders all of the text/links/videos needed', async () => {
        const store = createTestStore()
        const questionnaireRouter = createMemoryRouter(routes, {
            initialEntries: ['/questionnaire'],
            future: {
                v7_startTransition: true,
                v7_relativeSplatPath: true,
            },
        })

        render(
            <Provider store={store}>
                <>
                    <App />
                    <RouterProvider router={questionnaireRouter} />
                </>
            </Provider>
        )

        const offwork = await screen.findByTestId('offwork')
        fireEvent.click(offwork)
        const treatment = screen.getByTestId('treatment')
        fireEvent.click(treatment)

        formDataPopulate([
            { bodypart: 'Lower back' },
            { duration: 'Over 6 months' },
            { radiodiagnosisNo: 'No', type: 'radio' },
            { radiopregnancyYes: 'Yes', type: 'radio' },
            { radiomenopauseYes: 'Yes', type: 'radio' },
            { offworkduration: 'Over 6 months' },
            { caremodality: 'Osteopath' },
            { careproviderPrivate: 'Yes', type: 'radio' },
            { exercisecount: '3-6' },
            { apptfrequency: 'Once every 2-3 weeks' },
            { radioeducationNo: 'No', type: 'radio' },
        ])

        const submitButton = screen.getByTestId('submitbutton')
        fireEvent.click(submitButton)
        const bodypartFeedback = await screen.findByText(
            /arguably the most common musculoskeletal problem in the world/i
        )
        expect(bodypartFeedback).toBeInTheDocument()
        const durationFeedback = screen.getByText(
            /If the treatment you have been receiving has not led you to full recovery/i
        )
        expect(durationFeedback).toBeInTheDocument()

        const offworkdurationFeedback = screen.getByText(
            /at this stage, if your mental health is affected /i
        )
        expect(offworkdurationFeedback).toBeInTheDocument()
        const modalityFeedback = screen.getByText(
            /typically a great blend of treatment knowledge of so called hands-on /i
        )
        expect(modalityFeedback).toBeInTheDocument()
        const providerFeedback = screen.getByText(
            /arguably most accessible way to get seen and assessed as quickly as possible/i
        )
        expect(providerFeedback).toBeInTheDocument()
        const exercisecountFeedback = screen.getByText(
            /your therapist either trusts your dedication, memory and level your body awareness/i
        )
        expect(exercisecountFeedback).toBeInTheDocument()
        const apptfrequencyFeedback = screen.getByText(
            /A reasonable approach with regular reviews, which private clinics and NHS/i
        )
        expect(apptfrequencyFeedback).toBeInTheDocument()
        const educationFeedback = screen.getByText(
            /communication between you and your therapist, as well as full awareness of your issue are 2 cornerstones of successful treatment and recovery./i
        )
        expect(educationFeedback).toBeInTheDocument()
        const helpfulResourceHeading = screen.getByText(/helpful resources/i)
        expect(helpfulResourceHeading).toBeInTheDocument()
        const tenFactsBackPain = screen.getByText(/10 facts about back pain/i)
        expect(tenFactsBackPain).toBeInTheDocument()
        const pregnancyInfo = screen.getByText(
            /pelvic girdle pain and other common conditions in pregnancy/i
        )
        expect(pregnancyInfo).toBeInTheDocument()
        const menopauseInfo = screen.getByText(
            /menopause and musculoskeletal health: why it matters/i
        )
        expect(menopauseInfo).toBeInTheDocument()
        const chronicPainInfo = screen.getByText(/chronic pain document/i)
        expect(chronicPainInfo).toBeInTheDocument()
        const chronicPainVideo = screen.getByText(/tame the beast/i)
        expect(chronicPainVideo).toBeInTheDocument()
        const backPainVideo = screen.getByText(
            /the truth about back pain most people don`t know/i
        )
        expect(backPainVideo).toBeInTheDocument()

        await waitFor(() => {
            expect(postData2).toHaveBeenCalledTimes(1)
        })
    })

    it('presses on global chat button to open it, the whole component displays well, message is typed in and sent > response is received and visible', async () => {
        fetchGemini.mockResolvedValue('Mocked Gemini response')
        const baseRouter = createMemoryRouter(routes, {
            initialEntries: ['/'],
            future: {
                v7_startTransition: true,
                v7_relativeSplatPath: true,
            },
        })

        render(
            <Provider store={mainStore}>
                <>
                    <App />
                    <RouterProvider router={baseRouter} />
                </>
            </Provider>
        )

        const globalChatButton = screen.getByLabelText('globalchatbutton')
        expect(globalChatButton).toBeInTheDocument()
        const chatBoxParent = screen.queryByTestId('chatboxparent')
        expect(chatBoxParent).not.toBeInTheDocument()
        fireEvent.click(globalChatButton)

        const chatBoxParent2 = screen.getByTestId('chatwindow')

        expect(chatBoxParent2).toBeInTheDocument()

        const inputElement = screen.getByLabelText('chat-textarea')
        expect(inputElement).toBeInTheDocument()

        fireEvent.change(inputElement, { target: { value: 'Hello Gemini' } })

        fireEvent.keyDown(inputElement, { key: 'Enter' })
        const chatHistory = mainStore.getState().chatSlice.history

        await waitFor(() => {
            expect(fetchGemini).toHaveBeenCalledTimes(1)
        })

        await waitFor(() => {
            expect(chatHistory.length).toBe(1)
        })

        const userMessage = screen.getByText('Hello Gemini')
        expect(userMessage).toHaveClass('message-user')
        const aiMessage = screen.getByText('Mocked Gemini response')
        expect(aiMessage).toHaveClass('message-ai')
        const chatHistory1 = mainStore.getState().chatSlice.history
        expect(chatHistory1.length).toBe(2)
        const closeButton = screen.getByLabelText('closebutton')
        const resetButton = screen.queryByLabelText('resetbutton')
        expect(closeButton).toBeInTheDocument()
        expect(resetButton).not.toBeInTheDocument()
        fireEvent.click(closeButton)
        const finishMessage = screen.getByText(
            /Thank you for using Gemini today/i
        )
        expect(finishMessage).toBeInTheDocument()
        const resetButton2 = screen.getByLabelText('resetbutton')

        expect(resetButton2).toBeInTheDocument()
        fireEvent.click(resetButton2)
        expect(chatBoxParent2).not.toBeInTheDocument()
    })
})
