import sstore from "../utility/sstore";
import Firebase from "../config/firebase";

//helper function to get a users allergens
const getAllergens = async (allergyKey) => {
  return await sstore.get(allergyKey);
};

//helper function to get a users conditions
const getConditions = async (conditionKey) => {
  return await sstore.get(conditionKey);
};

//function to check for allergens in a food product

const checkAllergens = async (ingredientsText, traces, contains) => {
  //get user from firebase
  const currentID = Firebase.auth().currentUser.uid;
  //build keys for allergies and conditions from user id
  const allergyKey = currentID + "allergies";
  const userAllergies = await getAllergens(allergyKey);

  //make sure everything is lowercase
  ingredientsText = ingredientsText.toLowerCase();
  traces = traces.toLowerCase();

  //this is where any found allergies will go
  let foundAllergies = [];
  let conditionWarnings = [];

  for (let index = 0; index < userAllergies.length; index++) {
    const element = userAllergies[index].label.toLowerCase();
    if (ingredientsText.includes(element) || traces.includes(element)) {
      foundAllergies.push(element);
    }
  }

  const allergyText = foundAllergies.join(", "); //this makes it into a nice comma delimited list
  return allergyText;
};

//function to check for ingredients that may be bad for someone with a given condition

const checkConditions = async (foodItem) => {
  //get user from firebase
  const currentID = Firebase.auth().currentUser.uid;
  //build keys for allergies and conditions from user id
  const conditionKey = currentID + "conditions";
  const userConditions = await getConditions(conditionKey);
  let conditionText = "";
  for (let index = 0; index < userConditions.length; index++) {
    const element = userConditions[index].label;
    console.log(element);
    if (element == "Cancer") {
      console.log("This user has cancer");
      conditionText = conditionText + cancerCheck(foodItem).join(", ");
    }
    if (element == "IBS") {
      conditionText = conditionText + ibsCheck(foodItem).join(", ");
    }
    if (element == "Heart Disease") {
      conditionText = conditionText + hdCheck(foodItem).join(", ");
    }
	if (element == "ADHD") {
	  conditionText = conditionText + adhdCheck(foodItem).join(", ");
	}
  }
  return conditionText;
};

var warn = "";
const adhdCheck = (foodItem) => {
  let conditionWarnings = [];
	console.log(foodItem);
	/*if (foodItem["red 40"] == true){
	 warn = "this food contains the dye red 40"	
	 conditionWarnings.push(warn);
	}
	if (foodItem["blue 2"] == true){
	 warn = "this food contains the dye blue 2"	
	 conditionWarnings.push(warn);
	}
	if (foodItem["yellow 5"] == true){
	 warn = "this food contains the dye yellow 5"	
	 conditionWarnings.push(warn);
	}
	if (foodItem["yellow 6"] == true){
	 warn = "this food contains the dye yellow 6"	
	 conditionWarnings.push(warn);
	}*/
	if (foodItem.sugars_100g > 20) {
     warn = "this food is high in sugar";
     conditionWarnings.push(warn);
    }
	return conditionWarnings;
};
	
const cancerCheck = (foodItem) => {
  //First check for things to avoid'
  let conditionWarnings = [];
  console.log(foodItem);
  //check levels of sugar
  if (foodItem.sugars_100g > 20) {
    console.log("this food is high in sugar");
    warn = "this food is high in sugar";
    conditionWarnings.push(warn);
  }
  //check levels of lactose
  if (foodItem.lactose_100g > 0) {
    warn = "this food contains lactose";
    conditionWarnings.push(warn);
  }
  //check levels of sodium
  if (foodItem.sodium_100g > 0.2) {
    warn = "this food is high in sodium";
    conditionWarnings.push(warn);
  }

  //Now check for good things
  //check omega 3
  if (foodItem["omega-3-fat_100g"] > 0.35) {
    warn = "this food is high in omega 3's";
    conditionWarnings.push(warn);
  }
  //check fruits, veggies, and nuts
  if (foodItem["fruits-vegetables-nuts-estimate-from-ingredients_100g"] > 0) {
    warn = "this food contains fruits, veggies or nuts";
    conditionWarnings.push(warn);
  }

  //check vitamin A
  if (foodItem["vitamin-a_100g"] > 0) {
    warn = "this food contains vitamin A";
    conditionWarnings.push(warn);
  }

  //check protein
  if (foodItem.proteins_serving > 5) {
    warn = "this food is high in protein";
    conditionWarnings.push(warn);
  }

  //check calcium
  if (foodItem.calcium_100g > 0.12) {
    warn = "this food is high in calcium";
    conditionWarnings.push(warn);
  }

  //check potassium
  if (foodItem.potassium_100g > 0.3) {
    warn = "this food is high in potassium";
    conditionWarnings.push(warn);
  }

  //check fiber
  if (foodItem.fiber_100g > 6) {
    warn = "this food is high in fiber";
    conditionWarnings.push(warn);
  }

  //check vitamin D
  if (foodItem["vitamin-d_100g"] > 0) {
    warn = "this food contains vitamin D";
    conditionWarnings.push(warn);
  }

  //check vitamin C
  if (foodItem["vitamin-c_100g"] > 0) {
    warn = "this food contains vitamin C";
    conditionWarnings.push(warn);
  }
  return conditionWarnings;
};

