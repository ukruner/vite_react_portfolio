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

            let comment = ''

            if (responseChoices[key]) {
                if (key == 'bodypart' && diagnosis) {
                    comment = ''
                } else {
                    comment = responseChoices[key][value] || ''
                }
            }

            return {
                id: chosen.label,
                key,
                response: value,
                comment,
                videos: [],
                links: [],
            }
        })
        .filter(Boolean)

    const entriesByKey = Object.fromEntries(
        displayResponseData.map((entry) => [entry.key, entry])
    );

    // Generic helper to apply rule sets (videos, links) based on answers.
    // Supports both flat arrays of rules and objects grouped by bodypart, e.g.:
    // [{ "Neck": [ { when, videos: [...] }, ... ], "Shoulder": [ ... ] }]
    function applyRules(ruleArray, fieldName) {
        if (!Array.isArray(ruleArray)) return;

        const normalizedRules = [];

        ruleArray.forEach((entry) => {
            if (!entry) return;

            // Flat rule object: { when, attachTo, [fieldName]: [...] }
            if (entry.when && Array.isArray(entry[fieldName])) {
                normalizedRules.push(entry);
                return;
            }

            // Grouped rules: { "Neck": [rules...], "Shoulder": [rules...] }
            if (typeof entry === 'object') {
                Object.entries(entry).forEach(([groupKey, rules]) => {
                    if (!Array.isArray(rules)) return;

                    rules.forEach((rule) => {
                        if (!rule || !Array.isArray(rule[fieldName])) return;

                        const baseWhen = rule.when || {};
                        const withBodypart =
                            groupKey === '_global'
                                ? baseWhen
                                : { bodypart: groupKey, ...baseWhen };

                        normalizedRules.push({
                            ...rule,
                            when: withBodypart,
                        });
                    });
                });
            }
        });

        normalizedRules.forEach((rule) => {
            const { when, attachTo } = rule;
            const items = rule[fieldName];

            if (!when || !Array.isArray(items)) {
                return;
            }

            const matches = Object.entries(when).every(
                ([answerKey, expected]) => {
                    const actual = answersByKey[answerKey];

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
