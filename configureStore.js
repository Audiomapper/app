import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { reducer as formReducer } from 'redux-form';

const configureStore = (apolloClient) => {

  const reducers = {
    apollo: apolloClient.reducer(),
    form: formReducer
  };

  // const context = require.context('./', true, /^.*\.reducers.js/g);
  // context.keys().forEach((key) => {
  //   reducers[key.split('/').pop().replace('.reducers.js', '')] = context(key).default;
  // });

  const reducer = combineReducers(reducers);
  const middleware = applyMiddleware(thunk, apolloClient.middleware());

  let store;
  if (typeof window.__REDUX_DEVTOOLS_EXTENSION__ === 'function') {
    // Redux DevTools browser extension support
    store = createStore(
      reducer,
      compose(middleware, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
    );
  }
  else {
    store = createStore(reducer, compose(middleware));
  }

  // if (module.hot) {
  //   module.hot.accept(context.id, () => {
  //     const reloadedContext = require.context('./', true, /^.*\.reducers.js/g);
  //     reloadedContext.keys().forEach((key) => {
  //       reducers[key.split('/').pop().replace('.reducers.js', '')] = reloadedContext(key).default;
  //     });
  //     store.replaceReducer(combineReducers(reducers));
  //   });
  // }

  return store;
};

export default configureStore;