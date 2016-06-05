import wrapComponent from './wrapComponent';

export default function register (dispatcher) {
  dispatcher.wrapComponent = wrapComponent.bind(this, dispatcher);
};
