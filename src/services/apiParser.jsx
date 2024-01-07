const extractModerationContentCategories = ( moderationObj ) => {
    const categories = moderationObj.categories
    const result = {
        "Harassment": categories["harassment"],
        "Hate": categories["hate"],
        "Self Harm": categories["self-harm"],
        "Sexual": categories["sexual"],
        "Violence": categories["violence"],    
    }

    return result
}

const extractModerationContentScores = ( moderationObj ) => {
    const scores = moderationObj.category_scores
    const result = {
        "Harassment": scores["harassment"],
        "Hate": scores["hate"],
        "Self Harm": scores["self-harm"],
        "Sexual": scores["sexual"],
        "Violence": scores["violence"],    
    }

    return result
}

export default {
    extractModerationContentCategories,
    extractModerationContentScores
}