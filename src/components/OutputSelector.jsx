import './OutputSelector.css'

const OutputSelector = ({ text }) => {
    return (
        <>
            <div className='output-selector-container'>
                <div className="checkbox-wrapper-7">
                    <input class="tgl tgl-ios" id="cb2-7" type="checkbox"/>
                    <label class="tgl-btn" for="cb2-7"></label>
                </div>
                <div>
                    {text}
                </div>
            </div>
        </>
    )
}

export default OutputSelector