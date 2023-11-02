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

    const [initialValue, setInitialValue] = useState<InitialValueType>({
        maxValue: 1,
        startValue: 0
    });
    const [resultValue, setResultValue] = useState(0);
    const [isPlaceholderVisible, setIsPlaceholderVisible] = useState<isPlaceholderVisibleType>({
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
            const maxLocalValue = JSON.parse(max);
            const startLocalValue = JSON.parse(start);
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
        setIsPlaceholderVisible({...isPlaceholderVisible, isError: false});
    };

    const changeMaxValue = ( maxInputValue: string) => {
        const max = parseInt(maxInputValue);

        setControlVisibleButton({isResultMax: false, isInitialValueSet: false});
        setInitialValue({...initialValue, maxValue: max});

        if (max <= initialValue.startValue || max <= 0) {
            setIsPlaceholderVisible({...isPlaceholderVisible, isError: true, message: errorMessage});
        } else {
            setIsPlaceholderVisible({isVisible: true, isError: false, message: instructionsMessage});
        }
    };

    const changeStartValue = ( startInputValue: string) => {
        setControlVisibleButton({isResultMax: false, isInitialValueSet: false});
        const start = parseInt(startInputValue);
        setInitialValue({...initialValue, startValue: start});

        if (start < 0 || start >= initialValue.maxValue) {
            setIsPlaceholderVisible({...isPlaceholderVisible, isError: true, message: errorMessage});
        } else {
            setIsPlaceholderVisible({isVisible: true, isError: false, message: instructionsMessage});
        }
    };

    const initCounter = () => {
        setControlVisibleButton({ isInitialValueSet: true, isResultMax: false});
        setResultValue(initialValue.startValue);
        setIsPlaceholderVisible({...isPlaceholderVisible, isVisible: false});
        localStorage.setItem('max', JSON.stringify(initialValue.maxValue));
        localStorage.setItem('start', JSON.stringify(initialValue.startValue));
    }

    return (
        <div className="App">
            <Settings changeMaxValue={changeMaxValue}
                      initialValue={initialValue}
                      isPlaceholderVisible={isPlaceholderVisible}
                      controlVisibleButton={controlVisibleButton}
                      changeStartValue={changeStartValue}
                      initCounter={initCounter}/>
            <Counter resultValue={resultValue}
                     counterIncrement={counterIncrement}
                     isPlaceholderVisible={isPlaceholderVisible}
                     controlVisibleButton={controlVisibleButton}
                     resetCounter={resetCounter}/>
        </div>
    );
}

export default App;
