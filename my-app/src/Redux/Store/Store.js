import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk'
// import counterReducer from '../../features/counter/counterSlice';
import rootReducer from '../Reducer/index';
// import thunk from 'redux-thunk';

const initialState = {
  userSignIn: {
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
  },
  allProducts: [],
  products:[],
  productosSelect: [],
  categoriaSelect: [],
  allVentas: [{},0],
  usuarios: [],

};

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  initialState,
  composeEnhancer(applyMiddleware(thunkMiddleware))
);

export default store;