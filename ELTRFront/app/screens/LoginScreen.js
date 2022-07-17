import React, { useContext, useState } from "react";
import { Image, StyleSheet } from "react-native";
import * as Yup from "yup";

import Screen from "../components/Screen";
import { AppForm, AppFormField, SubmitButton } from "../components/forms";
import colors from "../config/colors";
import Firebase from "../config/firebase";
import AuthContext from "../auth/context";
import ErrorMessage from "../components/forms/ErrorMessage";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(6).label("Password"),
});

function LoginScreen(props) {
  const authContext = useContext(AuthContext);
  const [loginFailed, setLoginFailed] = useState(false);

  const handleSubmit = ({ email, password }) => {
    Firebase.auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        authContext.setUser(userCredential.user);
        Firebase.firestore()
          .collection("users")
          .doc(userCredential.user.uid)
          .get()
          .then((doc) => {
            if (doc.exists) {
              authContext.setUsername(doc.data().name);
            } else {
              // doc.data() will be undefined in this case
              console.log("No such document!");
            }
          })
          .catch((error) => {
            console.log("Error getting document:", error);
          });
      })
      .catch((error) => {
        setLoginFailed(true);
        console.log(error);
      });
  };

  return (
    <Screen style={styles.container}>
      <Image
        style={styles.logo}
        source={require("../assets/eltrRainbow.png")}
      />
      <AppForm
        initialValues={{ email: "", password: "" }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <ErrorMessage
          error="Invalid email and/or password."
          visible={loginFailed}
        />
        <AppFormField
          name="email"
          autoCaptilize="none"
          autoCorrect={false}
          keyboardType="email-address"
          icon="email"
          placeholder="Email"
          textContentType="emailAddress"
        />
        <AppFormField
          name="password"
          autoCaptilize="none"
          autoCorrect={false}
          icon="lock"
          placeholder="Password"
          secureTextEntry
          textContentType="password"
        />
        <SubmitButton title="Login" />
      </AppForm>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: colors.secondary,
  },
  logo: {
    alignSelf: "center",
    marginTop: 50,
    marginBottom: 20,
  },
});

export default LoginScreen;