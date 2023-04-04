
export function SET_PERSONS (state, payload) {
    state.personData = payload
}
export function REMOVE_PERSONS(state, res) {
    state.personData.splice(res, 1);
}
export function ADD_TO_PERSON (state, payload) {
    state.personData.push(payload)
}
export function UPDATE_DATE(state, payload) {
    state.personData.push(payload)
}