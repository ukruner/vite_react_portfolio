import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import { fireEvent, cleanup } from '@testing-library/react'
import * as storeModule from '../../store/index.js'
import React from 'react'
vi.mock(import('react-redux'), async (importOriginal) => {
    const actual = await importOriginal()
    return {
        ...actual,
        useSelector: vi.fn(),
        useDispatch: vi.fn(),
    }
})

vi.mock('../store/index.js', () => ({
    default: {
        getState: () => ({
            marqueeSign: {},
            switcherSlice: {},
            chatSlice: {},
            userSlice: {},
        }),
        subscribe: vi.fn(),
        dispatch: vi.fn(),
    },
}))

vi.mock(import('react-router-dom'), async (importOriginal) => {
    const actual = await importOriginal()
    return {
        ...actual,
    }
})

import mainStore from '../../store/index.js'
import { useSelector, useDispatch } from 'react-redux'
import {} from '../../store/slices/switchers.js'
import Questionnaire from './Questionnaire.jsx'
import { Provider } from 'react-redux'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'

describe('Questionnaire form testing suite,', () => {
    const mockReduxSlice = {}

    const mockDispatch = vi.fn()
    useDispatch.mockReturnValue(mockDispatch)


    useSelector.mockImplementation((selectorFn) => {
        return selectorFn(mockReduxSlice)
    })

    afterEach(()=>{
    
  cleanup();
  vi.clearAllMocks();

    })

    it('renders questionnaire with default entries fine', () => {
        const router = createMemoryRouter(
            [{ path: '/', element: <Questionnaire /> }],
            { initialEntries: ['/'] }
        )

        render(
            <Provider store={mainStore}>
                <RouterProvider router={router} />
            </Provider>
        )
        const diagnosis = screen.getByText(/Do you know the diagnosis/i)
        const bodypart = screen.getByRole('combobox', {
            name: /What is the body part affected?/i,
        })
        const duration = screen.getByRole('combobox', {
            name: /How long have you had your problem for/i,
        })
        const offwork = screen.getByRole('checkbox', {
            name: /Are you currently off work because of this issue?/i,
        })
        const education = screen.getByRole('checkbox', {
            name: /Are you currently off work because of this issue?/i,
        })

        expect(diagnosis).toBeInTheDocument()
        expect(bodypart).toBeInTheDocument()
        expect(duration).toBeInTheDocument()

        expect(offwork).toBeInTheDocument()

        expect(education).toBeInTheDocument()

        expect(
            screen.queryByRole(
                ('combobox',
                {
                    name: /For how long/i,
                })
            )
        ).not.toBeInTheDocument()
        expect(screen.queryByText(/Who is it with/i)).not.toBeInTheDocument()
        expect(
            screen.queryByRole(
                ('combobox',
                {
                    name: /How many exercises were you given to do?/i,
                })
            )
        ).not.toBeInTheDocument()
        expect(
            screen.queryByRole(
                ('combobox',
                {
                    name: /How often do you see your therapist?/i,
                })
            )
        ).not.toBeInTheDocument()
        expect(
            screen.queryByText(/and who provides it/i)
        ).not.toBeInTheDocument()
        expect(
            screen.queryByRole(
                ('radio',
                {
                    name: /NHS/i,
                })
            )
        ).not.toBeInTheDocument()
        expect(
            screen.queryByRole(
                ('radio',
                {
                    name: /Private/i,
                })
            )
        ).not.toBeInTheDocument()
        expect(
            screen.queryByRole(
                ('radio',
                {
                    name: /Other/i,
                })
            )
        ).not.toBeInTheDocument();

    })
    it("renders questionnaire with 'for how long' option visible if user selects they have been off work", () => {
        const router = createMemoryRouter(
            [{ path: '/', element: <Questionnaire /> }],
            { initialEntries: ['/'] }
        )

        render(
            <Provider store={mainStore}>
                <RouterProvider router={router} />
            </Provider>
        )
        const offwork = screen.getByRole('checkbox', {
            name: /Are you currently off work because of this issue?/i,
        })
        fireEvent.click(offwork)
        expect(screen.getByRole('combobox', {name: 'For how long?'})).toBeInTheDocument()
                expect(screen.queryByText('Who is it with?')).not.toBeInTheDocument()

    });
    it('renders questionnaire with treatment-specific options visible if user selects they have been or have received treatment', () => {
        const router = createMemoryRouter(
            [{ path: '/', element: <Questionnaire /> }],
            { initialEntries: ['/'] }
        )
        // const state = {checked: 'yes'};
        render(
            <Provider store={mainStore}>
                <RouterProvider router={router} />
            </Provider>
        )
        const treatment = screen.getByRole('checkbox', {
            name: /Are you currently receiving or have you received any treatment?/i,
        })
        fireEvent.click(treatment)
        expect(screen.getByText('Who is it with?')).toBeInTheDocument()
        expect(screen.queryByRole('combobox', {name: 'For how long?'})).not.toBeInTheDocument()

        expect(
            screen.getByRole('combobox', {
                name: /How many exercises were you given to do?/i,
            })
        ).toBeInTheDocument()
        expect(
            screen.getByRole('combobox', {
                name: /How often do you see your therapist?/i,
            })
        ).toBeInTheDocument()
        expect(screen.getByText(/and who provides it/i)).toBeInTheDocument()
        expect(
            screen.getByRole('radio', {
                name: /NHS/i,
            })
        ).toBeInTheDocument()
        expect(
            screen.getByRole('radio', {
                name: /Private/i,
            })
        ).toBeInTheDocument()
        expect(
            screen.getByRole('radio', {
                name: /Other/i,
            })
        ).toBeInTheDocument()
    })
})
