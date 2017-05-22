import constants from "../constants"



export default {

    currentUserReceived: (profile) => {
        return {
            type: constants.CURRENT_USER_RECEIVED,
            profile: profile
        }
    },


    profilesReceived: (profiles) => {
        return {
            type: constants.PROFILES_RECEIVED,
            profiles: profiles
        }
    },

    profileCreated: (profile) => {
        return {
            type: constants.PROFILE_CREATED,
            profile: profile
        }
    },

    bookmarkCreated: (bookmark) => {
        return {
            type: constants.BOOKMARK_CREATED,
            bookmark: bookmark
        }
    },

    bookmarksReceived: (bookmarks, params) => {
        return {
            type: constants.BOOKMARKS_RECEIVED,
            bookmarks: bookmarks,
            params: params
        }
    },

    profileSelected: (profile) => {
        return {
            type: constants.PROFILE_SELECTED,
            profile: profile
        }
    }
}
