import responseChoices from '../components/formResponseData.json'
import { formEntries } from '../components/formEntries'

export let displayResponseData = [];

export const evaluateForm = (formData) => {

    const diagnosis = formData.some(obj => obj.radiodiagnosis === "Yes");

    const answersByKey = {};
    formData.forEach((obj) => {
        const [[key, value]] = Object.entries(obj);
        answersByKey[key] = value;
    });

    displayResponseData = formData
        .map((entry) => {
            const [[key, value]] = Object.entries(entry)
            const chosen = formEntries.find((element) => element.id == key)

            // Ignore fields that are not defined in formEntries (e.g. free-text helpers)
            if (!chosen) {
                return null
            }

            chosen.options = value

            let comment = ''

            if (responseChoices[key]) {
                if (key == 'bodypart' && diagnosis) {
                    comment = ''
                } else {
                    comment = responseChoices[key][value] || ''
                }
            }

            chosen.comment = comment

            return {
                id: chosen.label,
                key,
                response: value,
                comment: chosen.comment,
                videos: [],
                links: [],
            }
        })
        .filter(Boolean)

    const entriesByKey = Object.fromEntries(
        displayResponseData.map((entry) => [entry.key, entry])
    );

    // Generic helper to apply rule sets (videos, links) based on answers
    function applyRules(ruleArray, fieldName) {
        if (!Array.isArray(ruleArray)) return;

        ruleArray.forEach((rule) => {
            const { when, attachTo } = rule;
            const items = rule[fieldName];

            if (!when || !Array.isArray(items)) {
                return;
            }

            const matches = Object.entries(when).every(
                ([key, expected]) => {
                    const actual = answersByKey[key];

                    // Support simple equality (existing behaviour)
                    if (
                        expected === null ||
                        typeof expected === 'string' ||
                        typeof expected === 'number' ||
                        typeof expected === 'boolean'
                    ) {
                        return actual === expected;
                    }

                    // Support contains / containsAny for string fields
                    if (
                        expected &&
                        typeof expected === 'object' &&
                        typeof actual === 'string'
                    ) {
                        const actualLower = actual.toLowerCase();

                        if (typeof expected.contains === 'string') {
                            return actualLower.includes(
                                expected.contains.toLowerCase()
                            );
                        }

                        if (Array.isArray(expected.containsAny)) {
                            return expected.containsAny.some((needle) =>
                                actualLower.includes(
                                    String(needle).toLowerCase()
                                )
                            );
                        }
                    }

                    return false;
                }
            );

            if (!matches) {
                return;
            }

            const targetKey = attachTo || Object.keys(when)[0];
            const targetEntry = entriesByKey[targetKey];

            if (targetEntry) {
                if (!Array.isArray(targetEntry[fieldName])) {
                    targetEntry[fieldName] = [];
                }
                targetEntry[fieldName].push(...items);
            }
        });
    }

    // Apply video and link rules based on combinations of answers (reusable)
    applyRules(responseChoices.videos, 'videos');
    applyRules(responseChoices.links, 'links');

}
