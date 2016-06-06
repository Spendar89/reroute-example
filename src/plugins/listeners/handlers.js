export default {
  'test': (store, { key, payload }) => {
    console.log(key + ' listener', payload);

    return {
      user: {
        name: {
          first: 'lala',
          last: 'anthony'
        }
      }
    };
  },

  'user.name.first': (store, { key, payload }) => {
    console.log(key + ' listener', payload);

    return {
      user: {
        name: {
          first: 'carmelo',
          last: 'anthony'
        }
      }
    };
  }
};
