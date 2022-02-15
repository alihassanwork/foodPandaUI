import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Container} from '../../components/elements';
import {useTheme} from '@react-navigation/native';
const ImageUploader = () => {
  const {colors} = useTheme();
  return (
    <Container style={styles.container}>
      <Text style={[styles.heading, {color: colors.text}]}>ImageUploader</Text>
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
});
