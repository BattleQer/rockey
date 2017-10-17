const store = {
    login: {
        state: {
            count: 0
        },
        mutations: {
            test (state,test) {
                console.log('mutations');
                state.count++
            }
        },
        actions: {
            test ({commit}, text) {
                console.log('actions');
                setTimeout(function(){
                    commit('test','123');
                },1000)
            }
        }
    }
};
export default {
    modules: store
}
