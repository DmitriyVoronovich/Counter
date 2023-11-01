import React, {ChangeEvent} from 'react';
import {Button} from "../../component/button/Button";
import './settings.css'
import {ControlInfoType, ControlVisibleButtonType, InitialValueType} from "../../App";

type SettingsPropsType = {
    changeMaxValue: (max: string) => void
    changeStartValue: (max: string) => void
    controlInfo: ControlInfoType
    controlVisibleButton: ControlVisibleButtonType
    initialValue: InitialValueType
    initCounter: () => void
}

export const Settings: React.FC<SettingsPropsType> = (props) => {
    const {changeMaxValue, controlInfo:{isError}, changeStartValue, initialValue:{maxValue, startValue}, initCounter, controlVisibleButton:{isInitialValueSet}} = props;

    const changeInputValue = ({currentTarget: {value, id}}: ChangeEvent<HTMLInputElement>) => id === 'maxValue' ? changeMaxValue(value) : changeStartValue(value);

    return (
        <div className={'setting_container'}>
            <div className={'setting'}>
                <div className={'setting_value'}>
                    <h4>Max value:</h4>
                    <input id='maxValue' type={'number'} value={maxValue} onChange={changeInputValue} className={isError ?'setting_value_error' : 'setting_value_input'}/>
                </div>
                <div className={'setting_value'}>
                    <h4>Start value:</h4>
                    <input id='startValue' type={'number'} value={startValue} onChange={changeInputValue} className={isError ?'setting_value_error' : 'setting_value_input'}/>
                </div>
            </div>
            <div className={'setting_button'}>
                <Button name={'set'} callback={initCounter} error={isError} disabled={isInitialValueSet}/>
            </div>
        </div>
    );
};