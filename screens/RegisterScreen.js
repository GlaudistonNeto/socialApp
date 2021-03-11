import { StatusBar } from 'expo-status-bar';
import Fire from '../Fire';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import UserPermissions from '../utilities/UserPermissions';
import * as ImagePicker from 'expo-image-picker';

export default class RegisterScreen extends React.Component {
  static navigationOptions = {
    headerShown: false
  };

  state = {
    user: {
      name: '',
      email: '',
      password: '',
      avatar: null
    },
    errorMessage: null,
  };

  handlePickAvatar = async () => {
    UserPermissions.getCameraPermission();

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1]
    });

    if (!result.cancelled) {
      this.setState({ user: { ...this.state.user, avatar: result.uri } })
    };
  };

  handleSignUp = () => {
    Fire.shared.createUser(this.state.user);
  };

  render() {
    return (
      <View style={styles.container}>
      <StatusBar barStyle='light-content' />

      <Image
          source={require('../assets/auth.jpg')}
          style={{ marginTop: -576,  marginLeft: -250, position: 'relative' }}
        />

      <Image
        source={require('../assets/auth.jpg')}
        style={{ position: 'absolute',  bottom: -550 }}
      />

      <TouchableOpacity style={styles.back}
        onPress={() => this.props.navigation.goBack()}
      >
        <Ionicons name='ios-arrow-back-circle' size={32} color='#fff' />
      </TouchableOpacity>

      <View
        style={{ position: 'absolute', top: 14, alignItems: 'center', width: '100%' }}>
      <Text style={styles.greating}>
        {'Welcome aboard.\nSign up to get startd'}
      </Text>
      <TouchableOpacity style={styles.avatarPlaceholder} onPress={this.handlePickAvatar}>
      <Image
        source={{ uri: this.state.user.avatar }}
        style={styles.avatar}
      />
        <Ionicons
          name='ios-add-circle-outline'
          size={150} color='#fff'
          style={{ marginTop: 1, marginLeft: -10 }}
        />
      </TouchableOpacity>
      </View>


        <View style={styles.errorMessage}>
          {this.state.errorMessage && <Text style={styles.errorMessage}>
            {this.state.errorMessage}
          </Text>}
        </View>

        <View style={styles.form}>
          <View>
            <Text style={styles.inputTitle}>Full Name</Text>
            <TextInput
              style={styles.input}
              autoCapitalize='none'
              onChangeText={name => this.setState({ user: {...this.state.user, name} })}
              value={this.state.user.name}
            />
          </View>

          <View>
            <Text style={styles.inputTitle}>Email Address</Text>
            <TextInput
              style={styles.input}
              autoCapitalize='none'
              onChangeText={email => 
                this.setState({ user: {...this.state.user, email} })}
              value={this.state.user.email}
            />
          </View>

          <View style={{ marginTop: 32 }}>
            <Text style={styles.inputTitle}>Password</Text>
            <TextInput
              style={styles.input}
              autoCapitalize='none'
              secureTextEntry={true}
              onChangeText={password =>
                this.setState({ user: {...this.state.user, password} })}
              value={this.state.user.password}
            />
          </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={this.handleSignUp}>
          <Text style={{ color: '#fff', fontWeight: '500' }}>Sign up</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{ alignSelf: 'center', marginTop: 42 }}>
          <Text
            style={{ color: '#fff', fontSize: 13 }}
            onPress={() => this.props.navigation.navigate('Login')}
          >
            New to Social App? <Text style={{ color: '#ff2222', fontWeight: '500' }}>
              Login
            </Text>
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#263237',
  },
  greating: {
    color: '#000000dd',
    marginTop: 32,
    fontSize: 18,
    fontWeight: '400',
    textAlign: 'center'
  },
  errorMessage: {
    color: '#ff222266',
    height: 72,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 30
  },
  error: {
    color: '#e9446a',
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
  },
  form: {
    marginBottom: 48,
    marginHorizontal: 30,
  },
  inputTitle: {
    color: '#156cc5',
    fontSize: 10,
    textTransform: 'uppercase',
  }, input: {
    borderBottomColor: '#ff2222',
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: 40,
    fontSize: 15,
    color: '#7cdcfe'
  },
  button: {
    marginHorizontal: 30,
    backgroundColor: '#e9446a',
    borderRadius: 4,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
  },
  back: {
    top: -10,
    position: 'relative',
    left: 10
  },
  avatar: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 50,
  },
  avatarPlaceholder: {
    width: 120,
    height:120,
    backgroundColor: '#e1e2e6',
    borderRadius: 50,
    marginTop: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
