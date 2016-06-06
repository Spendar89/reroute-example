import handlers from './handlers';

export default function register (dispatcher) {
  const valToJS = val => val && val.toJS
    ? val.toJS()
    : val;

  for (let key in handlers) {
    // multiple paths are separated by commas
    const pathStrings = key.split(',');

    // register handler for each path
    for (let pathString of pathStrings) {
      // nested paths are separated by periods
      const path = pathString.split('.');

      dispatcher.on('commit', (prevStore) => {
        const previousValue = prevStore.getIn(path);
        const currentValue = dispatcher.store.getIn(path);

        // reference equality check works
        // because values are immutable
        if (previousValue !== currentValue) {
          dispatcher.dispatch({
            key,
            type: 'listeners',
            payload: {
              previousValue: valToJS(previousValue),
              currentValue: valToJS(currentValue)
            }
          });
        };
      });
    };
  };
};
