import React, { useState, Fragment } from "react";

// create a variable that holds the whole form
// buttons will update that variable
// return is that


const TaskerForm = (props) => {
    let unitNames = props.units.map((unit) => {
        return(
            <option
                value={unit}
                key={props.units.indexOf(unit)}
            >
                {unit}
            </option>
        )
    })


    let workloadOptions = [];
    for(let i = 0; i < 24; i ++) {
        workloadOptions.push(
            <option id={i} key = {i} value={i}>{i}</option>
        )
    }


    const [inputFields, setInputFields] = useState([
        { unit : '' , unit_id : ''}
    ]);

    const handleAddFields = () => {
        const values = [...inputFields];
        values.push({ unit: '' });
        setInputFields(values);
    };

    const handleRemoveFields = index => {
        const values = [...inputFields];
        values.splice(index, 1);
        setInputFields(values);
        props.onUnitChange(values);
    };

    const handleInputChange = (index, event) => {
        const values = [...inputFields];
            values[index].unit = event.target.value;
            //create a handler for this that sets the values when called from in here
        setInputFields(values);
        props.onUnitChange(values);
    };

    const buttonHandler = (index) => {
        if(inputFields.length<2) {
            return(
                <button
                className="rux-button"
                type="button"
                onClick={() => handleAddFields()}
                >
                +
                </button>
            )
        } else return(
            <div>
                <button
                className="rux-button"
                type="button" 
                onClick={() => handleRemoveFields(index)}>-</button>

                <button
                className="rux-button"
                type="button"
                onClick={() => handleAddFields()}>+</button>
            </div>
        )
    }

    return(
        <>
            <div className="rux-form-field__label">Select Units to send this Tasker to</div>

            <form onSubmit={props.onSubmitTasker} className="rux-form-field rux-form-field--large">
                <div>
                    {inputFields.map((inputField, index) => (
                        <Fragment key={`${inputField}~${index}`}>
                        <div className="form-group col-sm-6">
                            <label htmlFor="unit">Unit: </label>
                            <select 
                                className="rux-select"
                                id="unit"
                                name="unit"
                                value={inputField.unit}
                                onChange={event => { handleInputChange(index, event)}}
                                >
                                    <optgroup label="All Options"></optgroup>
                                    <option key="empty" value=""></option>
                                {unitNames}
                            </select>
                            {buttonHandler(index)}
                        </div>
                        </Fragment>
                    ))}
                </div>

                <div className="form-row"> 
                    <label htmlFor="tasker_name">Tasker Name:</label>
                    <input 
                        className="rux-input"
                        id="tasker_name"
                        name="Tasker Name"
                        placeholder="Tasker Name"
                        onChange={props.onInputChange} 
                    ></input>
                </div>

                <div>
                    <label htmlFor="suspense_date" >Suspense Date</label>
                    <input
                        className="rux-input"
                        id="suspense_date"
                        type="date"
                        onChange={props.onInputChange}
                    ></input>
                </div>

                <div>
                    <span>Priority</span>
                    <select className="rux-select" id="priority_lvl" defaultValue = "Low" onChange={props.onInputChange}>
                        <option key="Low" value="Low">Low</option>
                        <option key="Medium" value="Medium">Medium</option>
                        <option key="High" value="High">High</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="predicted_workload">Predicted Workload</label>
                    <select
                        className="rux-select"
                        id="predicted_workload"
                        type="number"
                        min="1"
                        max="24"
                        placeholder="hrs"
                        onChange={props.onInputChange} >
                        <option key="empty" value=""></option>
                        {workloadOptions}
                    </select>
                </div>

                <div>
                    <label htmlFor="desc_text"></label>
                    <textarea 
                        className="rux-form-field--large"
                        id="desc_text"
                        placeholder="Tasker Description"
                        onChange={props.onInputChange} 
                    ></textarea>
                </div>

                <input className="rux-button" type="submit" value="Send Tasker with Extreme Prejudice"/>
            </form>
        </>
    )
}

export default TaskerForm;