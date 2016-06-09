import expect from 'expect';
import router from './../src/router';
import store from './../src/store';
import { fromJS } from 'immutable';

describe('router', () => {
  it ('has an immutable store', () => {
    expect(router.store).toExist();
    expect(router.store).toEqual(fromJS(store));
  });

  it ('it registers the current plugins by default', () => {
    expect(router.isRegistered).toEqual(true);
  });

  it ('only registers the current plugins when isRegistered is false', () => {
    expect(router.registerPlugins()).toEqual(false);

    router.isRegistered = false;

    expect(router.registerPlugins()).toEqual(true);

    router.isRegistered = router.registerPlugins();

    expect(router.isRegistered).toEqual(true);
    expect(router.registerPlugins()).toEqual(false);
  });

  describe('route', () => {
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
        routes: {
          testEvent1: [ expect.createSpy() ],
          testEvent2: expect.createSpy()
        }
      }
    };

    router.plugins = {
      ...router.plugins,
      ..._plugins
    };

    router.route(testEvent1);
    router.route(testEvent2);

    const { routes } = router.plugins.test;

    it('should handle events by calling each middleware of the correct handler', () => {
      for (let i in routes.testEvent1) {
        expect(routes.testEvent1[i].calls.length).toEqual(1);
      };
    });

    it('should handle events by calling the correct handler directly', () => {
      expect(routes.testEvent2.calls.length).toEqual(1);
    });
  });
});
