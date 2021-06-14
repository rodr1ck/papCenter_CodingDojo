const nuevoPap = async (data) => {
    try {
        console.log(JSON.stringify(data))

        const res = await fetch('/api/pap', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        })

        console.log(res)
        console.log(res.ok)
        const json = await res.json()

        if (!res.ok) {
            const errors = Object.entries(json.errors).map(
                ([field, { message }]) => ({ field, message }),
            )
            console.log({errors})
            return { success: false, data: errors }
        }
        return { success: true, data: res.statusText }
    } catch (e) {
        console.error(e)
        return { success: false, data: { errors: { error: e } } }
    }
}

export default nuevoPap;
