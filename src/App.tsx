import React, {useEffect, useState} from 'react';
import './App.css';
import {Settings} from "./assets/settings/Settings";
import {Counter} from "./assets/counter/Counter";

const instructionsMessage = 'Enter values and press \'set\'';
const errorMessage = 'Incorrect value!'

export type InitialValueType = {
    maxValue: number,
    startValue: number
}

function App() {
    const [initialValue, setInitialValue] = useState<InitialValueType>({
        maxValue: 1,
        startValue: 0
    });
    const [resultValue, setResultValue] = useState(0);
    const [error, setError] = useState(false);//{ isError: false, message: 'Enter values and press 'set'', isVisible: false } - controlInfo
    const [disabled, setDisabled] = useState(false);//create controlVisibleButton
    const [settingDisabled, setSettingDisabled] = useState(false);
    useEffect(() => {
        const max =  localStorage.getItem('max');
        const start = localStorage.getItem('start');
        if (max && start) {
            let maxLocalValue = JSON.parse(max);
            let startLocalValue = JSON.parse(start);
            setInitialValue({maxValue: maxLocalValue, startValue: startLocalValue})
            setResultValue(initialValue.startValue)
        }
    }, [])

    const counterIncrement = () => {
        setResultValue(resultValue + 1)
        if (resultValue === initialValue.maxValue - 1 ) {
            setDisabled(true)
        }
    };

    const changeError = (errorValue: boolean) => {
        setError(errorValue)
    }

    const resetCounter = () => {
        setDisabled(false)
        setResultValue(initialValue.startValue);
        setError(false);
    };

    const changeMaxValue = ( maxInputValue: string) => {
        setSettingDisabled(false);
        const max = parseInt(maxInputValue);
        setInitialValue({...initialValue, maxValue: max});
        if (max <= initialValue.startValue || max <= 0) {
            // setResultValue('Incorrect value!')
            changeError(true);
        } else {
            // setResultValue('Enter values and press \'set\'')
            changeError(false);
        }
    };

    const changeStartValue = ( startInputValue: string) => {
        setSettingDisabled(false);
        const start = parseInt(startInputValue);
        setInitialValue({...initialValue, startValue: start});

        if (start < 0 || start >= initialValue.maxValue) {
            // setResultValue('Incorrect value!')
            changeError(true);
        } else {
            // setResultValue('Enter values and press \'set\'')
            changeError(false);
        }
    };

    const initCounter = () => {
        setSettingDisabled(true)
        setResultValue(initialValue.startValue)
        setDisabled(false)
        localStorage.setItem('max', JSON.stringify(initialValue.maxValue))
        localStorage.setItem('start', JSON.stringify(initialValue.startValue))
    }

    return (
        <div className="App">
            <Settings changeMaxValue={changeMaxValue}
                      initialValue={initialValue}
                      error={error}
                      settingDisabled={settingDisabled}
                      changeStartValue={changeStartValue}
                      initCounter={initCounter}/>
            <Counter count={resultValue}
                     counterIncrement={counterIncrement}
                     error={error}
                     disabled={disabled}
                     settingDisabled={settingDisabled}
                     resetCounter={resetCounter}/>
        </div>
    );
}

export default App;
