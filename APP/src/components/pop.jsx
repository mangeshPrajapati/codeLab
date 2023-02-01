import React from "react";

const pop = (props) => {
    return(
        <>
            <div className="popup-box">
                <div className="box">
                    <span className="close-btn" onClick={props.handleClose}>X</span>
                    {props.content}
                </div>
            </div>
        </>
    )
}
export default pop;