import OutputSelector from "./OutputSelector"

import "./TextEvaluationCheckboxes.css"

const TextEvaluationCheckboxes = () => {
    return (
        <div id="evaluation-checkbox-container">
            <h2>Scan for:</h2>
            <div className="evaluation-checkbox-row">
                <OutputSelector text={"Harassment"} id={"1"}/>
                <OutputSelector text={"Self Harm"} id={"2"}/>
                <OutputSelector text={"Hate"} id={"3"}/>
                <OutputSelector text={"Sexual Content"} id={"4"}/>
            </div>
            <div className="evaluation-checkbox-row">
                <OutputSelector text={"Minors"} id={"5"}/>
                <OutputSelector text={"Violence"} id={"6"}/>
                <OutputSelector text={"Misinformation"} id={"7"}/>
                <OutputSelector text={"Offensiveness"} id={"8"}/>
            </div>
            
        </div>
    )
}

export default TextEvaluationCheckboxes