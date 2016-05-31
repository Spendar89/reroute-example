import 'babel-polyfill';

function wrap (asyncAction) {
  return { asyncAction };
};

export default {
  'clickedTestButton1': [
    (store, payload) => {
      console.info('action 0', payload);

      return { started: true };
    },
    wrap (
      async (store, payload) => {
        await new Promise(r => setTimeout(r, payload.ms));

        console.info('action 1', payload);

        return { wrapped: true };
      }
    ),
    (store, payload) => {
      console.info('action 2', payload);

      return { finished: true };
    }
  ],

  'clickedTestButton2': [
    (store, payload) => {
      console.info('test action 2 initiated!!!')

      return { testedTwo: true };
    }
  ]
};
