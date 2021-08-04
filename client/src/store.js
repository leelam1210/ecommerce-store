import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import {persistReducer, persistStore} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    storage: storage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
 
export default () => {
    let store = createStore(
        persistedReducer, 
        applyMiddleware(thunk)
    );
    let persistor = persistStore(store);
    let StoreInstance = { store, persistor };
    return StoreInstance;
}

// import { createStore, applyMiddleware, compose } from "redux";
// import thunk from 'redux-thunk';
// import rootReducer from './reducers';

// const store = createStore(
//     rootReducer, 
//     compose(applyMiddleware(thunk))
// );

// export default store;