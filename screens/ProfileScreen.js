import React, { Component } from 'react';
import { Button, StyleSheet, Text, View, Image } from 'react-native';
import Fire from '../Fire';

export default class ProfileScreen extends Component {
  state = {
    user: {}
  };

  unsubscribe = null;

  componentDidMount() {
    const user = this.props.uid || Fire.shared.uid;

    this.unsubscribe = Fire.shared.firestore
      .collection('users')
      .doc(user)
      .onSnapshot(doc => {
        this.setState({ user: doc.data() })
      });
  };

  componentWillUnmount() {
    this.unsubscribe()
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={{ marginTop: 64, alignItems: 'center' }}>
          <View style={styles.avatarContainer}>
            <Image
              style={styles.avatar}
              source={this.state.user.avatar
                ? { uri: this.state.user.avatar }
                : require('../assets/tempAvatar.png')
              }
            />
          </View>
          <Text style={styles.name}>Name: {this.state.user.name}</Text>
        </View>
        <View style={styles.statsContainer}>
          <View style={styles.stat}>
              <Text style={styles.statAmount}>21</Text>
              <Text style={styles.statTitle}>Posts</Text>
            </View>
          <View style={styles.stat}>
              <Text style={styles.statAmount}>981</Text>
              <Text style={styles.statTitle}>Followers</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statAmount}>63</Text>
            <Text style={styles.statTitle}>Following</Text>
          </View>
        </View>
        <Button
          title='Logoff'
          onPress={() => { Fire.shared.signOut() }}
        />
      </View>
    );
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#263237',
  },
  avatarContainer: {
    shadowColor: '#151734',
    shadowRadius: 30,
    shadowOpacity: 0.4
  },
  avatar: {
    width: 136,
    height: 136,
    borderRadius: 68,
  },
  name: {
    color: '#fff',
    marginTop: 24,
    fontSize: 16,
    fontWeight: '600'
  },
  statsContainer: {
    color: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 32
  },
  stat: {
    color: '#fff',
    alignItems: 'center',
    flex: 1
  },
  statAmount: {
    color: '#ffffff88',
    fontSize: 18,
    fontWeight: '300',
  },
  statTitle: {
    color: '#ffffffbb',
    fontSize: 12,
    fontWeight: '500',
  }
});
