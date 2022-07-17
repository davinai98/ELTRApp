import React, { useContext, useState } from "react";
import { StyleSheet } from "react-native";
import * as Yup from "yup";
import firebase from "firebase";

import Screen from "../components/Screen";
import { AppForm, AppFormField, SubmitButton } from "../components/forms";
import AppText from "../components/AppText";
import AuthContext from "../auth/context";
import Firebase from "../config/firebase";
import ErrorMessage from "../components/forms/ErrorMessage";
import colors from "../config/colors";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(6).label("Password"),
});

function DeleteAccount({ navigation }) {
  const authContext = useContext(AuthContext);
  const [loginFailed, setLoginFailed] = useState(false);

  const handleSubmit = ({ email, password }) => {
    let user = Firebase.auth().currentUser;
    let credentials = firebase.auth.EmailAuthProvider.credential(
      email,
      password
    );
    // Prompt the user to re-provide their sign-in credentials

    user
      .reauthenticateWithCredential(credentials)
      .then(function () {
        // User re-authenticated.
        console.log("REAUTH SUCCESS");
        user
          .delete()
          .then(function () {
            // User deleted.
            console.log("user deleted");
            authContext.setUser(null);
          })
          .catch(function (error) {
            // An error happened.
            console.log(error);
          });
        navigation.goBack();
      })
      .catch(function (error) {
        // An error happened.
        console.log(error);
        setLoginFailed(true);
      });
  };

  return (
    <Screen style={styles.container}>
      <AppText style={styles.warning}>
        Warning, deleting your account is permanent!
      </AppText>
      <AppText style={styles.tooltip}>Please enter your password.</AppText>

      <AppForm
        initialValues={{
          password: "",
          email: authContext.user.email,
        }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <ErrorMessage error="Invalid password." visible={loginFailed} />
        <AppFormField
          name="password"
          autoCaptilize="none"
          autoCorrect={false}
          icon="lock"
          placeholder="Password"
          secureTextEntry
          textContentType="password"
        />
        <SubmitButton color="eltrred" title="Delete Account" />
      </AppForm>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: colors.white,
  },
  tooltip: {
    alignSelf: "center",
    textTransform: "capitalize",
  },
  warning: {
    alignSelf: "center",
    padding: 10,
    fontWeight: "bold",
    color: colors.eltrred,
  },
});

export default DeleteAccount;