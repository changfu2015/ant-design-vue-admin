import { check } from '@/utils/auth';
function install(Vue, options = {}) {
  // options.name 接口传入名称
  Vue.directive(options.name || 'auth', {
    inserted: function(el, binding) {
      if (!check(binding.value)) {
        el.parentNode && el.parentNode.removeChild(el);
      }
    }
  });
}

export default { install };
