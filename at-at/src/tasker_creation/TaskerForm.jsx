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
    for(let i = 1; i < 24; i ++) {
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
                <div className="row pb-3 pl-5">
                    <button
                    className="rux-button col-sm-1"
                    type="button"
                    onClick={() => handleAddFields()}
                    >
                    +
                    </button>
                    <div className=""></div>
                </div>
            )
        } else return(
            <div className="row pb-3 pl-5">
                <button
                className="rux-button col-sm-1"
                type="button" 
                onClick={() => handleRemoveFields(index)}>-</button>
                &nbsp; &nbsp;
                <button
                className="rux-button col-sm-1"
                type="button"
                onClick={() => handleAddFields()}>+</button>

                <div className="col-md-8"></div>
            </div>
        )
    }

    if(props.flag === "good") {
        setTimeout(() => {
            setInputFields([{ unit : '' , unit_id : ''}])
          }, 200);
    }

    return(
        <>
            <div className="rux-form-field__label"></div>
{/* rux-form-field rux-form-field--large */}
            <form id="tasker_form" onSubmit={props.onSubmitTasker} className="container-fluid ">
                
                <div className="">
                    {inputFields.map((inputField, index) => (
                        <Fragment key={`${inputField}~${index}`}>
                        <div className="row pl-5">
                            <label htmlFor="unit" className="col-sm-2" >Unit: </label>
                            <select 
                                className="rux-select col-md-3"
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

                <div className="row pb-3 pl-5"> 
                    <label htmlFor="tasker_name" className="col-sm-2">Tasker Name:</label>
                    <input 
                        className="rux-input col-md-2"
                        id="tasker_name"
                        name="Tasker Name"
                        placeholder="Tasker Name"
                        onChange={props.onInputChange} 
                    ></input>
                </div>

                <div className="row pb-3 pl-5">
                    <label htmlFor="suspense_date" className="col-sm-2" >Suspense Date</label>
                    <input
                        className="rux-input col-md-2"
                        id="suspense_date"
                        type="date"
                        onChange={props.onInputChange}
                    ></input>
                </div>

                <div className="row pb-3 pl-5">
                    <label htmlFor="priority_lvl" className="col-sm-2">Priority</label>
                    <select className="rux-select col-md-2" id="priority_lvl" defaultValue = "Low" onChange={props.onInputChange}>
                        <option key="Low" value="Low">Low</option>
                        <option key="Medium" value="Medium">Medium</option>
                        <option key="High" value="High">High</option>
                    </select>
                </div>

                <div className="row pb-3 pl-5">
                    <label htmlFor="predicted_workload" className="col-sm-2">Predicted Workload</label>
                    <select
                        className="rux-select col-md-1"
                        id="predicted_workload"
                        placeholder="hrs"
                        onChange={props.onInputChange} >
                            <optgroup label="Hours"></optgroup>
                        {workloadOptions}
                    </select>
                </div>

                <div className="row pb-3 pl-5">
                    <label htmlFor="desc_text" ></label>
                    <textarea 
                        className="rux-form-field--large col-md-6"
                        rows="10"
                        id="desc_text"
                        placeholder="Tasker Description"
                        onChange={props.onInputChange} 
                    ></textarea>
                </div>

                <div className="row pb-3 pl-5">
                    <input className="rux-button " type="submit" value="Send Tasker with Extreme Prejudice"/>
                </div>

            </form>
        </>
    )
}

export default TaskerForm;