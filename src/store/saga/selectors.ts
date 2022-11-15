import { RootState } from "../redux"

export const getRacersNumberPage = (state) => state.racersReducer.current_page
export const getRacersCircutsNumberPage = (state) => {
    return ({
        selectedPage: state.racersReducer.current_circuits_page,
        driverId: state.racersReducer.current_circutis_racerId,
    })
}