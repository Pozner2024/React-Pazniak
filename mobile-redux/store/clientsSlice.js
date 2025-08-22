// Action types
const LOAD_COMPANY_DATA_REQUEST = 'clients/LOAD_COMPANY_DATA_REQUEST';
const LOAD_COMPANY_DATA_SUCCESS = 'clients/LOAD_COMPANY_DATA_SUCCESS';
const LOAD_COMPANY_DATA_FAILURE = 'clients/LOAD_COMPANY_DATA_FAILURE';
const ADD_CLIENT = 'clients/ADD_CLIENT';
const DELETE_CLIENT = 'clients/DELETE_CLIENT';
const UPDATE_CLIENT = 'clients/UPDATE_CLIENT';

// Initial state
const initialState = {
  companyName: '',
  clients: [],
  loading: false,
  error: null,
};

// Action creators
export const loadCompanyDataRequest = () => ({
  type: LOAD_COMPANY_DATA_REQUEST,
});

export const loadCompanyDataSuccess = (data) => ({
  type: LOAD_COMPANY_DATA_SUCCESS,
  payload: data,
});

export const loadCompanyDataFailure = (error) => ({
  type: LOAD_COMPANY_DATA_FAILURE,
  payload: error,
});

export const addClient = (client) => ({
  type: ADD_CLIENT,
  payload: client,
});

export const deleteClient = (clientId) => ({
  type: DELETE_CLIENT,
  payload: clientId,
});

export const updateClient = (clientId, field, value) => ({
  type: UPDATE_CLIENT,
  payload: { clientId, field, value },
});

// Thunk action for loading company data
export const loadCompanyData = () => {
  return async (dispatch) => {
    dispatch(loadCompanyDataRequest());
    
    try {
      const response = await fetch('https://fe.it-academy.by/Examples/mobile_company.json');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Преобразуем данные из API в нужный формат
      const transformedClients = data.clientsArr.map(client => ({
        id: client.id,
        lastName: client.fam,
        firstName: client.im,
        patronymic: client.otch,
        balance: client.balance,
        status: client.balance < 0 ? 'blocked' : 'active'
      }));
      
      dispatch(loadCompanyDataSuccess({
        companyName: data.companyName,
        clients: transformedClients,
      }));
    } catch (error) {
      dispatch(loadCompanyDataFailure(error.message));
    }
  };
};

// Reducer
const clientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_COMPANY_DATA_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    
    case LOAD_COMPANY_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        companyName: action.payload.companyName,
        clients: action.payload.clients,
        error: null,
      };
    
    case LOAD_COMPANY_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    
    case ADD_CLIENT:
      return {
        ...state,
        clients: [...state.clients, action.payload],
      };
    
    case DELETE_CLIENT:
      return {
        ...state,
        clients: state.clients.filter(client => client.id !== action.payload),
      };
    
    case UPDATE_CLIENT:
      return {
        ...state,
        clients: state.clients.map(client =>
          client.id === action.payload.clientId
            ? { ...client, [action.payload.field]: action.payload.value, isNew: false }
            : client
        ),
      };
    
    default:
      return state;
  }
};

export default clientsReducer;
