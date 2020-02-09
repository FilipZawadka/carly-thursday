import {CARS_LOADING,CARS_LOADED,CARS_LOADING_ERROR, CARS_CHANGE,LOGIN_SUCCESS, LOGIN_ERROR,CARS_SAVING_ERROR,CAR_SAVING,CAR_SAVED,CARS_SORTED,DATES_LOADING,DATES_LOADED,DATES_LOADING_ERROR,CAR_ID} from './constants';

export const initialState = {
  cars: [],
  dates: [],
  loaded: false,
  loading:false,
  error:'',
  admin:null,
  saving:false,
  newcar:{},
  carid:5
};

// Read this: https://redux.js.org/basics/reducers

const appReducer = (state = initialState, action) => {
  switch (action.type) {

    case LOGIN_SUCCESS: {
        return { ...state, 
          admin: action.payload.admin 
        };
      }
      case LOGIN_ERROR: {
        alert("Incorrect password or username");
        return { ...state, 
          admin:null
       };
      }

    case CARS_LOADING:{
      return{
        ...state,
        loading:true
      }
    }
    case CARS_LOADING_ERROR:{
      return{
        ...state,
        error: action.payload,
        loading:false
      }
    }
    case CARS_LOADED: {
      const { cars } = action.payload;
      // CAREFUL: You can't modify state variable directly.
      return Object.assign({}, state, { 
        cars:cars,
        loaded:true,
        loading: false
      });
    }
    case CARS_CHANGE:{
      newcars = Object.assign({}, state.cars)
      newcars[action.payload.index][action.payload.name]=action.payload.value
     return Object.assign({}, state, {

       cars:cars[action.payload.index][action.payload.name]=action.payload.value

      });
    }
    case CAR_SAVING:{
      return{
        ...state,
        saving:true
      }
    }
    case CARS_SAVING_ERROR:{
      return{
        ...state,
        error: action.payload,
        saving:false
      }
    }
    case CAR_SAVED:{
      return{
        ...state,
      //  newcar:actoon.payload,
        saving:false
      }
    }
    case CARS_SORTED:{
      return{
        ...state,
        cars:action.payload
      }
    }
    case DATES_LOADING:{
      return{
        ...state,
        loading:true
      }
    }
    case DATES_LOADING_ERROR:{
      return{
        ...state,
        error: action.payload,
        loading:false
      }
    }
    case DATES_LOADED: {
      return Object.assign({}, state, { 
        dates:action.payload,
        loaded:true,
        loading: false
      });
    }
    case CAR_ID:{
      return{
        ...state,
        carid: action.payload
      }
    }
    
    default:
        return state
  }
}

export default appReducer;