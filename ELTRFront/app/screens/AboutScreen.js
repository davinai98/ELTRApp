import React from "react";
import { StyleSheet, ScrollView, Image } from "react-native";

import AppText from "../components/AppText";
import Screen from "../components/Screen";
import colors from "../config/colors";

function AboutScreen(props) {
  return (
    <Screen style={styles.container}>
      <ScrollView>
        <Image
          style={styles.pic}
          source={require("../assets/eltrRainbow.png")}
        />
        <AppText style={styles.title}>What is "Eat Like The Rainbow™?"</AppText>

        <AppText style={styles.text}>
          Eat Like The Rainbow™ is a naturally done non-profit, catering to the
          youngest palates. Kindergarten through 4th grade are pivotal years in
          developing major lifestyle characteristics that will guide our future
          leaders into childhood and beyond. From religious beliefs, to sleeping
          patterns, to manners, following rules, and yes, even what to eat. The
          youngest among us just might be our greatest learners!
        </AppText>
        <AppText style={styles.title}>Meet Chef Cathy Zeis</AppText>
        <AppText>
          I am an all-natural chef who creates healthy food plans for those who
          are humbled by disease. I also passionately create healthy cuisine for
          those who crave a healthier lifestyle. Based on the foods that were
          created for us to feed our bodies from the very beginning, is the base
          for all my plans. Whether you are fighting a disease like cancer,
          heart disease, IBS, or obesity, this is where you want to be! If you
          love and crave all natural, Godsource Foods™ as I do to maintain a
          healthy lifestyle, then this is your place! It’s the combinations of
          the foods that fuel our bodies. Foods can kill, but it can also heal!
          I love educating people on how the simplest ingredients can power our
          bodies. After all, our bodies are the most amazing machines ever
          created! I’ll teach you how to fuel it…naturally!
        </AppText>
        <Image
          style={styles.pic}
          source={require("../assets/cathyHeadshot.png")}
        />
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: colors.light,
  },
  title: {
    color: colors.eltrdarkblue,
    fontSize: 20,
    marginBottom: 10,
    marginTop: 30,
  },
  pic: {
    alignSelf: "center",
    width: 300,
    height: 200,
  },
});

export default AboutScreen;