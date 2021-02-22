import formVisibleReducer from './form-visible-reducer';
import ticketListReducer from './ticket-list-reducer';
import { combineReducers } from 'redux'; // this is core Redux. not React Redux
import { firestoreReducer } from 'redux-firestore';

const rootReducer = combineReducers({
  formVisibleOnPage: formVisibleReducer,
  masterTicketList: ticketListReducer,
  firestore: firestoreReducer
});

export default rootReducer;

// combineReducers() takes an object as an argument. That object contains key-value pairs. The key represents the state slice while the value represents the reducer that handles actions related to that state slice. Our formVisibleReducer handles the formVisibleOnPage state slice while our ticketListReducer handles the masterTicketList state slice