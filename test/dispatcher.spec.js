import expect from 'expect';
import dispatcher from './../src/dispatcher';
import store from './../src/store';
import { fromJS } from 'immutable';

describe('dispatcher', () => {
  it ('has an immutable store', () => {
    expect(dispatcher.store).toExist();
    expect(dispatcher.store).toEqual(fromJS(store));
  });

  it ('it registers the current plugins by default', () => {
    expect(dispatcher.isRegistered).toEqual(true);
  });

  it ('only registers the current plugins when isRegistered is false', () => {
    expect(dispatcher.registerPlugins()).toEqual(false);

    dispatcher.isRegistered = false;

    expect(dispatcher.registerPlugins()).toEqual(true);

    dispatcher.isRegistered = dispatcher.registerPlugins();

    expect(dispatcher.isRegistered).toEqual(true);
    expect(dispatcher.registerPlugins()).toEqual(false);
  });

  describe('dispatch', () => {
    global.requestAnimationFrame = setTimeout;

    const testEvent1 = {
      type: 'test',
      key: 'testEvent1',
      payload: { isTest: true }
    };

    const testEvent2 = {
      type: 'test',
      key: 'testEvent2',
      payload: { isTest: true }
    };

    const _plugins = {
      test: {
        handlers: {
          testEvent1: [ expect.createSpy() ],
          testEvent2: expect.createSpy()
        }
      }
    };

    dispatcher.plugins = {
      ...dispatcher.plugins,
      ..._plugins
    };

    dispatcher.dispatch(testEvent1);
    dispatcher.dispatch(testEvent2);

    const { handlers } = dispatcher.plugins.test;

    it('should handle events by calling each middleware of the correct handler', () => {
      for (let i in handlers.testEvent1) {
        expect(handlers.testEvent1[i].calls.length).toEqual(1);
      };
    });

    it('should handle events by calling the correct handler directly', () => {
      expect(handlers.testEvent2.calls.length).toEqual(1);
    });
  });
});
