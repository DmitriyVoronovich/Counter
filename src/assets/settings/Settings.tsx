import React, {ChangeEvent} from 'react';
import {Button} from "../../component/button/Button";
import './settings.css'

type SettingsPropsType = {
    changeMaxValue: (max: string) => void
    changeStartValue: (max: string) => void
    error: boolean
    settingDisabled: boolean
    startValue: string
    maxValue: string
    initCounter: () => void
}

export const Settings: React.FC<SettingsPropsType> = (props) => {
    const {changeMaxValue, error, changeStartValue, startValue, maxValue, initCounter, settingDisabled} = props;

    const changeMaxValueInput = (e: ChangeEvent<HTMLInputElement>) => {
        changeMaxValue(e.currentTarget.value)
    };

    const changeStartValueInput = (e: ChangeEvent<HTMLInputElement>) => {
        changeStartValue(e.currentTarget.value)
    };

    const settingValue = () => {
        initCounter()
    }

    return (
        <div className={'setting_container'}>
            <div className={'setting'}>
                <div className={'setting_value'}>
                    <h4>Max value:</h4>
                    <input type={'number'} value={maxValue} onChange={changeMaxValueInput} className={'setting_value_input'}/>
                </div>
                <div className={'setting_value'}>
                    <h4>Start value:</h4>
                    <input type={'number'} value={startValue} onChange={changeStartValueInput} className={ +startValue < 0 ?'setting_value_input_error' : 'setting_value_input'}/>
                </div>
            </div>
            <div className={'setting_button'}>
                <Button name={'set'} callback={settingValue} error={error} disabled={settingDisabled}/>
            </div>
        </div>
    );
};