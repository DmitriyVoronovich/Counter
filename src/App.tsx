import React, {useEffect, useState} from 'react';
import './App.css';
import {Settings} from "./assets/settings/Settings";
import {Counter} from "./assets/counter/Counter";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store/store";
import {initStartValueAC} from "./reducer/initialReducer";
import {
    controlButtonMaxValueAC,
    InitCounterValueAC,
    resetButtonMaxValueAC
} from "./reducer/controlButtonReducer";
import {
    initPlaceholderAC,
    resetPlaceholderAC
} from "./reducer/placeholderReducer";

export const INSTRUCTIONS_MESSAGE = 'Enter values and press \'set\'';
export const ERROR_MESSAGE = 'Incorrect value!';

export type InitialValueType = {
    maxValue: number,
    startValue: number
};

export type isPlaceholderVisibleType = {
    isError: boolean
    message: string
    isVisible: boolean
};

export type ControlVisibleButtonType = {
    isResultMax: boolean
    isInitialValueSet: boolean
};

function App() {

    const initialValue = useSelector<AppRootStateType, InitialValueType>(state => state.initialValue);
    const dispatch = useDispatch();

    const [resultValue, setResultValue] = useState(0);

    useEffect(() => {
        const max =  localStorage.getItem('max');
        const start = localStorage.getItem('start');
        if (max && start) {
            const maxLocalValue = JSON.parse(max);
            const startLocalValue = JSON.parse(start);
            dispatch(initStartValueAC(maxLocalValue, startLocalValue));
            setResultValue(initialValue.startValue);
        }
    }, []);

    const counterIncrement = () => {
        setResultValue(resultValue + 1);
        if (resultValue === initialValue.maxValue - 1 ) {
            dispatch(controlButtonMaxValueAC());
        }
    };

    const resetCounter = () => {
        dispatch(resetButtonMaxValueAC());
        setResultValue(initialValue.startValue);
        dispatch(resetPlaceholderAC());
    };

    const initCounter = () => {
        dispatch(InitCounterValueAC());
        setResultValue(initialValue.startValue);
        dispatch(initPlaceholderAC());
        localStorage.setItem('max', JSON.stringify(initialValue.maxValue));
        localStorage.setItem('start', JSON.stringify(initialValue.startValue));
    }

    return (
        <div className="App">
            <Settings initCounter={initCounter}/>
            <Counter resultValue={resultValue}
                     counterIncrement={counterIncrement}
                     resetCounter={resetCounter}/>
        </div>
    );
}

export default App;
