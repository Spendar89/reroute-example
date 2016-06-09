import 'babel-polyfill';

export default {
  clickedTestButton: [
    (store, ctx) => {
      ctx.changed = true;
    },

    async (store, ctx) => {
      const { ms } = ctx.payload;

      await new Promise(r => setTimeout(r, ms));

      return { ...store, ...{ changed: true, test: 'hey' } };
    },

    (store, ctx) => {
      console.log(ctx, store);
      return store;
    }
  ],

  submittedTestForm: [
    (store) => {
      return store;
    }
  ]
};
