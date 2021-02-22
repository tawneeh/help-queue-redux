import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import { createStore } from 'redux';
import rootReducer from './reducers/index';
import { Provider } from 'react-redux';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase'; //a component much like the Provider component that Redux provides. We can wrap our root component in the ReactReduxFirebaseProvider component to make additional functionality available throughout our application, including the withFirestore() function, which allows us to make Firestore available via a component's props
import { createFirestoreInstance } from 'redux-firestore';
import firebase from './firebase';

const store = createStore(rootReducer);

const rrfProps = {
  firebase,
  config: {
      userProfile: "users"
    },
  dispatch: store.dispatch,
  createFirestoreInstance
} // This grants access to the firebase config in firebase.js
// https://www.learnhowtoprogram.com/react/react-with-nosql/adding-firebase-to-react

store.subscribe(() =>
  console.log(store.getState())
);

ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <App />
    </ReactReduxFirebaseProvider>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();