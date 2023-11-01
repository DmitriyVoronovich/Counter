import React, {useEffect, useState} from 'react';
import './App.css';
import {Settings} from "./assets/settings/Settings";
import {Counter} from "./assets/counter/Counter";

const instructionsMessage = 'Enter values and press \'set\'';
const errorMessage = 'Incorrect value!';

export type InitialValueType = {
    maxValue: number,
    startValue: number
};

export type ControlInfoType = {
    isError: boolean
    message: string
    isVisible: boolean
};

export type ControlVisibleButtonType = {
    isResultMax: boolean
    isInitialValueSet: boolean
};

function App() {

    const [initialValue, setInitialValue] = useState<InitialValueType>({
        maxValue: 1,
        startValue: 0
    });
    const [resultValue, setResultValue] = useState(0);
    const [controlInfo, setControlInfo] = useState<ControlInfoType>({
        isError: false,
        message: instructionsMessage,
        isVisible: true
    });
    const [controlVisibleButton, setControlVisibleButton] = useState<ControlVisibleButtonType>({
        isResultMax: false,
        isInitialValueSet: false
    });

    useEffect(() => {
        const max =  localStorage.getItem('max');
        const start = localStorage.getItem('start');
        if (max && start) {
            let maxLocalValue = JSON.parse(max);
            let startLocalValue = JSON.parse(start);
            setInitialValue({maxValue: maxLocalValue, startValue: startLocalValue})
            setResultValue(initialValue.startValue)
        }
    }, []);

    const counterIncrement = () => {
        setResultValue(resultValue + 1);
        if (resultValue === initialValue.maxValue - 1 ) {
            setControlVisibleButton({...controlVisibleButton, isResultMax: true})
        }
    };

    const resetCounter = () => {
        setControlVisibleButton({...controlVisibleButton, isResultMax: false});
        setResultValue(initialValue.startValue);
        setControlInfo({...controlInfo, isError: false});
    };

    const changeMaxValue = ( maxInputValue: string) => {
        const max = parseInt(maxInputValue);

        setControlVisibleButton({...controlVisibleButton, isInitialValueSet: false});
        setInitialValue({...initialValue, maxValue: max});

        if (max <= initialValue.startValue || max <= 0) {
            setControlInfo({...controlInfo, isError: true, message: errorMessage});
        } else {
            setControlInfo({isVisible: true, isError: false, message: instructionsMessage});
        }
    };

    const changeStartValue = ( startInputValue: string) => {
        setControlVisibleButton({...controlVisibleButton, isInitialValueSet: false});
        const start = parseInt(startInputValue);
        setInitialValue({...initialValue, startValue: start});

        if (start < 0 || start >= initialValue.maxValue) {
            setControlInfo({...controlInfo, isError: true, message: errorMessage});
        } else {
            setControlInfo({isVisible: true, isError: false, message: instructionsMessage});
        }
    };

    const initCounter = () => {
        setControlVisibleButton({ isInitialValueSet: true, isResultMax: false});
        setResultValue(initialValue.startValue);
        setControlInfo({...controlInfo, isVisible: false});
        localStorage.setItem('max', JSON.stringify(initialValue.maxValue));
        localStorage.setItem('start', JSON.stringify(initialValue.startValue));
    }

    return (
        <div className="App">
            <Settings changeMaxValue={changeMaxValue}
                      initialValue={initialValue}
                      controlInfo={controlInfo}
                      controlVisibleButton={controlVisibleButton}
                      changeStartValue={changeStartValue}
                      initCounter={initCounter}/>
            <Counter resultValue={resultValue}
                     counterIncrement={counterIncrement}
                     controlInfo={controlInfo}
                     controlVisibleButton={controlVisibleButton}
                     resetCounter={resetCounter}/>
        </div>
    );
}

export default App;
