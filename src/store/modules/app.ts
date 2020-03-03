/**
 * @author  sparkHou
 * @date 2020-02-29 17:17
 * @Description:
 */
import { MutationTree, ActionTree } from 'vuex'

interface State {
  test: string;
}

const state: State = {
  test: 'vuex-test'
}

const mutations: MutationTree<any> = {
  CHANGE_TEST (state: any, val: any): void {
    state.test = val
  }

}
const actions: ActionTree<State, any> = {
  testChange ({ commit, state: State }, val): void {
    commit('CHANGE_TEST', val)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
