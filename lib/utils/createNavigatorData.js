// create plugins data by user vue config
module.exports = function createNavigatorData(pagesConfig) {
  let data = Object.keys(pagesConfig).map(entryName => {
    const pageConfig = pagesConfig[entryName];
  
    const defaults = {
      name: entryName,
      title: entryName,
      path: `${entryName}.html`,
      type: '',
      badgeColor: '',
      description: ''
    };
  
    if (typeof pageConfig === 'string') {
      return defaults
    }
  
    if (typeof pageConfig === 'object') {
      return Object.assign(defaults, {
        title: pageConfig.title || entryName,
        path: pageConfig.filename ? '/' + pageConfig.filename : `/${entryName}.html`
      })
    }
  
    return defaults;
  });
  return encodeURIComponent(JSON.stringify(data));
};
