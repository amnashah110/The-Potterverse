import React from "react";

const Spinner = () => {
    return (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
            <img src="https://i.gifer.com/6kX.gif" className="rounded-full" alt="Loading Spinner" style={{width: 190, height: 160}}/>
        </div>
    );
}

export default Spinner;
