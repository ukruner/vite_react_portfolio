import { describe, it, expect } from 'vitest'
import { evaluateForm } from './evaluateForm.js'
import { formEntries } from '../components/formEntries.js'

describe('evaluateForm', () => {
    it('does not mutate shared form entry options', () => {
        const bodypartEntry = formEntries.find((entry) => entry.id === 'bodypart')
        const originalOptions = [...bodypartEntry.options]

        evaluateForm([
            { bodypart: 'Neck' },
            { duration: '1-2 weeks' },
            { radiodiagnosis: 'No' },
        ])

        expect(bodypartEntry.options).toEqual(originalOptions)
    })
})
