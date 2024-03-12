import React from 'react';
import './button.css'

type ButtonPropsType = {
    name: string
    callback: () => void
    disabled?: boolean
    error: boolean
    block?: boolean
};

export const Button: React.FC<ButtonPropsType> = (props) => {
    const {name, callback, disabled, error, block} = props;

    return (
        <button onClick={callback} className={'button'} disabled={error || disabled || block}>
            {name}
        </button>
    );
};