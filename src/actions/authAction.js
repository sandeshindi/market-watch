export const signIn = (email, password) => async (
  dispatch,
  getState,
  { getFirebase }
) => {
  const firebase = getFirebase();
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => dispatch({ type: "LOGIN_SUCC" }))
    .catch(err => {
      const errorMessage = err.message;
      dispatch({ type: "LOGIN_FAILED", payload: errorMessage });
    });
};

export const signOut = () => (dispatch, getState, { getFirebase }) => {
  const firebase = getFirebase();
  firebase
    .auth()
    .signOut()
    .then(() => {
      dispatch({ type: "LOG_OUT" });
    });
};

export const signUpUser = newUser => (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firebase = getFirebase();
  const firestore = getFirestore();

  firebase
    .auth()
    .createUserWithEmailAndPassword(newUser.email, newUser.password)
    .then(resp => {
      return firestore
        .collection("users")
        .doc(resp.user.uid)
        .set({
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          initials: newUser.firstName[0] + newUser.lastName[0]
        });
    })
    .then(() => {
      dispatch({ type: "SIGNUP_SUCCESS" });
    })
    .catch(err => {
      const message = err.message;
      dispatch({ type: "SIGNUP_ERROR", payload: message });
    });
};
