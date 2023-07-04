import React from 'react';
import ResizeComponent from "./resize.component";

function CropperContainer(props) {
    return (
        <ResizeComponent src={props.src}/>
    );
}

export default CropperContainer;



