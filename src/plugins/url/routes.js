export default {
  '/test-route': (state, ctx) => {
    console.log('new url route event 1', ctx);
    return { currentUrl: ctx.key };
  },

  '/test-route-2': (state, ctx) => {
    console.log('new url route event 2', ctx);
    return { currentUrl: ctx.key };
  }
};
