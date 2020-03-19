# ant-design

npm install

npm run serve

npm run build

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

作者：changfu
邮箱：changfu_chen@qq.com

<!-- vue-cli技巧 -->

项目配置可通过 vue 命令导出查看
vue inspect >output.js
到处配置的时候提交 会因为 output.js 格式无法提交，删除即可

<!-- css 技巧 -->

vue 引用了第三方组件，需要在组件中局部修改第三方组件的样式，而又不想去除 scoped 属性造成组件之间的样式污染。此时只能通过>>>，穿透 scoped。

有些 Sass 之类的预处理器无法正确解析 >>>。可以使用 /deep/ 操作符( >>> 的别名)

<!-- 主题修改配置 -->

antd-themme-webpack-plugin 在线编译主题插件
使用在线编译无法提取.vue 文件中的 style，需要独立抽离成 less
注意：在线编辑主题是很耗性能的，一般解决方案是预先编译好多个主题，再用户切换的时候重新拉取

注意：不是在线编译主题功能，预编译好的主题也需要把 style 抽离出来
然后引入 ant-design-vue 默认的基础样式
ant-design-vue/lib/style/themes/default.less
使用基础样式的变量

<!-- vue 打包报告生成 -->

npm run build -- --report
一 、可优化 1、包的大小

1、发现组件包 icon 的包全部打包进来 （单独打包需要的 icon，但是比较鸡肋的是，引入的组件用的 icon 全都要单独引入）
2、moment 语言包多中语言都打包进来了 （优化，单独打包需要的语言包）
3、echart 的包也打包了很多 （单独引入需要的包，需要注意核心包一定要引入）
import echarts from 'echarts/lib/echarts'; //echart 核心包
import 'echarts/lib/chart/bar'; //需要的组件
import 'echarts/lib/component/title';//需要的组件

二 、
通过 dllPlugin 对打包速度进行优化
原理（在 webpack 打包过程中,由于第三方插件的引入,在每一次打包的过程中,都会打包这些第三方插件,所以,通过 DllPlugin,来达到,只打包一次,之后,在打包的过程中,运用这个已经打包的文件即可）

<!-- 实现代码示例 -->

row-loader //把组件源码显示出来
vue-highlightjs 对代码高亮 （还需要单独引入样式）
或者直接用.md 需要自己写个 loader

<!-- 单元测试jest -->

<!-- 持续集成 -->

Travis-CI //ci 持续集成工具
codecov //生成单测覆盖率
github.io //生成文档 gitee.io 中文 github

自动过滤 issue
issue-helper
