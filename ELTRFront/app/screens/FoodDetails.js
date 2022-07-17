import React, { useEffect, useState } from "react";
import { StyleSheet, View, Image, ScrollView } from "react-native";

import Screen from "../components/Screen";
import AppText from "../components/AppText";
import colors from "../config/colors";
import check from "../utility/check";

function FoodDetails({ route }) {
  const [allergic, setAllergic] = useState(null);
  const [condition, setCondition] = useState(null);
  const food = route.params;
  const status = food.status;
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
  /*
  When a user scans an item, the following should happen in regards to ALLERGIES:
  
  1. retrieve the ingredient list from the item (done)
  2. retrieve the user's allergies from asyncstorage
  3. check if any ingredients in the item match a user's allergies THIS SHOULD BE CASE INSENSITIVE
  4. If there is a match, tell the user DO NOT EAT THIS
  */
  /*

    var allergyText = "Warning! This product contains the allergens: ";
    var conditionText = "Warning! This product contains which may conflict with your medication or condition: ";

    function addToList(value){
      if(allergens.includes(value)){
        allergyText += ",";
        allergyText += value;
        console.log(value)
        }
      }

  //Goes through the ingredients.
    try {
    var ingredientArr = ingredients.split(/[\s, ]+/);
        ingredientArr.forEach(function (ingredient) {
          if(allergens.includes(ingredient)){
            allergyText += ",";
            allergyText += ingredient;
            console.log(ingredient);
            }
        });
    }
    
    catch(err){
      var ingredientArr = "No Ingredients";
    }
  */

  /*
  for (var i = 0; i < ingredientArr.length; i++){
    var obj = ingredientArr[i];
    for (var x = 0 ; x < allergens.length; x++){
	  
      //compare allergies
      if (obj == (allergens[x])){
          //add
	      allergyText += ",";
	      allergyText += obj; //add allergen to product warning text
	    }
    }
  }
*/

  // compare CONDITIONS
  /*
    for (var y = 0 ; y < conditions.length; y++){
      //compare
 
	if (obj == (conditions[y])){
	  //add
	  conditionText += ",";
	  conditionText += obj;
	  }
        }
    for (var z = 0 ; z < (tips array); z++){
         //compare/output?
      }
    }
  }
  
  allergyText += ".";
  conditionText += ".";
  
  if (allergyText.length < 49) {
    allergyText = "";
  }
  */

  return (
    <ScrollView style={styles.scroll}>
      <Screen style={styles.foodContainer}>
        {image ? (
          <Image
            source={{ uri: food.product.image_small_url }}
            style={{
              height: 250,
              width: 250,
              borderColor: colors.primary,
              borderWidth: 8,
              marginBottom: 20,
            }}
          />
        ) : (
          <AppText style={styles.noImage}>
            Sorry, we couldn't find an image for this product.
          </AppText>
        )}

        <View style={styles.foodInfo}>
          {status ? (
            <AppText style={styles.Name}>{food.product.product_name}</AppText>
          ) : (
            <AppText>Sorry, we can't find that item!</AppText>
          )}
          {allergic ? (
            <>
              <AppText style={styles.Warn}>
                Warning! You are allergic to the following ingredients in this
                food:
              </AppText>
              <AppText>{allergic}</AppText>
            </>
          ) : null}
          {condition ? (
            <>
              <AppText style={styles.Warn}>{condition}</AppText>
            </>
          ) : null}
          {status && food.product.ingredients_text ? (
            <>
              <AppText style={styles.Warn}>Ingredients: </AppText>
              <AppText>{food.product.ingredients_text}</AppText>
            </>
          ) : null}
          {traces ? (
            <>
              <AppText style={styles.Warn}>May also contain traces of:</AppText>
              <AppText style={styles.text}>{food.product.traces}.</AppText>
            </>
          ) : null}
        </View>
      </Screen>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  scroll: {
    backgroundColor: colors.light,
  },
  foodContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.light,
  },
  foodInfo: {
    padding: 15,
  },
  Name: {
    fontSize: 25,
    fontWeight: "bold",
    color: colors.primary,
  },
  Warn: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.eltrred,
  },
  text: {
    fontSize: 18,
    paddingBottom: 20,
  },
  noImage: {
    fontSize: 12,
    color: colors.eltrgreen,
  },
});

export default FoodDetails;