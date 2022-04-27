import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View ,TouchableOpacity} from 'react-native';
import { firestore } from './firebase';
export default function App() {
  let bool=false;
  const feed = () => { 
    bool = !bool;
    console.log("feed");
    firestore.collection("feeder").doc("feed").set({"isTrue":bool});
   }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Pet Feeder</Text>
      <StatusBar style="auto" />
      <View style={{flex:1,justifyContent:'center'}}>
      <TouchableOpacity style={{borderRadius:10,backgroundColor:'#ededed',padding:20}} onPress={feed}>
      <Text style={styles.button}>Feed</Text>
      </TouchableOpacity>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  header:{
    fontSize:30,
    fontWeight:"bold",
    color:"#000",
    marginTop:40

  }
});
