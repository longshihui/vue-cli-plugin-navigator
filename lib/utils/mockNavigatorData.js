const Mock = require('mockjs');
const createNavigatorData = require('./createNavigatorData');

module.exports = function () {
  const config = Mock.mock({
    'pages|3-20': [{
      name: /[a-zA-Z]{5,10}/
    }]
  });
  
  config.pages.forEach(pageConfig => {
    pageConfig.path = '/' + pageConfig.name
  });
  
  return createNavigatorData(
    config.pages.reduce(function (result, pageConfig) {
      result[pageConfig.name] = './src/' + pageConfig.name;
      return result;
    }, {})
  );
};
