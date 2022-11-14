import { Racer } from "../../types";

interface defaultStateInterface {
    racers: Racer[]
    racers_fetching: boolean
    racers_error: string | null

    current_page: number
    loaded_page:number[]
}

const defaultState: defaultStateInterface = {
    racers: [],
    racers_fetching: false,
    racers_error: null,

    current_page: 1,
    loaded_page:[]
}

export const RACERS_REQUEST = 'RACERS_REQUEST'
export const RACERS_SUCCESS = 'RACERS_SUCCESS'
export const RACERS_FAILURE = 'RACERS_FAILURE'

export const racersRequest = (payload: number) => ({ type: RACERS_REQUEST, payload })
export const racersSuccess = (payload: Racer[]) => ({ type: RACERS_SUCCESS, payload })
export const racersFailure = (payload: string) => ({ type: RACERS_FAILURE, payload })

export const racersReducer = (state = defaultState, action) => {

    switch (action.type) {

        case RACERS_REQUEST: {
            const page = action.payload
            // alert(page)
            return { ...state, racers_fetching: true, current_page: page, }
        }
        case RACERS_SUCCESS: {

            const racers = action.payload
            return {
                ...state,
                racers: [...state.racers, ...racers,],
                // racers,
                racers_fetching: false,
                // loaded_page:
            }
        }
        case RACERS_FAILURE: {
            const { error } = action.payload
            return { ...state, racers_error: error, racers_fetching: false }
        }

        default: return state
    }
}
// type racersReducerType = typeof racersReducer
// export const racersStore = legacy_createStore(racersReducer)

