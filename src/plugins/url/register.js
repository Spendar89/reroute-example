import routes from './routes';

export default function register ({ route }, source) {
  for (let key in routes) {
    source(key, ({ params: payload }) => {
      // get current parsed query string object
      //const qs = Util.getQueryString();
      //const payload = { ...params, ...qs };

      route({
        key,
        payload
      });
    });
  };
};
