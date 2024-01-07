import { isPlaceholderVisibleType} from "../App";

type PlaceholderReducerType = ResetPlaceholderACType
    | PlaceholderVisibleACType
    | PlaceholderNotVisibleACType
    |InitPlaceholderACType;

const initialState = {
    isError: false,
    message: 'Enter values and press \'set\'',
    isVisible: true
}
export const placeholderReducer = (state: isPlaceholderVisibleType = initialState, action: PlaceholderReducerType):isPlaceholderVisibleType => {
    switch (action.type) {
        case "RESET-PLACEHOLDER": {
            return {...state, isError: false}
        }
        case "PLACEHOLDER-VISIBLE": {
            return {...state, isError: true, message: action.payload.message}
        }
        case "PLACEHOLDER-NOT-VISIBLE": {
            return {isVisible: true, isError: false, message: action.payload.message}
        }
        case "INIT-PLACEHOLDER": {
            return {...state, isVisible: false}
        }
        default:
            return state
    }
};

type ResetPlaceholderACType = ReturnType<typeof resetPlaceholderAC>
export const resetPlaceholderAC = () => {
    return {
        type: 'RESET-PLACEHOLDER',
    } as const
};

type PlaceholderVisibleACType = ReturnType<typeof placeholderVisibleAC>
export const placeholderVisibleAC = (message: string) => {
    return {
        type: 'PLACEHOLDER-VISIBLE',
        payload: {
            message
        }
    } as const
};

type PlaceholderNotVisibleACType = ReturnType<typeof placeholderNotVisibleAC>
export const placeholderNotVisibleAC = (message: string) => {
    return {
        type: 'PLACEHOLDER-NOT-VISIBLE',
        payload: {
            message
        }
    } as const
};

type InitPlaceholderACType = ReturnType<typeof initPlaceholderAC>
export const initPlaceholderAC = () => {
    return {
        type: 'INIT-PLACEHOLDER'
    } as const
};