import React, { useContext } from "react";
import { StyleSheet, View, FlatList } from "react-native";

import Screen from "../components/Screen";
import ListItem from "../components/lists/ListItem";
import Icon from "../components/Icon";
import colors from "../config/colors";
import ListItemSeparator from "../components/lists/ListItemSeparator";
import routes from "../navigation/routes";
import AuthContext from "../auth/context";
import Firebase from "../config/firebase";

const menuItems = [
  {
    title: "My Conditions",
    icon: {
      name: "medical-bag",
      backgroundColor: colors.primary,
    },
    target: "AccountConditions",
  },
  {
    title: "My Allergies",
    icon: {
      name: "food-off",
      backgroundColor: colors.secondary,
    },
    target: "AccountAllergies",
  },
];

function AccountDetails({ navigation }) {
  const authContext = useContext(AuthContext);

  const handleLogOut = () => {
    Firebase.auth()
      .signOut()
      .then(() => {
        // Sign-out successful.
        authContext.setUser(null);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <Screen style={styles.screen}>
      <View style={styles.container}>
        <ListItem
          title={authContext.username}
          image={require("../assets/stockProfile.png")}
          onPress={() => navigation.navigate(routes.ACCOUNT_EDIT)}
        />
      </View>
      <View style={styles.container}>
        <FlatList
          data={menuItems}
          keyExtractor={(item) => item.title}
          ItemSeparatorComponent={ListItemSeparator}
          renderItem={({ item }) => (
            <ListItem
              title={item.title}
              onPress={() => navigation.navigate(item.target)}
              IconComponent={
                <Icon
                  name={item.icon.name}
                  backgroundColor={item.icon.backgroundColor}
                />
              }
            />
          )}
        />
      </View>
      <ListItem
        title="Log Out"
        IconComponent={<Icon name="logout" backgroundColor="#ffe66d" />}
        onPress={handleLogOut}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  screen: {
    backgroundColor: colors.light,
  },
});

export default AccountDetails;