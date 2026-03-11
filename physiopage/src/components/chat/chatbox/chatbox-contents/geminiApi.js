import API_BASE from '../../../../utils/apiBase'

export async function fetchGemini(message) {
    const res = await fetch(`${API_BASE}/backend/gemini`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
            message: message,
        }),
    })
    return res.json()
}
