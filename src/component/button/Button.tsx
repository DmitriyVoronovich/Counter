import React from 'react';
import './button.css';
import {ButtonPropsType} from "../../types/types";

export const Button = ({name, callback, disabled, error, block}: ButtonPropsType) => {

    return (
        <button onClick={callback} className={'button'} disabled={error || disabled || block}>
            {name}
        </button>
    );
};