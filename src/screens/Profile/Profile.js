import {StyleSheet, View, Image} from 'react-native';
import React from 'react';
import {Container, Text} from '../../components/elements';
import {useSelector} from 'react-redux';
import {useTheme} from '@react-navigation/native';
const Profile = () => {
  const {user} = useSelector(state => state.userReducer);
  const {colors} = useTheme();
  return (
    <Container style={styles.container}>
      <View style={styles.imageContainer}>
        <Image style={styles.imageStyle} source={{uri: user.image}} />
      </View>
      <Text isCenter hasMargin isHeadingTitle>
        Profile
      </Text>
      <Text isCenter hasMargin isHeadingTitle>
        First Name: {user.firstName}
      </Text>
      <Text isCenter hasMargin isHeadingTitle>
        Last Name: {user.lastName}
      </Text>
    </Container>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    alignItems: 'center',
  },
  imageStyle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 1,
  },
});
