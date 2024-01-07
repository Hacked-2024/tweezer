import axios from "axios"

import apiParser from "./apiParser"

var baseUrl

if (import.meta.env.MODE == "production") {
    baseUrl = ""
} else {
    baseUrl = "http://127.0.0.1:5000"
}

const moderateText = async (text) => {
    const content = {
        textInput: text
    }

    try {
        const res = await axios.post(`${baseUrl}/moderate`, content)
        const parsedRes = apiParser.extractModerationContentScores(res.data)
        
        return parsedRes
    } catch (err) {
        console.log('Failed to get moderation output,', err);
        return ""
    }
}

const factCheckText = async (text) => {
    const content = {
        textInput: text
    }

    try {
        const res = await axios.post(`${baseUrl}/fact-check`, content)
        return res.data
    } catch (err) {
        console.log('Failed to get fact checking output.');
        return ""
    }
}

const getOffensivenessText = async (text) => {
    const content = {
        textInput: text
    }

    try {
        const res = await axios.post(`${baseUrl}/offensiveness`, content)
        return res.data
    } catch (err) {
        console.log('Failed to get offensiveness output.');
        return ""
    }
}

const extractAll = async ( textValue, currentlyChecked ) => {
    var allResults = {
      }

      if (!currentlyChecked) {return}

      if (currentlyChecked.some(item => apiParser.MODERATION_ATTRIBS.includes(item))) {
        console.log('Checking moderation...');
        const moderation = await moderateText(textValue)

        allResults = {
            ...allResults,
            ...moderation
        }
      } 

      if (currentlyChecked.includes("Misinformation")) {
        console.log('Checking for misinformation...');
        const truthRes = await factCheckText(textValue)  
        allResults = {
            ...allResults,
            Truthfulness: Number(truthRes.truthfulness)
        }

      }

      if (currentlyChecked.includes("Offensiveness")) {
        console.log('Checking for offensiveness...');
        const offensiveRes = await getOffensivenessText(textValue)
        allResults = {
            ...allResults,
            Offensiveness: Number(offensiveRes.offensiveness)
        }
      }

      return allResults
      
}

export default {
    extractAll
}
