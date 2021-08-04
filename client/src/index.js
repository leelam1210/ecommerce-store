import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import App from './App';
import './index.css';
import StoreInstance from './store';

ReactDOM.render(
  <Provider store={StoreInstance().store}>
    <PersistGate
      loading = {null}
      persistor = {StoreInstance().persistor}
    >
        <App/>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);

// import React from 'react';
// import ReactDOM from 'react-dom';
// import { Provider } from 'react-redux';
// import App from './App';
// import './index.css';
// import store from './store';

// ReactDOM.render(
//   <Provider store = {store}>
//         <App/>
//   </Provider>,
//   document.getElementById('root')
// );