import {StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {Container, Text} from '../../components/elements';
import {COLORS} from '../../../constants/theme';
import {useSelector} from 'react-redux';
import {useTheme} from '@react-navigation/native';
const Profile = ({navigation}) => {
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

      <View style={styles.userInfo}>
        <Text hasMargin isHeadingTitle>
          First Name: {user.firstName}
        </Text>
        <Text hasMargin isHeadingTitle>
          Last Name: {user.lastName}
        </Text>
        <Text hasMargin isHeadingTitle>
          Email: {user.email}
        </Text>
      </View>
      <View style={styles.btnContainer}>
        <TouchableOpacity
          style={styles.signInbtn}
          onPress={() => navigation.navigate('SignInScreen')}>
          <Text isCenter hasMargin isHeadingTitle>
            Sign In
          </Text>
        </TouchableOpacity>
      </View>
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
  signInbtn: {
    padding: 20,
    backgroundColor: COLORS.primary,
    width: 100,
    borderRadius: 10,
  },
  btnContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  userInfo: {
    paddingLeft: 20,
  },
});
