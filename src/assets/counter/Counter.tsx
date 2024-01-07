import React from 'react';
import {Button} from "../../component/button/Button";
import './counter.css'
import {ControlVisibleButtonType, isPlaceholderVisibleType} from "../../App";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../store/store";

type CounterPropsType = {
    resultValue: number
    counterIncrement: () => void
    resetCounter: () => void
}

export const Counter: React.FC<CounterPropsType> = (props) => {
    const placeholder = useSelector<AppRootStateType, isPlaceholderVisibleType>(state => state.placeholder);
    const controlButton = useSelector<AppRootStateType, ControlVisibleButtonType>(state => state.controlButton);
    const {isInitialValueSet, isResultMax} = controlButton;
    const {isVisible, isError, message} = placeholder;
    const {resultValue, counterIncrement, resetCounter} = props;

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