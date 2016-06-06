import handlers from './handlers';

export default function register (dispatcher) {
  const valToJS = val => val && val.toJS
    ? val.toJS()
    : val;

  for (let key in handlers) {
    // multiple paths are separated by commas,
    // for registering single handler on multiple cursors
    const pathStrings = key.split(',');

    // register handler for each path
    for (let pathString of pathStrings) {
      // nested paths are separated by periods,
      const path = pathString.split('.');

      let previousValue = dispatcher.store.getIn(path);

      dispatcher.on('commit', (store) => {
        const currentValue = store.getIn(path);

        // reference equality check works bc
        // values are immutable
        if (previousValue !== currentValue) {
          dispatcher.dispatch({
            key,
            type: 'listeners',
            payload: {
              previousValue: valToJS(previousValue),
              currentValue: valToJS(currentValue)
            }
          });

          // prevent infinite loop
          previousValue = currentValue;
        };
      });
    };
  };
};
