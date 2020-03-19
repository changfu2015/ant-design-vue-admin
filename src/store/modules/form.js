import router from '@/router/index';
import request from '@/utils/request';

const state = {
  step: {
    payAccount: '123456'
  }
};

const actions = {
  async submitStepForm({ commit }, { payload }) {
    await request({
      url: '/api/form',
      method: 'POST',
      data: payload
    });
    commit('saveStepFormData', payload);
    router.push({ path: '/form/step-form/result' });
  }
};

const mutations = {
  saveStepFormData(state, { payload }) {
    console.info('保存步骤');
    console.info(payload);
    state.step = {
      ...state.step,
      ...payload
    };
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations
};
