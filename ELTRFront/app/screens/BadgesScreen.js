import React from "react";
import { StyleSheet } from "react-native";

import AppText from "../components/AppText";
import Screen from "../components/Screen";
import colors from "../config/colors";

function BadgesScreen(props) {
  return (
    <Screen style={styles.screen}>
      <AppText style={styles.text}>Coming Soon!</AppText>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.light,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: colors.eltrpink,
    fontWeight: "bold",
  },
});
export default BadgesScreen;
