import React from 'react'


//will check fields and send 
const  SubmitTaskerChecker = (tasker) => {
    // console.log(tasker)
    let flag = null;

    if(tasker.sendToUnits.length === 0) {
        flag = 'bad_sendToUnits'
    } else if(tasker.tasker_name === null) {
        flag = 'bad_tasker_name'
    } else if (tasker.predicted_workload === null) {
        flag = 'bad_predicted_workload'
    } else if (tasker.desc_text === null) {
        flag = 'bad_desc_text'
    } else (
        flag = 'good'
    )

    return(
        flag
    )



}
export default SubmitTaskerChecker;