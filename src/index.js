/* eslint-disable react/jsx-filename-extension */
// import { hot } from 'react-hot-loader/root';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './redux/configureStore';
import App from './components/App';

const initialState = window.REDUX_INITIAL_STATE || {};

const store = configureStore(initialState);

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root'),
  );
};

if (process.env.NODE_ENV !== 'production' && module.hot) {
  module.hot.accept('./components/App', render);
}

render();
