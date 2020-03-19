import axios from 'axios';
import { notification } from 'ant-design-vue';
function request(option) {
  return axios(option)
    .then(res => {
      return res;
    })
    .catch(error => {
      const {
        response: { status, statusText }
      } = error;

      // error = {
      //   response：{
      //     status：400，
      //     statusText:"解构"
      //   }解构对下中元素
      // }
      notification.error({
        // 去除下一行eslint验证
        //eslint-disable-next-line no-unused-vars
        message: h => (
          <div>
            请求错误<span style="color:red">{status}</span>:{option.url}
          </div>
        ),
        description: statusText
      });
      return Promise.reject(error);
    });
}
export default request;
