import constants from "../constants"


var initalState = {
    currentUser: null
}


export default (state = initalState, action) => {
    let updated = Object.assign({}, state)

    switch (action.type) {
        case constants.PROFILE_CREATED:
            updated["currentUser"] = action.profile
            // console.log("ACCOUNT REDUCER: ", JSON.stringify(updated))
            return updated

        case constants.CURRENT_USER_RECEIVED:
            updated["currentUser"] = action.profile
            return updated

        default:
            return state
    }

}
