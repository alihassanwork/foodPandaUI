import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {Container} from '../../components/elements';
import {useTheme} from '@react-navigation/native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
//redux
import {useSelector, useDispatch} from 'react-redux';
import {setUserProfile} from '../../../redux/actions';
const ImageUploader = () => {
  const {colors} = useTheme();
  const [resourcePath, setResourcePath] = React.useState(null);
  //Select Image
  //redux
  const {user} = useSelector(state => state.userReducer);

  const dispatch = useDispatch();
  const handleSetProfile = image => dispatch(setUserProfile(image));
  //redux end
  const selectImage = () => {
    var options = {
      cameraType: 'back',
      quality: 0.75,
      saveToPhotos: true,
    };
    launchCamera(options, res => {
      if (res.didCancel) {
        console.log('User cancelled image picker');
      } else if (res.error) {
        console.log('ImagePicker Error: ', res.error);
      } else if (res.customButton) {
        console.log('User tapped custom button: ', res.customButton);
        alert(res.customButton);
      } else {
        let source = res.assets[0].uri;
        handleSetProfile(source);
      }
    });
  };
  console.log(user);

  return (
    <Container style={styles.container}>
      <Text style={[styles.heading, {color: colors.text}]}>ImageUploader</Text>
      <View style={styles.imageContainer}>
        <Image
          style={[styles.image, {borderColor: colors.text}]}
          source={{
            uri: user.image
              ? user.image
              : 'https://gravatar.com/avatar/4bd8a7954f4978b3d04c39af4e5bd4d2?s=400&d=robohash&r=x',
          }}
        />
      </View>
      <View style={styles.btnContainer}>
        <TouchableOpacity
          onPress={() => selectImage()}
          style={[styles.selectImage, {backgroundColor: colors.text}]}>
          <Text style={[styles.heading, {color: colors.card}]}>
            Select File
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.selectImage, {backgroundColor: colors.text}]}>
          <Text style={[styles.heading, {color: colors.card}]}>
            Launch Camera directly
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.selectImage, {backgroundColor: colors.text}]}>
          <Text style={[styles.heading, {color: colors.card}]}>
            Launch Image Gallery directly
          </Text>
        </TouchableOpacity>
      </View>
    </Container>
  );
};

export default ImageUploader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heading: {
    fontSize: 20,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 1,
  },
  imageContainer: {
    alignItems: 'center',
  },
  btnContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  selectImage: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
});
