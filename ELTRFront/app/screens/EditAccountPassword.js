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
  newPassword: Yup.string().required().min(6).label("Password"),
  confirmNewPassword: Yup.string()
    .required()
    .label("Confirm Password")
    .oneOf([Yup.ref("newPassword"), null], "Passwords must match."),
});

function EditAccountPassword({ navigation }) {
  const authContext = useContext(AuthContext);
  const [loginFailed, setLoginFailed] = useState(false);

  const handleSubmit = ({ email, password, newPassword }) => {
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
          .updatePassword(newPassword)
          .then(function () {
            // Update successful.
            console.log("UPDATE PASSWORD SUCCESS");
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
      <AppText style={styles.textbox}>Enter current password.</AppText>

      <AppForm
        initialValues={{
          password: "",
          email: authContext.user.email,
          newPassword: "",
          newPasswordConfirm: "",
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
        <AppText>Enter your new password.</AppText>
        <AppFormField
          name="newPassword"
          autoCaptilize="none"
          autoCorrect={false}
          icon="lock"
          placeholder="Password"
          secureTextEntry
          textContentType="password"
        />
        <AppText>Re-enter your new password.</AppText>
        <AppFormField
          name="confirmNewPassword"
          autoCaptilize="none"
          autoCorrect={false}
          icon="lock-question"
          placeholder="Confirm Password"
          secureTextEntry
          textContentType="password"
        />
        <SubmitButton title="Change Password" />
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
});

export default EditAccountPassword;