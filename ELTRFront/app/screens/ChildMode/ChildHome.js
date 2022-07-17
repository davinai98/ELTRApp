import React, { useEffect } from "react";
import { StyleSheet, View, Image, BackHandler } from "react-native";

import Screen from "../../components/Screen";
import ChildButtonLarge from "../../components/ChildButtonLarge";
import ChildButtonSmall from "../../components/ChildButtonSmall";
import AppText from "../../components/AppText";
import colors from "../../config/colors";
import routes from "../../navigation/routes";

function ChildHome({ navigation }) {
  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", () => true);
    return () =>
      BackHandler.removeEventListener("hardwareBackPress", () => true);
  }, []);
  return (
    <Screen style={styles.screen}>
      <View style={styles.container}>
        <Image
          source={require("../../assets/eltr-png.png")}
          style={styles.kidrainbow}
        />

        <View style={styles.space}>
          <ChildButtonLarge
            title="Scan"
            onPress={() => navigation.navigate(routes.CHILD_SCAN)}
          />
        </View>

        <View style={styles.otherButtons}>
          <ChildButtonSmall
            title="Badges"
            onPress={() => navigation.navigate(routes.CHILD_BADGES)}
          />

          <View style={styles.space}>
            <ChildButtonSmall
              title="Change Mode"
              onPress={() => navigation.navigate(routes.CHILD_CHANGE)}
            />
          </View>
        </View>

        <Image
          source={require("../../assets/adamapplewave.png")}
          style={styles.adam}
        />
        <AppText style={styles.bottomText}>CHILD MODE</AppText>
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
  },

  space: {
    marginHorizontal: 5,
  },

  otherButtons: {
    flexDirection: "row",
  },

  kidrainbow: {
    marginTop: 50,
    marginRight: 0,
    marginBottom: -30,
    paddingTop: 10,
    width: 350,
    height: 250,
    shadowColor: colors.white,
    shadowOpacity: 0.5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 4,
  },

  adam: {
    width: "35%",
    height: "20%",
    bottom: -30,
    alignSelf: "center",
  },

  bottomText: {
    color: colors.white,
    opacity: 0.3,
    fontSize: 55,
    fontStyle: "normal",
    textAlign: "center",
    bottom: 30,
  },
});

export default ChildHome;