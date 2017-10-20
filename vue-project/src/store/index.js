import storeZ from './store-z'
import storeG from './store-g'
const store = {
    login: {
        namespaced: true,
        state: {
            count: 0,
            // list: []
        },
        mutations: {
            test (state,test) {
                console.log('mutations');
                state.count++;
                
                state.list.push(test)
            },
            // fn (state,test) {
            //     state.list.push(test)
            // }
        },
        actions: {
            // init({commit}, text) {
            //     debugger
            //     commit('fn',text);
            // },
            test ({commit}, text) {
                console.log('actions');
                setTimeout(function(){
                    commit('test',text);
                },1000)
            }
        }
    }
};
export default {
    modules: Object.assign(storeG, storeZ, store)
}
