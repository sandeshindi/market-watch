const initState = {
  authError: null
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case "LOGIN_SUCC":
      return {
        ...state,
        authError: null
      };
    case "LOGIN_FAILED":
      return {
        ...state,
        authError: action.payload
      };
    case "LOG_OUT":
      return state;

    case "SIGNUP_SUCCESS":
      return {
        ...state,
        authError: null
      };
    case "SIGNUP_ERROR":
      return {
        ...state,
        authError: action.payload
      };
    default:
      return state;
  }
};

export default authReducer;
