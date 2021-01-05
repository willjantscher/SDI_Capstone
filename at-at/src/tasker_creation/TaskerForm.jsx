import React from "react";

// create a variable that holds the whole form
// buttons will update that variable
// return is that variable


class TaskerForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {

        };
    }

    render() {
        return(
            <div>
                {console.log(this.props.units)}
                <div>stuff</div>
            </div>
        )
    }


    // let i = 0;
    // let unitNames = props.units.map((unit) => {
    //     i += 1;
    //     return(
    //         <option
    //             value={unit}
    //             key={i}
    //         >
    //             {unit}
    //         </option>
    //     )
    // })


    // var form = (
    // <form onSubmit={props.onSubmitTasker}>
    //         <div>I am inside of the TaskerForm</div>
    //         <div>

    //             {/* 
    //                 send to individual unit/units 

    //                 send to individual commands
    //                 send to all units in a command
    //             */}
                
    //             <span>Assign Units</span>
    //             <select defaultValue="" key="1">
    //                 <option key="empty" value=""></option>
    //                 {unitNames}
    //             </select>

    //             <button onClick={props.onAddAnotherUnit}>Add Another Unit</button>   
    //             {/* on click function to add another selector */}


    //         </div>





    //         <div>
    //             <span>Tasker Name:</span>
    //             <input></input>
    //         </div>
    //         <div>
    //             <span>Suspense Date</span>
    //             <input
    //                 id="suspense_date"
    //                 type="date"
    //             ></input>
    //         </div>
    //         <div>
    //             <span>Priority</span>
    //             <select defaultValue = "Low">
    //                 <option key="Low" value="Low">Low</option>
    //                 <option key="Medium" value="Medium">Medium</option>
    //                 <option key="High" value="High">High</option>
    //             </select>
    //         </div>
    //         <div>
    //             <span>Expected Workload</span>
    //         </div>
    //         <div>
    //             <textarea placeholder="Tasker Description"></textarea>
    //         </div>

    //         <input type="submit" value="Send Tasker"/>
    //         <input type="submit" value="Send Tasker with Extreme Prejudice"/>
    //     </form>
    // )

    // return(
    //     form
    // )
}

export default TaskerForm;