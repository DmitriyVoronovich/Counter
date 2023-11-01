import React from 'react';
import {Button} from "../../component/button/Button";
import './counter.css'

type CounterPropsType = {
    count: number
    counterIncrement: () => void
    error: boolean
    resetCounter: () => void
    disabled: boolean
    settingDisabled: boolean
}

export const Counter: React.FC<CounterPropsType> = (props) => {
    const {count, counterIncrement, error, resetCounter, disabled, settingDisabled} = props;

    return (
        <div className={'counter_container'}>
            <div className={'counter'}>
                <span className={error ? 'error_count' : 'count'}>
                    {count}
                </span>
            </div>
            <div className={'counter_button'}>
                <Button name={'inc'} callback={counterIncrement} error={error} disabled={disabled} block={!settingDisabled}/>
                <Button name={'reset'} callback={resetCounter} error={error} block={!settingDisabled}/>
            </div>
        </div>
    );
};