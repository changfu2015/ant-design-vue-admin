<script>
// 函数式子组件，对性能优化笔
import { check } from '@/utils/auth';
export default {
  functional: true,
  props: {
    authority: {
      type: Array, //显示按钮的角色
      required: true
    }
  },
  render(h, context) {
    // console.log(context);
    const { props, scopedSlots } = context;
    return check(props.authority) ? scopedSlots.default() : null;
  }
};
</script>
