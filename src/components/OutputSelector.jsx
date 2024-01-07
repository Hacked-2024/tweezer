import './OutputSelector.css'

const OutputSelector = ({ text, id }) => {
    return (
        <>
            <div className="box">
                <input id={id} type="checkbox"/>
                <span className="check"></span>
                <label htmlFor={id}>{text}</label>
            </div>
        </>
    )
}

export default OutputSelector