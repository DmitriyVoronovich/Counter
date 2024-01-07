import {InitialValueType} from "../App";


type InitialReducerType = InitStartValueACType
    | SettingMaxValueACType
    | SettingStartValueACType

const initialState: InitialValueType = {
    maxValue: 1,
    startValue: 0

}
export const initialReducer = (state: InitialValueType = initialState,
                               action: InitialReducerType): InitialValueType => {
    switch (action.type) {
        case "INIT-START-VALUE": {
            return {
                maxValue: action.payload.maxValue,
                startValue: action.payload.startValue
            }
        }
        case "SETTING-MAX-VALUE": {
            return {...state, maxValue: action.payload.maxValue}
        }
        case "SETTING-START-VALUE": {
            return {...state, startValue: action.payload.startValue}
        }
        default:
            return state;
    }
};


type InitStartValueACType = ReturnType<typeof initStartValueAC>;
export const initStartValueAC = (maxValue: number, startValue: number) => {
    return {
        type: 'INIT-START-VALUE',
        payload: {
            maxValue,
            startValue
        }
    } as const
};


type SettingMaxValueACType = ReturnType<typeof settingMaxValueAC>
export const settingMaxValueAC = (maxValue: number) => {
    return {
        type: 'SETTING-MAX-VALUE',
        payload: {
            maxValue
        }
    } as const
};

type SettingStartValueACType = ReturnType<typeof settingStartValueAC>
export const settingStartValueAC = (startValue: number) => {
    return {
        type: 'SETTING-START-VALUE',
        payload: {
            startValue
        }
    } as const
};