import { legacy_createStore, combineReducers, applyMiddleware, } from "redux";
import { racersReducer } from "./racers";
import createSagaMiddleware from "redux-saga";
import { rootWatcher } from "../saga/index";
import { persistReducer, persistStore } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";


const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
}

const rootReducer = combineReducers({
    racersReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)
const sagaMiddleware = createSagaMiddleware()
let store = legacy_createStore(persistedReducer, applyMiddleware(sagaMiddleware));
const persistor = persistStore(store);

export { store, persistor };

sagaMiddleware.run(rootWatcher)

export type RootState = ReturnType<typeof rootReducer>;