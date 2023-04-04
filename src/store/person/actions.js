import axios from "axios"

export   function FETCH_PERSON({commit}) {
      axios.get('http://94.158.54.194:9092/api/product')
    .then((res) => {
        commit('SET_PERSONS', res.data)
    })
}
export   function DELETE_PERSON({commit}, payload) {   
     axios.delete(`http://94.158.54.194:9092/api/product/${payload}`)
    .then((res) => {
        commit('REMOVE_PERSONS', res.data)
    }).catch(error => {
        console.log('ERROR');
        throw error;
    });
}
export   function ADD_TO_COLLECT({commit}, payload) {
     axios.post(`http://94.158.54.194:9092/api/product`, payload).then(res => {
        commit('ADD_TO_PERSON', res.data)
    })
}
export  function UPDATE_TO_COLLECT({commit}, payload) {
     axios.put(`http://94.158.54.194:9092/api/product`, payload)
    .then(resp => {
        commit('UPDATE_DATE', resp.data)
    })
}