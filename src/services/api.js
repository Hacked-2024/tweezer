import axios from "axios"

if (import.meta.env.MODE == "production") {
    const baseUrl = ""
} else {
    const baseUrl = "http://127.0.0.1:5000"
}

const moderateText = async (text) => {
    const content = {
        textInput: text
    }

    try {
        return await axios.post(`${baseUrl}/moderate`)
    } catch (err) {
        console.log('Failed to get moderation output.');
    }
}
