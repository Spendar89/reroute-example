export default {
  '/': (state, { payload }) => {
    const { location } = payload;

    console.info('match route root', location)

    return { location };
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
