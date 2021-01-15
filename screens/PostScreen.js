import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  TextInput,
 } from 'react-native';
 import { Ionicons } from "@expo/vector-icons";
 import Constants from "expo-constants";
 import * as Permissions from "expo-permissions";
 import * as ImagePicker from "expo-image-picker";
 import Fire from '../Fire';

 const firebase = require("firebase");
 require("firebase/firestore");

export default class PostScreen extends React.Component {
  state = {
    text: "",
    image: null,
  };

  componentDidMount() {
    this.getPhotoPermission();
  }

  getPhotoPermission = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions
        .askAsync(Permissions.CAMERA);

      if (status != 'granted') {
        alert("We need permission to access your camera");
      }
    }
  };

  handlePost = () => {
    Fire.shared
      .addPost(
        { text: this.state.text.trim(), localUri: this.state.image }
      )
      .then(ref => {
        this.setState({ text: "", image: null });
        this.props.navigation.goBack();
      })
      .catch(error => {
        alert(error);
      });
  };

  pickImage = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    };
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => this.props.navigation.goBack()}
          >
            <Ionicons
              name="md-arrow-back-circle"
              size={24}
              color="#D8D9DB"
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.handlePost}
          >
            <Text style={{ fontWeight: "500", }}>Post</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.inputContainer}>
          <Image
            source={require("../assets/tempAvatar.png")}
            style={styles.avatar}
          />
          <TextInput
            autoFocus={true}
            multiline={true}
            numberOfLines={4}
            style={{ flex: 1 }}
            placeholder="Want to share something?"
            onChangeText={text => this.setState({ text })}
            value={this.state.text}
          />
        </View>

        <TouchableOpacity style={styles.photo}
          onPress={this.pickImage}
        >
        <Ionicons
              name="md-camera-sharp"
              size={32}
              color="#D8D9DB"
            />
        </TouchableOpacity>

        <View style={{
          marginHorizontal: 32,
          marginTop: 32,
          height: 150,
        }}>
        <Image
          source={{ uri: this.state.image }}
          style={{ width: "100%", height: "100%" }}
        />
        </View>
      </SafeAreaView>
    );
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#D8D9D8"
  },
  inputContainer: {
    margin: 32,
    flexDirection: "row",    
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 16,
  },
  photo: {
    alignItems: "flex-end",
    marginHorizontal: 32,
  },
});
