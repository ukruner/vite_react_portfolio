import { render, screen } from '@testing-library/react'
import React from 'react'

import FormSummary from './FormSummary.jsx'
import { displayResponseData } from '../../utils/evaluateForm.js'

describe('FormSummary rendering suite', () => {
    function setDisplayData(entries) {
        displayResponseData.length = 0
        entries.forEach((e) => displayResponseData.push(e))
    }

    it('renders responses without helpful resources when no links or videos are present', () => {
        setDisplayData([
            {
                id: 'What is the body part affected?',
                key: 'bodypart',
                response: 'Neck',
                comment: 'Test comment',
                videos: [],
                links: [],
            },
        ])

        render(<FormSummary />)

        expect(
            screen.getByText('What is the body part affected?')
        ).toBeInTheDocument()
        expect(screen.getByText('Neck')).toBeInTheDocument()
        expect(screen.getByText('Test comment')).toBeInTheDocument()

        expect(
            screen.queryByText(/Helpful resources/i)
        ).not.toBeInTheDocument()
    })

    it('renders helpful links section when links are present', () => {
        setDisplayData([
            {
                id: 'What is the body part affected?',
                key: 'bodypart',
                response: 'Neck',
                comment: '',
                videos: [],
                links: [
                    {
                        title: 'Neck pain leaflet',
                        url: 'https://example.com/neck',
                    },
                ],
            },
        ])

        render(<FormSummary />)

        expect(
            screen.getByText(/Helpful resources/i)
        ).toBeInTheDocument()

        const link = screen.getByRole('link', {
            name: /Neck pain leaflet/i,
        })
        expect(link).toBeInTheDocument()
        expect(link).toHaveAttribute('href', 'https://example.com/neck')
    })

    it('renders helpful videos section when videos are present', () => {
        setDisplayData([
            {
                id: 'What is the body part affected?',
                key: 'bodypart',
                response: 'Lower back',
                comment: '',
                links: [],
                videos: [
                    {
                        id: 'abc123',
                        title: 'Back pain video',
                    },
                ],
            },
        ])

        render(<FormSummary />)

        expect(
            screen.getByText(/Helpful resources/i)
        ).toBeInTheDocument()

        const videoLink = screen.getByRole('link', {
            name: /Back pain video/i,
        })
        expect(videoLink).toBeInTheDocument()
        expect(videoLink).toHaveAttribute(
            'href',
            'https://www.youtube.com/watch?v=abc123'
        )
    })
})

