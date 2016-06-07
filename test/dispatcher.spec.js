import expect from 'expect';
import dispatcher from './../src/dispatcher';
import store from './../src/store';
import { fromJS } from 'immutable';

describe('dispatcher', () => {
  it('has an immutable store', () => {
    expect(dispatcher.store).toExist();
    expect(dispatcher.store).toEqual(fromJS(store));
  });

  it('it registers the current plugins by default', () => {
    expect(dispatcher.isRegistered).toEqual(true);
  });

  it ('only registers the current plugins when isRegistered is false', () => {
    expect(dispatcher.registerPlugins()).toEqual(false);

    dispatcher.isRegistered = false;

    expect(dispatcher.registerPlugins()).toEqual(true);

    dispatcher.isRegistered = dispatcher.registerPlugins();

    expect(dispatcher.isRegistered).toEqual(true);
    expect(dispatcher.registerPlugins()).toEqual(false);
  })
});
