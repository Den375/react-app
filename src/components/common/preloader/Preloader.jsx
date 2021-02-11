import preloader from "../../../assets/images/126.svg";
import React from "react";

const Preloader = (props) => {
    return <div>
        {props.isFetching
            ? <img src={preloader} alt="preloader"/>
            : null}
    </div>
}

export default Preloader;