import React, { useEffect, useState } from "react";
import { StyleSheet, View, Image, ScrollView } from "react-native";

import Screen from "../../components/Screen";
import AppText from "../../components/AppText";
import colors from "../../config/colors";
import ChildButtonFood from "../../components/ChildButtonFood";
import routes from "../../navigation/routes";
import check from "../../utility/check";


function ChildFoodAbout({ navigation, route }) {
  const [allergic, setAllergic] = useState(null);
  const [condition, setCondition] = useState(null);
  const food = route.params;
  const ingredients = food.product.ingredients_text;
  const additives = food.product.additives;
  let image = false;
  let traces = false;

  if (food.status) {
    image = food.product.image_small_url;
    traces = food.product.traces;

    useEffect(() => {
      checkAllergies();
      checkConditions();
    }, []);
  }
  const checkAllergies = async () => {
    const allergic = await check.checkAllergens(
      food.product.ingredients_text,
      food.product.traces
    );
    setAllergic(allergic);
  };

  const checkConditions = async () => {
    const condition = await check.checkConditions(food.product.nutriments);
    setCondition(condition);
  };

  return (
    <ScrollView>
      <Screen style={styles.screen}>
        <View style = {styles.container}>
          {image ? (
              <Image
                source={{ uri: food.product.image_small_url }}
                style={{
                  height: 250,
                  width: 250,
                  borderColor: colors.eltrdarkblue,
                  borderWidth: 8,
                  marginBottom: 20,
                }}
              />
            ) : null}

          {allergic ? (
                <>
                  <AppText style={styles.allergy}>
                    ***Warning! This food contains {allergic} which you are allergic to. 
                  </AppText>
                </>
              ) : null}

          {traces ? <AppText style = {styles.text}> May also contain traces of:{food.product.traces}.</AppText>: null}

          {condition ? (
                <>
                  <AppText style = {styles.tips}>*ADAM'S TIP*</AppText>
                  <AppText style={styles.text}>-{condition}</AppText>
                </>
              ) : null}

          <AppText style = {styles.title1}>Food Details </AppText> 
          <AppText style = {styles.title}>Item Name: </AppText> 
          <AppText style = {styles.text}>{food.product.product_name}</AppText> 

          <AppText style = {styles.title}>What's in {food.product.product_name}? </AppText> 
          {ingredients ? <AppText style = {styles.text}>{food.product.ingredients_text}</AppText> :<AppText style = {styles.text}>Adam does not have the list of ingredients for this item.</AppText>}

          <AppText style = {styles.title}>Additives: </AppText> 
          {additives ? <AppText style = {styles.text}>{food.product.additives}. </AppText> :<AppText style = {styles.text}>Adam does not have the list of additives for this item.</AppText>}

          <ChildButtonFood
            title="<<   GO BACK"
            onPress={() => navigation.navigate(routes.CHILD_FOODITEM)}/>
        </View>
      </Screen>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor:colors.light,
  },

  container: {
    alignItems: 'center',
    justifyContent: 'center',
},

  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.eltrred,
  },

  title1: {
    paddingTop: 10,
    fontSize: 35,
    fontWeight: "bold",
    color: colors.eltrdarkblue,
    alignSelf: 'center',
    paddingBottom: 15,
    textDecorationLine: 'underline'
  },

  text: {
    fontSize: 18,
    paddingBottom: 20
  },

  allergy: {
    backgroundColor:colors.eltrred,
    fontSize: 20,
    fontWeight: "bold",
    color: colors.white,
    marginBottom:20    
  },
  tips: {
    fontSize: 25,
    fontWeight: "bold",
    color: colors.eltrgreen,
    textDecorationLine: 'underline'
  }
});
export default ChildFoodAbout;
