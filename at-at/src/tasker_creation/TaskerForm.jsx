import React, { useState, Fragment } from "react";

// create a variable that holds the whole form
// buttons will update that variable
// return is that


const TaskerForm = (props) => {
    let file_names_render = [];
    if(props.selected_files !== null) {
        let selected_files_names = []
        for(var i = 0; i < props.selected_files.length; i++) {
            selected_files_names.push(props.selected_files[i].name)
            // console.log(props.selected_files[i].name)
        }
        // console.log(selected_files_names)
        file_names_render = selected_files_names.map((name) => {
            return(
                <div key={selected_files_names.indexOf(name)}>
                    <div style={{textAlign: "center"}} >{name}</div>
                </div>
            )
        })
    }


    let topChain = props.units.filter(element => element.parent_unique_id === null);
    let midChain = props.units.filter(element => element.parent_unique_id === 1);
    let botChain = props.units.filter(element => element.parent_unique_id > 1  )
    // && element.parent_unique_id <= midChain.length+1
    // let lowestChain = props.units.filter(element => element.parent_unique_id > midChain.length+1)
    //first will push cso
    //next will push first cso child (loop)
    //inside loop, push all cmd children
    //then next cso child etc...

    let selectValues = [];
    for(const unit in topChain) {
        // console.log(topChain[unit])
        selectValues.push(
            <optgroup label={topChain[unit].unit_name} key="topOptionGroup"></optgroup>
        )
        selectValues.push(
            <option
                value={topChain[unit].unit_name}
                id={topChain[unit].id}
                key={topChain[unit].id}
            >&nbsp;&nbsp;&nbsp;{topChain[unit].unit_name} - direct</option>
        )
        // {console.log(topChain[unit].id)}

        
        let parentId1 = topChain[unit].id;
        for(const unit in midChain) {
            if(midChain[unit].parent_unique_id === parentId1){
                selectValues.push(
                    <optgroup label={"-        " + midChain[unit].unit_name} key={"Mid Option Group" + midChain[unit].id}></optgroup>
                )
                selectValues.push(
                    <option
                        value={midChain[unit].unit_name}
                        id={midChain[unit].id}
                        key={midChain[unit].id}
                    >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{midChain[unit].unit_name} - direct</option>
                )
            }

            let parentId2 = midChain[unit].id;
            for(const unit in botChain) {
                if(botChain[unit].parent_unique_id === parentId2) {
                    selectValues.push(
                        <option
                            value={botChain[unit].unit_name}
                            id={botChain[unit].id}
                            key={botChain[unit].id}
                        >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{botChain[unit].unit_name}</option>
                    )
                    
                }
            }
        }
    }
    // console.log(selectValues)
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
    for(let i = 1; i < 25; i ++) {
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
            values[index].unit_id = event.target.id;
            // console.log(event.target)
            // console.log("this is the target value" + event.target.value)
            // console.log("this is the target id" + event.target.id)
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
            <div className="container-fluid row">
                <form id="tasker_form" onSubmit={props.onSubmitTasker} className="col-md-8">
                    
                    <div className="">
                        {inputFields.map((inputField, index) => (
                            <Fragment key={`${inputField}~${index}`}>
                            <div className="row pl-5">
                                <label htmlFor="unit" className="col-sm-3" >Unit: </label>
                                <select 
                                    className="rux-select col-md-6 will-colors"
                                    id={inputField.unit_id}
                                    name={inputField.unit_id}
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
                        <label htmlFor="tasker_name" className="col-sm-3">Tasker Name: </label>
                        <input 
                            style={{height:'35px', fontSize:'15px', borderRadius:'3px'}}
                            className="rux-input col-md-4 will-colors"
                            id="tasker_name"
                            name="Tasker Name"
                            placeholder="Tasker Name"
                            onChange={props.onInputChange} 
                        ></input>
                    </div>

                    <div className="row pb-3 pl-5">
                        <label htmlFor="suspense_date" className="col-sm-3" >Suspense Date: </label>
                        <input
                            style={{height:'35px', fontSize:'15px', borderRadius:'3px'}}
                            className="rux-input col-md-4 will-colors"
                            id="suspense_date"
                            type="date"
                            onChange={props.onInputChange}
                        ></input>
                    </div>

                    <div className="row pb-3 pl-5">
                        <label htmlFor="priority_lvl" className="col-sm-3">Priority: </label>
                        <select className="rux-select col-md-4 will-colors" id="priority_lvl" defaultValue = "Low" onChange={props.onInputChange}>
                            <option key="Low" value="Low">Low</option>
                            <option key="Medium" value="Medium">Medium</option>
                            <option key="High" value="High">High</option>
                        </select>
                    </div>
                                
                    <div className="row pb-3 pl-5">
                        <label htmlFor="predicted_workload" className="col-sm-3" >Predicted Workload: </label>
                        <select
                            className="rux-select col-md-2 will-colors"
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
                            className="rux-form-field--large col-md-11 will-colors"
                            rows="10"
                            id="desc_text"
                            placeholder="Tasker Description"
                            onChange={props.onInputChange} 
                        ></textarea>
                    </div>

                    <div className="row pb-3 pl-5">
                        <div className=""></div>
                        <input className="will-colors rux-button col-md-5" type="submit" value="Send Tasker with Extreme Prejudice"/>
                    </div>

                </form>

                <div className="col-md-4 container-fluid">
                    <form id="attachments_form" onSubmit={props.onClickUploadFiles}> 
                        <div className="row mb-2 pr-5" style={{marginTop:"-10px"}}>
                            <label >Add Attachments: </label>
                        </div>
                        <div className="form-group files mt-0 mr-3">
                            <div style={{paddingBottom:'20px'}}></div>
                            <label className="row mb-5" htmlFor="file" id="fileInput" style={{marginTop:"-15px"}}>
                                <div></div>
                                <input style={{height:"403px", borderRadius:'3px'}} type="file" id="file" onChange={props.onFileInputChange} className="form-control will-colors" multiple/>
                            </label>
                        </div>
                        <div style={{marginTop:'-250px', position:"relative"}}>
                            {file_names_render}
                        </div>
                        <div className="row" style={{paddingTop:'15px'}}>
                                <div className="col-md-2"></div>
                                {/* <button type="submit" className="rux-button col-md-8">Upload</button> */}
                        </div>
                        {/* <div className="row" style={{paddingTop: ""}}>
                            <div className="col-md-4"></div>
                            <div className="col-md-4">
                                {file_names_render}
                            </div>
                        </div> */}
                    </form>
                </div>
            </div>

        </>
    )
}

export default TaskerForm;