import handlers from './handlers';

export default function register (dispatcher) {
    for (let key in handlers) {
      this.socket.on(key, payload => {
        dispatcher.dispatch({
          key,
          payload
        });
      });
    }
};
