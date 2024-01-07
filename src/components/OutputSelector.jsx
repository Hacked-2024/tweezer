import './OutputSelector.css'

const OutputSelector = ({ text, id }) => {
    return (
        <>
            <div>
                <div class="box">
                    <input id={id} type="checkbox"/>
                    <span class="check"></span>
                    <label for={id}>{text}</label>
                </div>
            </div>
        </>
    )
}

export default OutputSelector