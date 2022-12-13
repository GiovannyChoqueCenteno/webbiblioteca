import React from 'react'
import FormData from './FormData';
import FormImage from './FormImage';

const RenderStep = (props) => {

    const { step, setstep } = props;

    switch (step) {
        case 0:
            return <FormData setstep={setstep} />
        case 1:
            return <FormImage setstep={setstep} />
        default:
            return <FormData setstep={setstep} />
    }

}

export default RenderStep