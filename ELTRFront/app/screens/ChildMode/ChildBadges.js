import React from "react";
import { StyleSheet, View } from "react-native";

import AppText from "../../components/AppText";
import Screen from "../../components/Screen";
import colors from "../../config/colors";
import routes from "../../navigation/routes";
import ChildBackButton from "../../components/ChildBackButton";

function ChildBadges({navigation}) {
  return (
    <Screen style={styles.screen}>
      <View style={styles.container}>
        <AppText style={styles.text}>Coming Soon!</AppText>
          <View style={styles.space}>
          <ChildBackButton
          title="<<   GO BACK"
          onPress={() => navigation.navigate(routes.CHILD_HOME)} />
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.eltrlightblue,
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    marginVertical: 100,
  },
  text: {
    color: colors.medium,
    fontWeight: "bold",
    fontSize: 30
  },
  space: {
    marginVertical: 50
  },

});
export default ChildBadges;