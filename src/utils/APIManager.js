import superagent from "superagent"

export default {

    get: (endpoint, params, callback) => {

        superagent
        .get(endpoint)
        .query(params)
        .set("Accept", "application/json")
        .end((err, response) => {
            if(err) {
                const mess = err.message || err
                alert(mess)
                callback(err, null)
            }
            const confirmation = response.body.confirmation
            if(confirmation == "success") {
                callback(null, response.body)
            } else {
                callback({message: response.body.message }, null)
            }
        })
    },

    post: (endpoint, params, callback) => {

        superagent
        .post(endpoint)
        .send(params)
        .set("Accept", "application/json")
        .end((err, response) => {
            if(err) {
                const mess = err.message || err
                alert(mess)
                callback(err, null)
            }
            const confirmation = response.body.confirmation
            if(confirmation == "success") {
                callback(null, response.body)
            } else {
                callback({message: response.body.message }, null)
            }
        })
    }
}
