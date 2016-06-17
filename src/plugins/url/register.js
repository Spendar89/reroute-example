import routes from './routes';

const urlSearchToObj = (search) => {
  const str = search.split('?')[1];
  const obj = str && str
    .split('&')
    .reduce((curr, p) => {
      const [key, val] = p.split('=');

      curr[key] = val;

      return curr;
    });

  return obj || {};
};

export default function register (router) {
  const onUrlChange = (e = {}) => {
    const state = e.state || {},
      payload = state.payload || {},
      { pathname, search } = window.location,
      params = urlSearchToObj(search);

    for (let key in routes) {
      if (pathname === key) {
        router.route({
          key,
          type: 'url',
          payload: {
            ...payload,
            ...params
          }
        });
      };
    };
  };

  // on new route, add to pushState to change url
  router.on('route', ({ type, key, payload }) => {
    // check pathname to prevent triggering twice
    if (type === 'url' && window.location.pathname !== key) {
      window.history.pushState({ payload }, '', key);
    };
  });

  // TODO: remove (for convenience only)
  window.__route = router.route.bind(router);

  // call on page load and when history changes
  window.onload = window.onpopstate = onUrlChange;
};
