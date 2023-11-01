import React, {ChangeEvent} from 'react';
import {Button} from "../../component/button/Button";
import './settings.css'
import {InitialValueType} from "../../App";

type SettingsPropsType = {
    changeMaxValue: (max: string) => void
    changeStartValue: (max: string) => void
    error: boolean
    settingDisabled: boolean
    initialValue: InitialValueType
    initCounter: () => void
}

export const Settings: React.FC<SettingsPropsType> = (props) => {
    const {changeMaxValue, error, changeStartValue, initialValue, initCounter, settingDisabled} = props;

    const changeInputValue = ({currentTarget: {value, id}}: ChangeEvent<HTMLInputElement>) => id === 'maxValue' ? changeMaxValue(value) : changeStartValue(value)

    return (
        <div className={'setting_container'}>
            <div className={'setting'}>
                <div className={'setting_value'}>
                    <h4>Max value:</h4>
                    <input id='maxValue' type={'number'} value={initialValue.maxValue} onChange={changeInputValue} className={error ?'setting_value_input_error' : 'setting_value_input'}/>
                </div>
                <div className={'setting_value'}>
                    <h4>Start value:</h4>
                    <input id='startValue' type={'number'} value={initialValue.startValue} onChange={changeInputValue} className={ error ?'setting_value_input_error' : 'setting_value_input'}/>
                </div>
            </div>
            <div className={'setting_button'}>
                <Button name={'set'} callback={initCounter} error={error} disabled={settingDisabled}/>
            </div>
        </div>
    );
};