import { legacy_createStore, combineReducers, applyMiddleware, } from "redux";
import { racersReducer } from "./racers";
import createSagaMiddleware from "redux-saga";
import { rootWatcher } from "../saga/index";

const sagaMiddleware = createSagaMiddleware()

const rootReducer = combineReducers({
    racersReducer,
})

export const store = legacy_createStore(rootReducer, applyMiddleware(sagaMiddleware))

sagaMiddleware.run(rootWatcher)