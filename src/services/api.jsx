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
        console.log(res);
        
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
    const allResults = {
        moderation: null,
        misinformation: null,
        offensiveness: null
      }

      if (!currentlyChecked) {return}

      if (currentlyChecked.some(item => apiParser.MODERATION_ATTRIBS.includes(item))) {
        allResults.moderation = await moderateText(textValue)
      } 

      if (currentlyChecked.includes("Misinformation")) {
        const misinformationRes = await factCheckText(textValue)  
        console.log(misinformationRes);
        
        allResults.misinformation = Number(misinformationRes.truthfulness)
      }

      if (currentlyChecked.includes("Offensiveness")) {
        const offensiveRes = await getOffensivenessText(textValue)
        allResults.offensiveness = Number(offensiveRes.offensiveness)
      }

      return allResults
      
}

export default {
    extractAll
}
