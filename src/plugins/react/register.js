import connect from './connect';

export default function register (router) {
  router.connect = connect.bind(this, router);
};
