const store = {
    data: {
    	namespaced: true,
        state: {
            list: []
        },
        mutations: {
            fn (state,test) {
                state.list = test
            }
        },
        actions: {
            init({commit}, text) {
                commit('fn',text);
            }
        }
    }
};
export default store