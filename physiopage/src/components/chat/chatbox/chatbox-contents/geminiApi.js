export async function fetchGemini(message) {
    const res = await fetch('http://localhost:5000/api/backend/gemini', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            message: message,
        }),
    })
    return res.json()
}