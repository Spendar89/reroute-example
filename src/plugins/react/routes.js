import 'babel-polyfill';

export default {
  clickedTestButton: [
    (state, ctx) => {
      ctx.changed = true;
    },

    async (state, ctx) => {
      const { ms } = ctx.payload;

      await new Promise(r => setTimeout(r, ms));

      return { ...state, ...{ changed: true, test: 'hey' } };
    },

    (state, ctx) => {
      console.log(ctx, state);
      return state;
    }
  ],

  submittedTestForm: [
    (state) => {
      return state;
    }
  ]
};

