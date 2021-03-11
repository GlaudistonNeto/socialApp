import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  TextInput,
  RefreshControl
} from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import Fire from '../Fire';
import UserPermissions from '../utilities/UserPermissions';

export default class PostScreen extends Component {
  state = {
    text: '',
    image: null
  };

  componentDidMount() {
    UserPermissions.getCameraPermission()
  };

  handlePost = () => {
    Fire.shared
    .addPost({ text: this.state.text.trim(), localUri: this.state.image })
    .then(ref => {
      this.setState({ text: '', image: null });
      this.props.navigation.goBack();
    })
    .catch(error => {
      alert(error);
    });
  };

  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1]
    });

    if (!RefreshControl.cancelled) {
      this.setState({ image: result.uri });
    }
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <Ionicons name='md-arrow-back' size={24} color='#fff' />
          </TouchableOpacity>

          <TouchableOpacity onPress={this.handlePost}>
            <Text style={{ fontWeight: '500', color:'#fff' }}>Post</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.inputContainer}>
          <Image
            source={require('../assets/tempAvatar.png')}
            style={styles.avatar}
          />
          <TextInput
            autoFocus={true}
            multiline={true}
            numberOfLines={4}
            style={{ flex: 1 }}
            placeholder='want to share something?'
            onChangeText={text => this.setState({ text })}
            value={this.state.text}
          />
        </View>

        <TouchableOpacity style={styles.photo} onPress={this.pickImage}>
          <Ionicons
            name='md-camera'
            size={32}
            color='#d8d9db'
          />
        </TouchableOpacity>

        <View style={{ marginHorizontal: 32, marginTop: 32, height: 150 }}>
          <Image
            source={{ uri: this.state.image }}
            style={{ width: '100%', height: '100%' }}
          />
        </View>
      </SafeAreaView>
    );
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#263237',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#bc8343',
  },
  inputContainer: {
    margin: 32,
    flexDirection: 'row',

  }, avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 16,
  },
  photo: {
    alignItems: 'flex-end',
    marginHorizontal: 32,
  },
});
