import React, { useState, useEffect, useContext } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import AuthContext from "../auth/context";
import AppPicker from "../components/AppPicker";
import AppText from "../components/AppText";

import {
  ListItem,
  ListItemDeleteAction,
  ListItemSeparator,
} from "../components/lists/index";
import Screen from "../components/Screen";
import colors from "../config/colors";
import choices from "../config/options";
import sstore from "../utility/sstore";

let initialItems = [];

const allergyChoices = choices.allergyChoices;

function AccountAllergies(props) {
  const authContext = useContext(AuthContext);
  const key = authContext.user.uid + "allergies";
  const [allergies, setAllergies] = useState(initialItems);

  useEffect(() => {
    loadAllergies();
  }, []);

  const loadAllergies = async () => {
    const response = await sstore.get(key);
    setAllergies(response);
  };

  const handleDelete = (allergy) => {
    // Delete the item from item
    const updated = allergies.filter((m) => m.id !== allergy.id);
    sstore.store(key, updated);
    setAllergies(updated);
  };

  const onSelectItem = (allergy) => {
    //console.log(allergies);
    if (allergies.includes(allergy)) {
      setAllergies(allergies);
    } else {
      const updated = JSON.parse(JSON.stringify(allergies));
      updated.push(allergy);
      sstore.store(key, updated);
      setAllergies(updated);
    }
  };

  return (
    <Screen style={styles.screen}>
      <View style={styles.toolTip}>
        <AppText style={styles.toolTipText}>Swipe left to remove!</AppText>
      </View>
      <AppPicker
        placeholder="Add Allergy"
        items={allergyChoices}
        onSelectItem={onSelectItem}
      />

      <FlatList
        data={allergies}
        extraData={useState}
        keyExtractor={(allergy) => allergy.id.toString()}
        renderItem={({ item }) => (
          <ListItem
            title={item.label}
            subTitle={item.description}
            image={item.image}
            onPress={() => console.log("Message Selected", item)}
            renderRightActions={() => (
              <ListItemDeleteAction onPress={() => handleDelete(item)} />
            )}
          />
        )}
        ItemSeparatorComponent={ListItemSeparator}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  toolTip: {
    alignItems: "center",
  },
  toolTipText: {
    color: colors.primary,
  },
  screen: {
    backgroundColor: colors.light,
  },
});
export default AccountAllergies;