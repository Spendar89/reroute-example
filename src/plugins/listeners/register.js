import handlers from './handlers';

export default function register (dispatcher) {
  for (let key in handlers) {
    // multiple paths are separated by commas,
    // for registering single handler on multiple cursors
    const pathStrings = key.split(',');

    // register handler for each path
    for (let pathString of pathStrings) {
      // nested cursors are separated by periods,
      // so call split to ocnvert string to array
      const path = pathString.split('.');

      let previousValue = dispatcher.store.getIn(path);

      dispatcher.on('commit', () => {
        const currentValue = dispatcher.store.getIn(path);

        if (previousValue !== currentValue) {
          dispatcher.dispatch({
            key,
            type: 'listeners',
            payload: { previousValue, currentValue }
          });

          previousValue = currentValue;
        };
      });
    };
  };
};
