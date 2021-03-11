import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import firebase from 'firebase';

export default class LoadingScreen extends React.Component {
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.props.navigation.navigate(user ? 'App' : 'Auth')
    });
  };
  render() {
    return (
      <View style={[styles.container, styles.vertical]}>
        <Text style={{ color: '#fff' }}>Loading...</Text>
          <ActivityIndicator size='large' color='#fff' />
      </View>
    );
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#263237',
  },
  vertical: {
    flexDirection: 'column',
    padding: 10,
  },
});
