const path = require('path');
module.exports = {
  css: {
    loaderOptions: {
      less: {
        // 主题定制
        // modifyVars: {
        //   'primary-color': '#1DA57A',
        //   'link-color': '#1DA57A',
        //   'border-radius-base': '2px',
        // },
        javascriptEnabled: true
        // 这里的选项会传递给 css-loader
      }
    }
  },
  // chainWebpack: config => {
  //   const svgRule = config.module.rule('svg');
  //   // <!-- svg 多种解决方案 -->
  //   // 1、默认vue-cli 中有svg的loader 直接把svg 转成url可以直接和img 一样用

  //   // 如果需要使用svg对象需要删除默认loader 重新配置vue-svg-loader

  //   // chainWebpack:config=>{}
  //   // clear all existing loaders.
  //   // if you don't do this, the loader below will be appended to
  //   // existing loaders of the rule.
  //   svgRule.uses.clear();
  //   // add replacement loader(s)
  //   svgRule.use('vue-svg-loader').loader('vue-svg-loader');
  // },
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.join(__dirname, 'src'),
        assets: '@/assets',
        components: '@/components',
        views: '@/views'
      }
    }
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        bypass: function(req, res) {
          if (req.headers.accept.indexOf('html') !== -1) {
            console.log('Skipping proxy for browser request.');
            return '/index.html';
          } else if (process.env.MOCK != 'none') {
            const name = req.path
              .split('/api/')[1]
              .split('/')
              .join('_');
            const mock = require(`./mock/${name}`);
            const result = mock(req.method); //会有缓存
            delete require.cache[require.resolve(`./mock/${name}`)]; //清楚缓存
            return res.send(result);
          }
        }
      }
    }
  }
};
