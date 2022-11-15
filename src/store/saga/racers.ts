import { call, put, select, takeEvery } from 'redux-saga/effects'
import { getRacerCircuits, getRacers } from '../../api/api';
import { RacerCircuits, RacerCircuitShortedData } from '../../types';
import { racerCircuitsFailure, racerCircuitsSuccess, racersFailure, racersSuccess, RACERS_REQUEST, RACER_CIRCUITS_REQUEST } from '../redux/racers'
import { getRacersCircutsNumberPage, getRacersNumberPage } from './selectors';

// const testrequset = () => fetch('http://ergast.com/api/f1/drivers')


function* racersRequestSaga() {
    try {
        const selectedPage = yield select(getRacersNumberPage)
        console.log('selectedPage RACER TABLE: ', selectedPage)
        const data = yield call(() => getRacers(selectedPage))

        console.log('racersRequestSaga RESPONSE: ', data);

        if (!data.error) {
            console.log('racersRequestSaga RESPONSE', data);
            yield put(racersSuccess(data.MRData.DriverTable.Drivers))
        } else {
            alert(data.error)
            yield put(racersFailure(data.error))
        }

    } catch (err) {
        console.log(`racersRequestSaga ERROR: ` + err);
    }

}

function* racersCircuitsRequestSaga() {
    try {
        const { selectedPage, driverId } = yield select(getRacersCircutsNumberPage)

        const data = yield call(() => getRacerCircuits(selectedPage, driverId))

        console.log('racerCircutsRequestSaga RESPONSE: ', data.MRData.CircuitTable.Circuits);

        if (!data.error) {
            const _data = data.MRData.CircuitTable.Circuits.map((el: RacerCircuits, inx: number) => {
                const tData: RacerCircuitShortedData = {
                    circuitName: el.circuitName,
                    locality: el.Location.locality,
                    country: el.Location.country,
                    url: el.url,
                }
                return tData;
            })
            yield put(racerCircuitsSuccess(_data))
        } else {
            alert(data.error)
            yield put(racerCircuitsFailure(data.error))
        }

    } catch (err) {
        console.log(`racerCircuitssRequestSaga ERROR: ` + err);
    }
}

export function* racersWatcher() {
    yield takeEvery(RACERS_REQUEST, racersRequestSaga),
        yield takeEvery(RACER_CIRCUITS_REQUEST, racersCircuitsRequestSaga)
}