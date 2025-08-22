// Actions
const SET_COMPANY_NAME = 'clients/setCompanyName';
const SET_CLIENTS = 'clients/setClients';
const ADD_CLIENT = 'clients/addClient';
const DELETE_CLIENT = 'clients/deleteClient';
const UPDATE_CLIENT = 'clients/updateClient';
const SET_LOADING = 'clients/setLoading';
const SET_ERROR = 'clients/setError';

// Initial state
const initialState = {
  companyName: '',
  clients: [],
  loading: false,
  error: null
};

// Action creators
export const setCompanyName = (name) => ({
  type: SET_COMPANY_NAME,
  payload: name
});

export const setClients = (clients) => ({
  type: SET_CLIENTS,
  payload: clients
});

export const addClient = (client) => ({
  type: ADD_CLIENT,
  payload: client
});

export const deleteClient = (clientId) => ({
  type: DELETE_CLIENT,
  payload: clientId
});

export const updateClient = (clientId, field, value) => ({
  type: UPDATE_CLIENT,
  payload: { clientId, field, value }
});

export const setLoading = (loading) => ({
  type: SET_LOADING,
  payload: loading
});

export const setError = (error) => ({
  type: SET_ERROR,
  payload: error
});

// Thunk action for loading data from API
export const loadCompanyData = () => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    dispatch(setError(null));
    
    try {
      const response = await fetch('https://fe.it-academy.by/Examples/mobile_company.json');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      dispatch(setCompanyName(data.companyName));
      dispatch(setClients(data.clients));
    } catch (error) {
      dispatch(setError(error.message));
      console.error('Error loading company data:', error);
    } finally {
      dispatch(setLoading(false));
    }
  };
};

// Thunk action for adding a new client
export const addNewClient = () => {
  return (dispatch, getState) => {
    const { clients } = getState().clients;
    const newId = clients.length > 0 ? Math.max(...clients.map((c) => c.id)) + 1 : 1;
    
    const newClient = {
      id: newId,
      lastName: "",
      firstName: "",
      patronymic: "",
      balance: 0,
      status: "active",
      isNew: true,
    };
    
    dispatch(addClient(newClient));
  };
};

// Reducer
const clientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_COMPANY_NAME:
      return {
        ...state,
        companyName: action.payload
      };
    
    case SET_CLIENTS:
      return {
        ...state,
        clients: action.payload
      };
    
    case ADD_CLIENT:
      return {
        ...state,
        clients: [...state.clients, action.payload]
      };
    
    case DELETE_CLIENT:
      return {
        ...state,
        clients: state.clients.filter(client => client.id !== action.payload)
      };
    
    case UPDATE_CLIENT:
      const { clientId, field, value } = action.payload;
      return {
        ...state,
        clients: state.clients.map(client =>
          client.id === clientId
            ? { ...client, [field]: value, isNew: false }
            : client
        )
      };
    
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload
      };
    
    case SET_ERROR:
      return {
        ...state,
        error: action.payload
      };
    
    default:
      return state;
  }
};

export default clientsReducer;
