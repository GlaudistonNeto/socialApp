import { StatusBar } from 'expo-status-bar';
import firebase from '../config/firebaseDefault';
import React from 'react';
import { Image, LayoutAnimation, StyleSheet, Text, View } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';

export default class LoadingScreen extends React.Component {
  static navigationOptions = {
    headerShown: false
  };

  state = {
    email: '',
    password: '',
    errorMessage: null,
  };

  handleLogin = () => {
    const {email, password} = this.state;

    firebase.auth()
      .signInWithEmailAndPassword(email, password)
      .catch(error => this.setState({ errorMessage: error.message }));
  };

  render() {
    LayoutAnimation.easeInEaseOut();
    return (
       <View style={styles.container}>
        <StatusBar barStyle='light-content'></StatusBar>

        <Image
          source={require('../assets/auth.jpg')}
          style={{ marginTop: -576,  marginLeft: -250 }}
        />

        <Image
          source={require('../assets/auth.jpg')}
          style={{ position: 'absolute',  bottom: -575 }}
        />

        <Image
          source={require('../assets/Hi.png')}
          style={{ marginTop: -30,  alignSelf: 'flex-start' }}
        />

        <Text style={styles.greating}>
          {'Welcome aboard.\nWelcome back'}
        </Text>

        <View style={styles.errorMessage}>
          {this.state.errorMessage && <Text style={styles.errorMessage}>
            {this.state.errorMessage}
          </Text>}
        </View>

        <View style={styles.form}>
          <View>
            <Text style={styles.inputTitle}>Email Address</Text>
            <TextInput
              style={styles.input}
              autoCapitalize='none'
              onChangeText={email => this.setState({ email })}
              value={this.state.email}
            />
          </View>

          <View style={{ marginTop: 32 }}>
            <Text style={styles.inputTitle}>Password</Text>
            <TextInput
              style={styles.input}
              autoCapitalize='none'
              secureTextEntry={true}
              onChangeText={password => this.setState({ password })}
              value={this.state.password}
            />
          </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={this.handleLogin}>
          <Text style={{ color: '#fff', fontWeight: '500' }}>Sign in</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ alignSelf: 'center', marginTop: 32 }}
          onPress={() => this.props.navigation.navigate('Register')}
        >
          <Text style={{ color: '#fff', fontSize: 13 }}>
            New to Social App? <Text style={{ color: '#ff2222', fontWeight: '500' }}>
              Sign up
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
    color: '#fff',
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
});
