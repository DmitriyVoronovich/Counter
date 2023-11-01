import React from 'react';
import {Button} from "../../component/button/Button";
import './counter.css'
import {ControlInfoType, ControlVisibleButtonType} from "../../App";
import {isVisible} from "@testing-library/user-event/dist/utils";

type CounterPropsType = {
    resultValue: number
    counterIncrement: () => void
    controlInfo: ControlInfoType
    resetCounter: () => void
    controlVisibleButton: ControlVisibleButtonType
}

export const Counter: React.FC<CounterPropsType> = (props) => {
    const {resultValue, counterIncrement, controlInfo:{isVisible, isError, message}, resetCounter, controlVisibleButton:{isInitialValueSet, isResultMax}} = props;

    return (
        <div className={'counter_container'}>
            <div className={'counter'}>
                <span className={isError ||  isResultMax ? 'error_count' : 'count'}>
                    {isError || isVisible ? message : resultValue}
                </span>
            </div>
            <div className={'counter_button'}>
                <Button name={'inc'} callback={counterIncrement} error={isError} disabled={isResultMax} block={!isInitialValueSet}/>
                <Button name={'reset'} callback={resetCounter} error={isError} block={!isInitialValueSet}/>
            </div>
        </div>
    );
};