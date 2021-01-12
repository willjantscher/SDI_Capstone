import React, { useState, Fragment } from "react";

// create a variable that holds the whole form
// buttons will update that variable
// return is that


const TaskerForm = (props) => {
    // console.log(props.units)
    let topChain = props.units.filter(element => element.parent_unique_id === null);
    let midChain = props.units.filter(element => element.parent_unique_id === 1);
    let botChain = props.units.filter(element => element.parent_unique_id > 1  && element.parent_unique_id <= midChain.length+1)
    let lowestChain = props.units.filter(element => element.parent_unique_id > midChain.length+1)
    //first will push cso
    //next will push first cso child (loop)
    //inside loop, push all cmd children
    //then next cso child etc...

    // console.log(topChain)
    // console.log(midChain)
    // console.log(botChain)
    // console.log(lowestChain)
    let selectValues = [];
    for(const unit in topChain) {
        console.log(topChain[unit])
        selectValues.push(
            topChain[unit].unit_name
        )
    }
    console.log(selectValues)
    // let selectValues = props.units.map((unit) => {


    //     //reorganize the array so it goes (cso - command - all units - command - all units, etc)
    //     // console.log(unit)
    //     return(
    //         <option
            
    //         >
                
    //         </option>
    //     )
    // })





    // let unitNames = props.units.map((unit) => {
    //     return(
    //         <option
    //             value={unit}
    //             key={props.units.indexOf(unit)}
    //         >
    //             {unit}
    //         </option>
    //     )
    // })


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
                    className="rux-button col-sm-1 will-colors"
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
                className="rux-button col-sm-1 will-colors"
                type="button" 
                onClick={() => handleRemoveFields(index)}>-</button>
                &nbsp; &nbsp;
                <button
                className="rux-button col-sm-1 will-colors"
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
                                className="rux-select col-md-3 will-colors"
                                id="unit"
                                name="unit"
                                value={inputField.unit}
                                onChange={event => { handleInputChange(index, event)}}
                                >
                                    <optgroup label="USSF"></optgroup>
                                    <option key="empty" value=""></option>
                                {selectValues}
                            </select>
                            
                            {buttonHandler(index)}
                        </div>
                        </Fragment>
                    ))}
                </div>

                <div className="row pb-3 pl-5"> 
                    <label htmlFor="tasker_name" className="col-sm-2">Tasker Name:</label>
                    <input 
                        style={{height:'35px', fontSize:'15px', borderRadius:'3px'}}
                        className="rux-input col-md-2 will-colors"
                        id="tasker_name"
                        name="Tasker Name"
                        placeholder="Tasker Name"
                        onChange={props.onInputChange} 
                    ></input>
                </div>

                <div className="row pb-3 pl-5">
                    <label htmlFor="suspense_date" className="col-sm-2" >Suspense Date</label>
                    <input
                        style={{height:'35px', fontSize:'15px', borderRadius:'3px'}}
                        className="rux-input col-md-2 will-colors"
                        id="suspense_date"
                        type="date"
                        onChange={props.onInputChange}
                    ></input>
                </div>

                <div className="row pb-3 pl-5">
                    <label htmlFor="priority_lvl" className="col-sm-2">Priority</label>
                    <select className="rux-select col-md-2 will-colors" id="priority_lvl" defaultValue = "Low" onChange={props.onInputChange}>
                        <option key="Low" value="Low">Low</option>
                        <option key="Medium" value="Medium">Medium</option>
                        <option key="High" value="High">High</option>
                    </select>
                </div>
                            
                <div className="row pb-3 pl-5">
                    <label htmlFor="predicted_workload" className="col-sm-2" >Predicted Workload</label>
                    <select
                        className="rux-select col-md-1 will-colors"
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
                        style={{borderRadius:'3px'}}
                        className="rux-form-field--large col-md-6 will-colors"
                        rows="10"
                        id="desc_text"
                        placeholder="Tasker Description"
                        onChange={props.onInputChange} 
                    ></textarea>
                </div>

                <div className="row pb-3 pl-5">
                    <input className="will-colors rux-button" type="submit" value="Send Tasker with Extreme Prejudice"/>
                </div>

            </form>
        </>
    )
}

export default TaskerForm;