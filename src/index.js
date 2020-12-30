// Show a nice greeting to our fellow builders.
console.info('%c👨🏾‍💻 You’re looking in the right place!', 'padding: 10px; font-weight: bold; font-size: large;');
console.info('%cCheck out my work – https://github.com/abhandaru\nCome work with me – https://x1creditcard.com', 'padding: 10px; font-weight: bold;');

// Onwards with the actual code.
import './index.css';
import App from '~/App';
import React from 'react';
import ReactDOM from 'react-dom';
import Reducer from '~/state/reducer';
import thunk from 'redux-thunk';
import { AppContainer } from 'react-hot-loader';
import { applyMiddleware, createStore, compose } from 'redux'
import { Provider } from 'react-redux'

const enhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(Reducer, {}, enhancers(applyMiddleware(thunk)));

const render = Component => (
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <Component />
      </Provider>
    </AppContainer>,
    document.getElementById('root')
  )
);

render(App);
if (module.hot) module.hot.accept('./App', () => render(App));
