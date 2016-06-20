import routes from './routes';

export default function register (router) {
  // util fn that converts url search
  // string to js object
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

  const byPath = (key, payload={}) => ({
    key,
    payload,
    type:'url'
  });

  const onUrlChange = () => {
    //const state = e.state || {};
    // state.payload comes from
    // corresponding url event
    //payload = state.payload || {},
    const { location } = window;
    const { pathname, search } = location;
    //const params = urlSearchToObj(search);
    router.route(byPath(pathname, { location }));
  };

  // TODO: add payload to url search params
  // on new route, add to pushState to change url
  router.on('route', ({ type, key, payload }) => {
    // if pathname matches key then the url event
    // was already triggered via onUrlChange, so
    // do nothing
    if (type === 'url' && window.location.pathname !== key) {
      window.history.pushState({ payload }, '', key);
    };
  });

  // TODO: remove (for convenience only)
  window.__route = router.route.bind(router);

  // call on page load and when history changes
  window.onload = window.onpopstate = onUrlChange;
};
