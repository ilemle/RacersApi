 import {all} from 'redux-saga/effects'
import { racersWatcher } from './racers'
  
 export function* rootWatcher(){
    yield all([racersWatcher()])
 }  