const ibsCheck = (foodItem) => {
  //First check for things to avoid
  let conditionWarnings = [];
  console.log(foodItem);
  //check levels of lactose
  if (foodItem.lactose_100g > 0) {
    warn = "this food contains lactose";
    conditionWarnings.push(warn);
  }
  //check for gluten
  //allergens?

  //check levels of sodium
  if (foodItem.sodium_100g > 0.2) {
    warn = "this food is high in sodium";
    conditionWarnings.push(warn);
  }

  //Now check for good things
  //check monounsaturated_fat
  if (foodItem["monounsaturated-fat_100g"] > 17) {
    warn = "this food is high in monounsaturated fat";
    conditionWarnings.push(warn);
  }
  //check vitamin B6
  if (foodItem["vitamin-b6_100g"] > 0) {
    warn = "this food contains vitamin B6";
    conditionWarnings.push(warn);
  }

  //check vitamin A
  if (foodItem["vitamin-a_100g"] > 0) {
    warn = "this food contains vitamin A";
    conditionWarnings.push(warn);
  }

  //check protein
  if (foodItem.proteins_100g > 5) {
    warn = "this food is high in protein";
    conditionWarnings.push(warn);
  }

  //check fiber
  if (foodItem.fiber_100g > 6) {
    warn = "this food is high in fiber";
    conditionWarnings.push(warn);
  }

  //check vitamin C
  if (foodItem["vitamin-c_100g"] > 0) {
    warn = "this food contains vitamin C";
    conditionWarnings.push(warn);
  }
  return conditionWarnings;
};

const hdCheck = (foodItem) => {
  //First check for things to avoid
  let conditionWarnings = [];
  console.log(foodItem);
  //check levels of sucrose
  if (foodItem.sugars_100g > 20) {
    warn = "this food is high in sugar";
    conditionWarnings.push(warn);
  }

  //check levels of cholesterol
  if (foodItem.cholesterol_100g > 0.2) {
    warn = "this food is high in cholesterol";
    conditionWarnings.push(warn);
  }

  //check levels of saturated fat
  if (foodItem["saturated-fat_100g"] > 5) {
    warn = "this food is high in saturated fat";
    conditionWarnings.push(warn);
  }

  //check sodium levels
  if (foodItem.sodium_100g > 0.2) {
    warn = "this food is high in sodium";
    conditionWarnings.push(warn);
  }

  //Now check for good things
  //check omega 3
  if (foodItem["omega-3-fat_100g"] > 0.35) {
    warn = "this food is high in omega 3's";
    conditionWarnings.push(warn);
  }

  //check fruits, veggies, and nuts
  if (foodItem["fruits-vegetables-nuts-estimate-from-ingredients_100g"] > 0) {
    warn = "this food contains fruits, veggies or nuts";
    conditionWarnings.push(warn);
  }

  //check vitamin A
  if (foodItem["vitamin-a_100g"] > 0) {
    warn = "this food contains vitamin A";
    conditionWarnings.push(warn);
  }

  //check protein
  if (foodItem.proteins_100g > 5) {
    warn = "this food is high in protein";
    conditionWarnings.push(warn);
  }

  //check calcium
  if (foodItem.calcium_100g > 0.12) {
    warn = "this food is high in calcium";
    conditionWarnings.push(warn);
  }

  //check potassium
  if (foodItem.potassium_100g > 0.3) {
    warn = "this food is high in potassium";
    conditionWarnings.push(warn);
  }

  //check fiber
  if (foodItem.fiber_100g > 6) {
    warn = "this food is high in fiber";
    conditionWarnings.push(warn);
  }

  //check vitamin D
  if (foodItem.vitamin_d_100g > 0) {
    warn = "this food contains vitamin D";
    conditionWarnings.push(warn);
  }

  //check vitamin C
  if (foodItem["vitamin-c_100g"] > 0) {
    warn = "this food contains vitamin C";
    conditionWarnings.push(warn);
  }

  //check vitaminB6
  if (foodItem["vitamin-b6_100g"] > 0) {
    warn = "this food contains vitamin B6";
    conditionWarnings.push(warn);
  }
  return conditionWarnings;
};

export default {
  checkAllergens,
  checkConditions,
};