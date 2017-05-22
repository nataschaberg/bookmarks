import constants from "../constants"


var initalState = {
    list: [],
    selected: null
}


export default (state = initalState, action) => {
    let updated = Object.assign({}, state)

    switch (action.type) {

        case constants.PROFILES_RECEIVED:
            // console.log("PROFILES_RECEIVED", JSON.stringify(action.profiles))
            updated["list"] = action.profiles
            //here we set the first to selcted
            if(action.profiles.length > 0) {
                updated["selected"] = action.profiles[0]
            }
            return updated

        case constants.PROFILE_CREATED:
            // console.log("PROFILES_RECEIVED", JSON.stringify(action.profile))
            let updatedList = Object.assign([], updated.list)
            updatedList.push(action.profile)
            updated["list"] = updatedList
            return updated

        case constants.PROFILE_SELECTED:
            // console.log("PROFILE_SELECTED: ", JSON.stringify(action.profile))
            updated["selected"] = action.profile
            return updated


        default:
            return state
    }


}
