export default {
  '/': [
    (state, ctx) => {
      console.info('match route root', ctx.payload);

      ctx.__currentUrl =  ctx.key.substr(1);

      return {
        currentUrl: ctx.__currentUrl,
        ...ctx.payload
      };
    },
    (state, ctx) => {
      console.info('match route root', ctx);

      return {
        currentUrl: 'page_bro',
        pageId: 0
      };
    }
  ],
  '/page_2': (state, ctx) => {
    console.info('match route 1');

    return {
      currentUrl: ctx.__currentUrl,
      pageId: ctx.payload.pageId
    };
  },
  '/test_route_2': (state, ctx) => {
    console.info('match route 2');

    return {
      foo: 'bar-2'
    };
  },
  '/test_route_1/:dude/dude': (state, ctx) => {
    console.info('match route dude');

    return {
      foo: 'bar-2'
    };
  }
};
