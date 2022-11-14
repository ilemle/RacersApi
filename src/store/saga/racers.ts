import { call, put, select, takeEvery } from 'redux-saga/effects'
import { getRacers } from '../../api/api';
import { racersFailure, racersSuccess, RACERS_REQUEST } from '../redux/racers'
import { getNumberPage } from './selectors';

// const testrequset = () => fetch('http://ergast.com/api/f1/drivers')


function* racersRequestSaga() {
    try {
        const selectedPage = yield select((state) => state.racersReducer.current_page)
        console.log('selectedPage: ', selectedPage)
        const data = yield call(() => getRacers(selectedPage))

        console.log('response!!!! ', data);

        if (!data.error) {
            yield put(racersSuccess(data.MRData.DriverTable.Drivers))
        } else {
            alert(data.error)
            yield put(racersFailure(data.error))
        }

    } catch (err) {
        console.log(`racersRequestSaga` + err);
    }

}

export function* racersWatcher() {
    yield takeEvery(RACERS_REQUEST, racersRequestSaga)
}