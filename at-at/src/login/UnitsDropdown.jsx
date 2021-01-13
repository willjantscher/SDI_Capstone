import React, { useState } from "react";

const UnitsDropdown = (props) => {

    let topChain = props.units.filter(element => element.parent_unique_id === null)
    let midChain = props.units.filter(element => element.parent_unique_id === 1)
    let botChain = props.units.filter(element => element.parent_unique_id > 1 )

    let selectValues = [];
    for(const unit in topChain) {
        selectValues.push(
            <optgroup label={topChain[unit].unit_name} key="topOptionGroup"></optgroup>
        )
        selectValues.push(
            <option
                value={topChain[unit].unit_name}
                id={topChain[unit].id}
                key={topChain[unit].id}
            >&nbsp;&nbsp;&nbsp;{topChain[unit].unit_name}</option>
        )        
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
                    >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{midChain[unit].unit_name}</option>
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
    
    const [inputFields, setInputFields] = useState([
        { unit : '' , unit_id : ''}
    ]);

    const handleInputChange = (event) => {
        setInputFields({ unit: event.target.value, unit_id: event.target.id })
        props.onUnitSelection(event);
    };

    return(
        <>
        <div className="rux-form-field__label container-fluid"></div>
        <div className="row pb-3 pl-5">
            <label htmlFor="unit" className="col-sm-2" >Unit: </label>
            <select 
                className="rux-select col-md-3 will-colors"
                id={inputFields.unit_id}
                name={props.select_name}
                value={inputFields.unit}
                onChange={event => { handleInputChange(event) }}
                >
                <optgroup label="USSF"></optgroup>
                <option key="empty" value=""></option>
                {selectValues}
            </select>
        </div>
        </>
    )
}

export default UnitsDropdown;