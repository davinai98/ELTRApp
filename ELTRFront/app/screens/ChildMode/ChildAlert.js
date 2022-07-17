import React from "react";
import { StyleSheet, View } from "react-native";

import AppText from "../../components/AppText";
import Screen from "../../components/Screen";
import colors from "../../config/colors";
import AppButton from "../../components/AppButton";

function ChildAlert({navigation}) {
  
  return (
    <Screen style = {styles.screen}>
      <View style = {styles.container}>
        <AppText style={styles.textbox}>
          You are about to switch to Child Mode. This offers a simplified experience for children.
        </AppText>
            
        <AppButton
          title="Change to Child Mode"
          onPress={() => navigation.navigate('ChildNavigator')}/>  
        </View>            
    </Screen>
  );
}


const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.light,
  },

  container: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 100,
    },
                  
  textbox: {
    color: colors.black,
    fontWeight: '400',
    fontSize: 25,
    fontStyle: 'normal',
    textAlign: 'center',
    marginVertical: 20

  },
});          

export default ChildAlert;