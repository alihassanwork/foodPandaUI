import {StyleSheet, View, TextInput} from 'react-native';
import React from 'react';
import {Container, Text} from '../../components/elements';
import {useForm, Controller} from 'react-hook-form';
import {useTheme} from '@react-navigation/native';
const SignInScreen = () => {
  const {colors} = useTheme();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
    },
  });
  return (
    <Container style={styles.container}>
      <Text isCenter isHeadingTitle hasMargin>
        SignInScreen
      </Text>
      <Container>
        <Controller
          control={control}
          rules={{required: true}}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              style={[
                styles.input,
                {backgroundColor: colors.card, color: colors.text},
              ]}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Enter First Name"
              placeholderTextColor={colors.text}
            />
          )}
          name="firstName"></Controller>
      </Container>
    </Container>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    margin: 20,
    borderRadius: 10,
    paddingLeft: 10,
  },
});
