import {ControlVisibleButtonType} from "../App";


type ControlButtonReducerType = ControlButtonMaxValueACType
    | ResetButtonMaxValueACType
    | ChangeValueACType
    | InitCounterValueACType

const initialState = {
    isResultMax: false,
    isInitialValueSet: false
}
export const controlButtonReducer = (state: ControlVisibleButtonType = initialState, action: ControlButtonReducerType): ControlVisibleButtonType => {
    switch (action.type) {
        case "CONTROL-BUTTON-MAX-VALUE": {
            return {...state, isResultMax: true}
        }
        case "RESET-BUTTON-MAX-VALUE": {
            return {...state, isResultMax: false}
        }
        case "CHANGE-VALUE": {
            return {isResultMax: false, isInitialValueSet: false}
        }
        case "INIT-COUNTER-VALUE": {
            return {isInitialValueSet: true, isResultMax: false}
        }
        default:
            return state;
    }
};

type ControlButtonMaxValueACType = ReturnType<typeof controlButtonMaxValueAC>
export const controlButtonMaxValueAC = () => {
    return {
        type: 'CONTROL-BUTTON-MAX-VALUE'
    } as const
};

type ResetButtonMaxValueACType = ReturnType<typeof resetButtonMaxValueAC>
export const resetButtonMaxValueAC = () => {
    return {
        type: 'RESET-BUTTON-MAX-VALUE'
    } as const
};

type ChangeValueACType = ReturnType<typeof changeValueAC>
export const changeValueAC = () => {
    return {
        type: 'CHANGE-VALUE'
    } as const
};

type InitCounterValueACType = ReturnType<typeof InitCounterValueAC>
export const InitCounterValueAC = () => {
    return {
        type: 'INIT-COUNTER-VALUE'
    } as const
};
