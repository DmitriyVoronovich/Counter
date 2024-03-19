import React from 'react';
import './button.css';
import {ButtonPropsType} from "../../types/types";

export const Button = (props: ButtonPropsType) => {
    const {name, callback, disabled, error, block} = props;

    return (
        <button onClick={callback} className={'button'} disabled={error || disabled || block}>
            {name}
        </button>
    );
};