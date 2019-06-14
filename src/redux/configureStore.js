import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import reducer from './reducers/index';

export default function configureStore(initialState = {}) {
  const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(thunk)));

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    if (process.env.NODE_ENV !== 'production' && module.hot) {
      module.hot.accept('./reducers/index', () => store.replaceReducer(reducer));
    }
  }

  return store;
}
