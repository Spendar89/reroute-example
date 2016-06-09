import wrapComponent from './wrapComponent';

export default function register (router) {
  router.wrapComponent = wrapComponent.bind(this, router);
};
