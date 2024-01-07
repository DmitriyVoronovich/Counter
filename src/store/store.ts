import {initialReducer} from "../reducer/initialReducer";
import {combineReducers, legacy_createStore} from "redux";
import {controlButtonReducer} from "../reducer/controlButtonReducer";
import {placeholderReducer} from "../reducer/placeholderReducer";

const rootReducer = combineReducers({
    initialValue: initialReducer,
    controlButton: controlButtonReducer,
    placeholder: placeholderReducer
});

export const store = legacy_createStore(rootReducer);

export type AppRootStateType = ReturnType<typeof rootReducer>;