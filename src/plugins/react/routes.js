import 'babel-polyfill';

export default {
  clickedTestButton: [
    (state, ctx) => {
      ctx.changed = true;
      return {
        msgs: [
          ...state.msgs,
          {
            subject: 'duuude',
            body: 'suupppp?'
          }
        ]
      };
    },

    async (state, ctx) => {
      const { ms } = ctx.payload;

      await new Promise(r => setTimeout(r, ms));

      return { changed: true, test: 'hey' };
    },

    (state, ctx) => {
      console.log(ctx, state);

      return ctx.payload;
    }
  ],

  submittedTestForm: [
    (state) => {}
  ]
};

