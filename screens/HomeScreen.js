import React, { Component } from 'react';
import {
  TouchableOpacity,
  LayoutAnimation,
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
} from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import moment from 'moment';

// temporary data until we pull from Firebase
posts = [
  {
    id: '1',
    name: 'Joe McKay',
    text: 'Sed sodales sagittis dui luctus consequat. Pellentesque volutpat ac metus quis euismod. Cras et nisi vel sapien suscipit consequat. In dapibus cursus enim, in malesuada tellus ultricies eu. Maecenas fringilla ipsum sollicitudin ligula facilisis venenatis. Sed at lorem lobortis, lacinia nunc non, luctus augue. Donec eros orci, ullamcorper a tempor at, maximus a est.',
    timestamp: 1569109273726,
    avatar: require('../assets/tempAvatar.png'),
    image: require('../assets/Hi.png')
  },
  {
    id: '2',
    name: 'Kareem Abdul Jabbar',
    text: 'Fusce cursus neque a rhoncus vestibulum. Quisque et libero eros. Aliquam sed velit scelerisque, luctus odio a, sodales lacus. Nulla pellentesque urna eget tincidunt varius. Aliquam accumsan lacinia nunc, nec viverra ex fringilla non. Proin tincidunt iaculis ornare. Fusce id hendrerit eros. In non eleifend tortor, sit amet elementum quam. Mauris placerat, purus ac rhoncus gravida, orci tellus tempus psum, eu aliquam neque leo quis lectus. Cras ac lectus scelerisque, tincidunt lectus ac, maximus felis. Praesent venenatis egestas viverra. Duis nec turpis felis',
    timestamp: 1569109273726,
    avatar: require('../assets/tempAvatar.png'),
    image: require('../assets/Hi.png')
  },
  {
    id: '3',
    name: 'Emerson Parson',
    text: 'In porttitor et ligula eget molestie. Pellentesque rutrum at risus ut laoreet. Nulla ut sodales lorem. In fermentum vulputate tellus ac efficitur. Etiam lobortis nulla in imperdiet finibus. In pharetra vel arcu at sodales. Suspendisse mauris purus, pulvinar et blandit a, commodo ac ex. Pellentesque velit lorem, viverra vitae lectus et, laoreet convallis nibh. Nullam condimentum enim id ligula pellentesque egestas. Donec nunc augue, volutpat at accumsan eget, ultricies mattis mi. Pellentesque finibus vehicula elit quis sagittis.',
    timestamp: 1569109273726,
    avatar: require('../assets/tempAvatar.png'),
    image: require('../assets/Hi.png')
  },
  {
    id: '4',
    name: 'Kathie Halone',
    text: 'Aenean ornare enim ut porttitor tincidunt. Donec non vulputate odio. Duis id nisi in ligula rutrum laoreet. Sed at placerat enim, eu pellentesque eros. Morbi id mi quis ipsum luctus facilisis. Morbi tempus, ex nec accumsan dignissim, mi nisl imperdiet tortor, at aliquam ipsum diam a nisl. Fusce lobortis elementum nunc, aliquam dapibus orci accumsan ac. Maecenas malesuada urna eros, semper ultricies dolor congue sed. Suspendisse vitae eleifend arcu, sed tempor ligula. Sed vel libero ante.',
    timestamp: 1569109273726,
    avatar: require('../assets/tempAvatar.png'),
    image: require('../assets/Hi.png')
  }
];

export default class HomeScreen extends Component {
  rederPost = post => {
    return (
      <View style={styles.feedImage}>
        <Image
          source={post.avatar}
          style={styles.avatar}
        />
        <View style={{ flex: 1 }}>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            <View>
              <Text style={styles.name}>{post.name}</Text>
              <Text style={styles.timestamp}>{moment(post.timestamp).fromNow()}</Text>
            </View>
            <Feather
              name='more-horizontal'
              size={24}
              color='#73788b'
            />
          </View>

          <Text style={styles.posts}>{post.text}</Text>
            
          <Image
            source={post.image}
            style={styles.postImage}
            resizeMode= 'cover'
          />

          <View style={{ flexDirection: 'row', }}>
            <Ionicons
              name='ios-heart-circle-outline'
              size={24}
              color='#ebecf4'
              style={{ marginRight: 16 }}
            />
            <Ionicons
              name='ios-chatbubbles'
              size={24}
              color='#ebecf4'
            />
          </View>
        </View>
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Feed</Text>
        </View>

        <FlatList
          style={styles.feed}
          data={posts}
          renderItem={({ item }) => this.rederPost(item)}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
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
  header: {
    paddingTop: 64,
    paddingBottom: 16,
    backgroundColor: '#efecf4',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor:'#ebecf4',
    shadowColor: '#fff',
    shadowOffset: {height: 5},
    shadowRadius: 15,
    shadowOpacity: 0.2,
    zIndex: 10,
  }, 
  headerTitle: {
    fontSize: 20,
    fontWeight: '500',
  },
  feed: {
    marginHorizontal: 16
  },
  feedImage: {
    backgroundColor: '#d2d2d2',
    borderRadius: 5,
    padding: 8,
    flexDirection: 'row',
    marginVertical: 8,
  }, 
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 16
  },
  name: {
    fontSize: 15,
    fontWeight: '500',
    color: '#454d65'
  },
  timestamp: {
    fontSize: 11,
    color: '#ff5500',
    marginTop: 4,
  },
  post: {
    marginTop: 16,
    fontSize: 14,
    color: '#838899'
  },
  postImage: {
    width: undefined,
    height: 150,
    borderRadius: 5,
    marginVertical: 16,
  },
});
