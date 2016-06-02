import 'babel-polyfill';

export default {
  clickedTestButton: [
    (store, ctx) => {
      ctx.finished = false;

      return store;
    },

    async (store, ctx) => {
      const { ms } = ctx.payload;

      await new Promise(r => setTimeout(r, ms));

      ctx.finished = true;

      return { ...store, ...{ yo: 'sup' } };
    },

    (store, ctx) => {
      console.log(ctx.finished);

      return store;
    }
  ],

  submittedTestForm: [
    (store) => {
      return store;
    }
  ]
};

