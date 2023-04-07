const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false,
  devServer:{
    port:9020,
    open:true,
    client:{
      overlay:{
        warnings:false,
        errors:true,
      }
    },
    proxy:{
      '/api':{
        target:'https://example.com/data',
        changeOrigin:true,
        pathRewrite:{
          '^/api':'/'
        }
      }
    }
  }
});
