import AppState from "./types/app"

const initialState: AppState = {

}

export default (state = initialState, action: any): AppState => {
    switch(action.type) {

        default: return state;
    }
}