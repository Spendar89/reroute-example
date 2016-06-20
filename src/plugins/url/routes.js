export default {
  '/': (state, { payload, key }) => {
    console.info('match route root', payload);

    return { currentUrl: key.substr(1), ...payload };
  },
  '/test_route_1': (state, ctx) => {
    console.info('match route 1');

    return { foo: 'bar-1' }
  },
  '/test_route_2': (state, ctx) => {
    console.info('match route 2');

    return { foo: 'bar-2' };
  },
  '/test_route_1/:dude/dude': (state, ctx) => {
    console.info('match route dude');

    return { foo: 'bar-2' };
  }
};
