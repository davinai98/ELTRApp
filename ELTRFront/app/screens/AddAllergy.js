import React, {Component, useState} from "react";
import { StyleSheet, View, Text, Button, Alert, TextInput } from 'react-native';
import choices from "../config/options";
import AppPicker from "../components/AppPicker";

import AppText from "../components/AppText";
import Screen from "../components/Screen";
import colors from "../config/colors";
import sstore from "../utility/sstore";


const newArray = [];
//const allergy = allergyChoices[0];
//var last = allergyChoices[allergyChoices.length - 1]; //get last item in the array
const obj = choices.allergyChoices;
var label = obj[4].label;
const initialItems = [];
console.log(label);

//const allergyChoices = [];
//const array3 = [...allergyChoices, ...choices.allergyChoices];
//var allergyChoices = choices.allergyChoices;

export default class AddAllergy extends Component {    
  constructor(props) {
    
       super(props)
    
       this.state = {
    
        Holder:'',
    
       }
    
     }

AddItemsToArray=()=>{

  //Adding Items To Array.
  newArray.push( this.state.Holder.toString() );
  //sstore.store("6", this.state.Holder.toString());
  //setAllergies(updated);

  // Showing the complete Array on Screen Using Alert.
 /* Alert.alert(
    "Awesome! You have added:",
    newArray.toString(),
    [
      { text: "OK", onPress: () => console.log("OK Pressed") }
    ]
  );*/
}
    
getAllergies(){
  sstore.get("allergies").then(
    (keyValue) => {
      if (!keyValue) {
        initialItems = [];
        //console.log("if");

      } else {
        initialItems = keyValue;
        //console.log("else");

      }
      console.log("This is my items after");
      console.log(initialItems);
    },
    (error) => {
      console.log(error);
    }
  );
  const [allergies, setAllergies] = useState(initialItems);

}


//console.log(initialItems);
//array3 = [...newArray, ...allergyChoices];
  
 render() {
  //const allergy = allergyChoices[0];
   return (
      <View style={styles.MainContainer}>

          <TextInput
              
              placeholder="Enter Value here"
    
              onChangeText={TextInputValue => this.setState({ Holder : TextInputValue }) }
    
              style={{textAlign: 'center', marginBottom: 6, height: 45}}
          
          />
          <Button title="Click Here To Add Value To Array" onPress={this.AddItemsToArray} />
          <AppPicker
        placeholder="Add Allergy"
        items={newArray}
        onSelectItem={this.getItems}
   />
   </View>
    
   );
 }
}

const styles = StyleSheet.create({

  MainContainer :{
    justifyContent: 'center',
    margin: 15

  }

});
