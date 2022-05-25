import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  Image,
  Pressable,
} from "react-native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { firestore, storage } from "./firebase";
import { Alert } from "react-native-web";

export default function MyTabs() {
  const Tab = createBottomTabNavigator();

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Pet"
          component={HomeScreen}
          options={{
            tabBarStyle: { paddingBottom: 5, height: 60 },
            tabBarLabel: "Pet",
            headerShown: false,
            tabBarActiveBackgroundColor: "#eee9ff",
            tabBarActiveTintColor: "#784498",
            tabBarLabelStyle: {
              fontSize: 15,
              fontWeight: "bold",
              paddingBottom: 0,
            },
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="paw-outline" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarStyle: { paddingBottom: 5, height: 60 },
            tabBarLabel: "Profile",
            headerShown: false,
            tabBarActiveTintColor: "#784498",
            tabBarActiveBackgroundColor: "#eee9ff",
            tabBarLabelStyle: { fontSize: 15, fontWeight: "bold" },
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person-outline" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
function HomeScreen() {
  const [lastestImageUrl, setLastestImageUrl] = React.useState(null);
  let bool = false;
  /* Detect the camera took a picture through pi sensor */
  useEffect(() => {
    firestore
      .collection("feeder")
      .doc("camera")
      .onSnapshot((doc) => {
        if (doc.exists) {
          const { imageRef, camera } = doc.data();
          if (camera) {
            storage
              .ref(imageRef)
              .getDownloadURL()
              .then((url) => {
                setLastestImageUrl(url);
              });
          } else {
            Alert.alert("No camera detected");
          }
        }
      });
  }, []);
  const feed = () => {
    bool = !bool;
    console.log("feed");
    firestore.collection("feeder").doc("feed").set({ isTrue: bool });
  };
  const handleCamera = () => {
    console.log("Take Picture");
    firestore
      .collection("feeder")
      .doc("camera")
      .set({ camera: false }, { merge: true })
      .then(() => {});
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Pet Feeder</Text>
      <StatusBar style="auto" />
      <View style={{ flex: 1, justifyContent: "flex-end" }}>
        <TouchableOpacity
          style={{
            borderRadius: 10,
            backgroundColor: "#cfb7ec",
            padding: 20,
            shadowColor: "#470000",
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.7,
            marginBottom: 25,
            elevation: 20,
            borderColor: "#784498",
            borderWidth: 1,
          }}
          onPress={feed}
        >
          <Text style={styles.button}>Feed Me 😻</Text>
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1, justifyContent: "flex-start" }}>
        <TouchableOpacity
          onPress={handleCamera}
          style={{
            borderRadius: 10,
            backgroundColor: "#cfb7ec",
            padding: 20,
            shadowColor: "#470000",
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.7,
            elevation: 20,
            borderColor: "#784498",
            borderWidth: 1,
          }}
        >
          <Text style={styles.button}>Take picture 📸</Text>
        </TouchableOpacity>
      </View>
    { lastestImageUrl&&   <View style={{width:'100%',height:'50%',justifyContent:'center',alignItems:'center',}}>

       <Image source={{ uri:lastestImageUrl}} style={styles.image} />
        <TouchableOpacity 
        onPress={()=>{setLastestImageUrl(null)}}
        style={{position:'absolute', top:25,right:30}}>
        <Ionicons name="close" color="red" size={35} />
        </TouchableOpacity>
      </View>}
        
    </View>
  );
}

function ProfileScreen() {


  return (
    <SafeAreaProvider style={styles.container3}>
      <ImageBackground
        source={{
          uri: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
        }}
        resizeMode="cover"
        style={styles.backgroundImg}
      >
        <Image
          style={styles.profileImg}
          source={{
            uri: "https://avatars.githubusercontent.com/u/73957984?v=4",
          }}
        />
        {/* <TouchableOpacity style={styles.settings}>
          <Icon name="more" size={30} color="black" />
        </TouchableOpacity> */}
      </ImageBackground>

      <Text style={styles.name}>Zafer Barış</Text>
      <Text style={styles.bio}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
          marginTop: 5,
          marginHorizontal: 100,
        }}
      ></View>
      <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
        <View style={styles.card}>
          <Text style={styles.favoritesTxt}>Next Feed Time</Text>
          <Text style={styles.favoritesNo}>19.00</Text>
        </View>
      </View>

      <View style={styles.container2}>
        <Pressable
          style={styles.button2}
          onPress={() => console.log("pressed")}
          android_ripple={{ color: "red" }}
        >
          <Text style={styles.buttonText}>Log out</Text>
        </Pressable>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  header: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#000",
    marginTop: 40,
  },
  button: {
    fontSize: 20,
  },
  container2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button2: {
    borderRadius: 8,
    padding: 6,
    height: 50,
    width: "70%",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    backgroundColor: "#fff",
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 16,
    color: "black",
  },
  container3: {
    flex: 1,
  },
  backgroundImg: {
    width: "100%",
    height: 150,
  },
  profileImg: {
    alignSelf: "center",
    position: "absolute",
    bottom: -60,
    width: 120,
    height: 120,
    borderColor: "white",
    borderWidth: 4,
    borderRadius: 40,
  },
  name: {
    alignSelf: "center",
    fontSize: 20,
    marginTop: 65,
    fontWeight: "bold",
    color: "black",
  },
  bio: {
    alignSelf: "center",
    textAlign: "center",
    padding: 5,
    paddingHorizontal: 50,
    fontSize: 14,

    color: "#7e7b8c",
  },
  follow: {
    fontSize: 12,
    color: "#7e7b8c",
  },
  followNo: {
    fontSize: 18,
    alignSelf: "center",
    fontWeight: "bold",
    color: "#7e7b8c",
  },
  settings: {
    position: "absolute",
    bottom: -125,
    left: "88%",
    width: 120,
    height: 120,
  },
  favoritesTxt: {
    fontSize: 15,
    color: "black",
    alignSelf: "center",
  },
  favoritesNo: {
    fontSize: 27,
    alignSelf: "center",
    fontWeight: "bold",
    color: "black",
  },
  card: {
    backgroundColor: "white",
    borderRadius: 8,
    paddingVertical: 10,
    width: "45%",
    marginVertical: 10,
    elevation: 10,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  image:{
    width: "85%",
    height: "85%",
    padding:10
  }
});
