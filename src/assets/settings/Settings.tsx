import React, {ChangeEvent} from 'react';
import {Button} from "../../component/button/Button";
import './settings.css'
import {
    ControlVisibleButtonType,
    ERROR_MESSAGE,
    InitialValueType,
    INSTRUCTIONS_MESSAGE,
    isPlaceholderVisibleType
} from "../../App";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../store/store";
import {changeValueAC} from "../../reducer/controlButtonReducer";
import {settingMaxValueAC, settingStartValueAC} from "../../reducer/initialReducer";
import {placeholderNotVisibleAC, placeholderVisibleAC} from "../../reducer/placeholderReducer";

type SettingsPropsType = {
    initCounter: () => void
}

export const Settings: React.FC<SettingsPropsType> = (props) => {
    const initialValue = useSelector<AppRootStateType, InitialValueType>(state => state.initialValue);
    const controlButton = useSelector<AppRootStateType, ControlVisibleButtonType>(state => state.controlButton);
    const placeholder = useSelector<AppRootStateType, isPlaceholderVisibleType>(state => state.placeholder);
    const dispatch = useDispatch();

    const {initCounter} = props;

    const changeMaxValue = (maxInputValue: string) => {
        const max = parseInt(maxInputValue);

        dispatch(changeValueAC());
        dispatch(settingMaxValueAC(max));

        if (max <= initialValue.startValue || max <= 0) {
            dispatch(placeholderVisibleAC(ERROR_MESSAGE));
        } else {
            dispatch(changeValueAC());
            dispatch(placeholderNotVisibleAC(INSTRUCTIONS_MESSAGE));
        }
    };

    const changeStartValue = (startInputValue: string) => {
        dispatch(changeValueAC());
        const start = parseInt(startInputValue);
        dispatch(settingStartValueAC(start));

        if (start < 0 || start >= initialValue.maxValue) {
            dispatch(placeholderVisibleAC(ERROR_MESSAGE));
        } else {
            dispatch(placeholderNotVisibleAC(INSTRUCTIONS_MESSAGE));
        }
    };

    const changeInputValue = ({
                                  currentTarget: {
                                      value,
                                      id
                                  }
                              }: ChangeEvent<HTMLInputElement>) => id === 'maxValue' ? changeMaxValue(value) : changeStartValue(value);

    return (
        <div className={'setting_container'}>
            <div className={'setting'}>
                <div className={'setting_value'}>
                    <h4>Max value:</h4>
                    <input id='maxValue' type={'number'} value={initialValue.maxValue} onChange={changeInputValue}
                           className={placeholder.isError ? 'setting_value_error' : 'setting_value_input'}/>
                </div>
                <div className={'setting_value'}>
                    <h4>Start value:</h4>
                    <input id='startValue' type={'number'} value={initialValue.startValue} onChange={changeInputValue}
                           className={placeholder.isError ? 'setting_value_error' : 'setting_value_input'}/>
                </div>
            </div>
            <div className={'setting_button'}>
                <Button name={'set'} callback={initCounter} error={placeholder.isError}
                        disabled={controlButton.isInitialValueSet}/>
            </div>
        </div>
    );
};