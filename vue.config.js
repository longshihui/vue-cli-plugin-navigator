module.exports = {
  devServer: {
    open: true,
  },
  productionSourceMap: false,
  chainWebpack: (config) => {
    if (process.env.NODE_ENV === 'development') {
      config.plugin('html')
        .tap((args) => {
          args[0].templateParameters = {
            __NAVIGATOR_PAGES_CONFIG__: JSON.stringify([
              {
                title: 'page1',
                path: '/page1',
              },
              {
                title: 'page2',
                path: '/page2',
              },
            ]),
          };
          console.log(args);
          return args;
        });
    }
  },
};
