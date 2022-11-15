import { Racer, RacerCircuits, RacerCircuitShortedData } from "../../types";

interface defaultStateInterface {
    racers: Racer[]
    racers_fetching: boolean
    racers_error: string | null

    current_page: number
    loaded_racers_page: number[]

    racer_circuits: RacerCircuits[]
    racer_circuits_fetching: boolean
    racer_circuits_error: string | null

    current_circuits_page: number
    current_circutis_racerId: string | null
}

const defaultState: defaultStateInterface = {
    racers: [],
    racers_fetching: false,
    racers_error: null,

    current_page: 1,
    loaded_racers_page: [],

    racer_circuits: [],
    racer_circuits_fetching: false,
    racer_circuits_error: null,

    current_circuits_page: 1,
    current_circutis_racerId: null,


}

export const RACERS_REQUEST = 'RACERS_REQUEST'
export const RACERS_SUCCESS = 'RACERS_SUCCESS'
export const RACERS_FAILURE = 'RACERS_FAILURE'
const LOADED_RACERS_PAGE = 'LOADED_RACERS_PAGE'

export const RACER_CIRCUITS_REQUEST = 'RACER_CIRCUITS_REQUEST'
export const RACER_CIRCUITS_SUCCESS = 'RACER_CIRCUITS_SUCCESS'
export const RACER_CIRCUITS_FAILURE = 'RACER_CIRCUITS_FAILURE'
const RACER_CIRCUITS_CLEAN = 'RACER_CIRCUITS_CLEAN'


export const racersRequest = (payload: number) => ({ type: RACERS_REQUEST, payload })
export const racersSuccess = (payload: Racer[]) => ({ type: RACERS_SUCCESS, payload })
export const racersFailure = (payload: string) => ({ type: RACERS_FAILURE, payload })

export const loadedRacersPage = (payload: number) => ({ type: LOADED_RACERS_PAGE, payload })

export const racerCircuitsRequest = (payload: { page: number, racerId: string }) => ({ type: RACER_CIRCUITS_REQUEST, payload })
export const racerCircuitsSuccess = (payload: RacerCircuits[]) => ({ type: RACER_CIRCUITS_SUCCESS, payload })
export const racerCircuitsFailure = (payload: string) => ({ type: RACER_CIRCUITS_FAILURE, payload })
export const racerCircuitsClean = () => ({ type: RACER_CIRCUITS_CLEAN })

export const racersReducer = (state = defaultState, action) => {

    switch (action.type) {

        case RACERS_REQUEST: {
            const page = action.payload

            return { ...state, racers_fetching: true, current_page: page, }
        }
        case RACERS_SUCCESS: {

            const racers: Racer[] = action.payload

            return {
                ...state,
                racers: [...state.racers, ...racers,],
                racers_fetching: false,

            }
        }
        case RACERS_FAILURE: {
            const { error } = action.payload
            return { ...state, racers_error: error, racers_fetching: false }
        }


        case LOADED_RACERS_PAGE: {
            const currentPage = action.payload
            return { ...state, loaded_racers_page: [...state.loaded_racers_page, currentPage] }
        }

        case RACER_CIRCUITS_REQUEST: {
            const { page, racerId } = action.payload
            return { ...state, racer_circuits_fetching: true, current_circuits_page: page, current_circutis_racerId: racerId }
        }
        case RACER_CIRCUITS_SUCCESS: {
            const circuits: RacerCircuitShortedData[] = action.payload

            return {
                ...state,
                racer_circuits: [...state.racer_circuits, ...circuits],
                racer_circuits_fetching: false,
            }
        }
        case RACER_CIRCUITS_FAILURE: {
            const { error } = action.payload
            return { ...state, racer_circuits_error: error, racer_circuits_fetching: false }
        }
        case RACER_CIRCUITS_CLEAN: {
            return { ...state, racer_circuits: [] }
        }


        default: return state
    }
}
// type racersReducerType = typeof racersReducer
// export const racersStore = legacy_createStore(racersReducer)

