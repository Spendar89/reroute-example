import routes from './routes';

export default function register (router) {
  const onUrlChange = (e={}) => {
    const state = e.state || {};
    const payload = state.payload || {};
    const { pathname, search } = window.location;
    const paramsString = search.split('?')[1];
    const params = paramsString && paramsString
      .split('&')
      .reduce((curr, p) => {
        const [key, val] = p.split('=');

        curr[key] = val;

        return curr;
      }, {}) || {};

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
