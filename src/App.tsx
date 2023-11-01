import React, {useEffect, useState} from 'react';
import './App.css';
import {Settings} from "./assets/settings/Settings";
import {Counter} from "./assets/counter/Counter";

function App() {
    const [maxValue, setMaxValue] = useState('5');
    const [startValue, setStartValue] = useState('0');
    const [count, setCount] = useState('Enter values and press \'set\'');
    const [error, setError] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [settingDisabled, setSettingDisabled] = useState(false);

    useEffect(() => {
        let max = localStorage.getItem('max')
        let start = localStorage.getItem('start')
        if (max && start) {
            setMaxValue(max)
            setStartValue(start)
            setCount(start)
        }
    }, [])

    const counterIncrement = () => {
        if (+count === +maxValue - 1) {
            setDisabled(true)
            return setCount(`${+count +1}`)
        } else {
            return setCount(`${+count +1}`)
        }
    };

    const changeError = (errorValue: boolean) => {
        setError(errorValue)
    }

    const resetCounter = () => {
        setDisabled(false)
        setCount(startValue);
        setError(false);
    };

    const changeMaxValue = ( max: string) => {
        setSettingDisabled(false)
        if (max <= startValue || +max <= 0) {
            setCount('Incorrect value!')
            changeError(true);
            setMaxValue(max)
        } else {
            setCount('Enter values and press \'set\'')
            changeError(false);
            setMaxValue(max)
        }
    };

    const changeStartValue = ( start: string) => {
        setSettingDisabled(false)
        if (+start < 0 || start >= maxValue) {
            setCount('Incorrect value!')
            changeError(true);
            setStartValue(`${start}`)
        } else {
            setCount('Enter values and press \'set\'')
            changeError(false);
            setStartValue(`${start}`)
        }
    };

    const initCounter = () => {
        setSettingDisabled(true)
        setCount(startValue)
        setDisabled(false)
        localStorage.setItem('max', maxValue)
        localStorage.setItem('start', startValue)
    }

    return (
        <div className="App">
            <Settings changeMaxValue={changeMaxValue}
                      startValue={startValue}
                      maxValue={maxValue}
                      error={error}
                      settingDisabled={settingDisabled}
                      changeStartValue={changeStartValue}
                      initCounter={initCounter}/>
            <Counter count={count}
                     counterIncrement={counterIncrement}
                     error={error}
                     disabled={disabled}
                     settingDisabled={settingDisabled}
                     resetCounter={resetCounter}/>
        </div>
    );
}

export default App;
