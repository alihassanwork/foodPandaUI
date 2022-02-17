import {StyleSheet, View, TextInput, TouchableOpacity} from 'react-native';
import React from 'react';
import {Container, Text} from '../../components/elements';
import {useForm, Controller} from 'react-hook-form';
import {useTheme} from '@react-navigation/native';
import {COLORS} from '../../../constants/theme';
import {useDispatch} from 'react-redux';
import {setUserData} from '../../../redux/actions';
const SignInScreen = ({navigation}) => {
  const {colors} = useTheme();
  const {
    control,
    handleSubmit,
    formState: {errors},
    register,
    reset,
  } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
    },
  });

  //redux
  const dispatch = useDispatch();
  const handleSetUserData = value => dispatch(setUserData(value));

  const onSubmit = data => {
    handleSetUserData(data);
    navigation.navigate('ProfileScreen');
  };
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
                {
                  backgroundColor: colors.card,
                  color: colors.text,
                  borderWidth: 1,
                  borderColor: errors.firstName ? 'red' : colors.border,
                },
              ]}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Enter First Name"
              placeholderTextColor={colors.border}
            />
          )}
          name="firstName"
        />

        {errors.firstName && (
          <Text isPrimary style={styles.errorStyle}>
            Required!
          </Text>
        )}

        <Controller
          control={control}
          rules={{
            maxLength: 100,
            required: true,
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: colors.card,
                  color: colors.text,
                  borderWidth: 1,
                  borderColor: errors.lastName ? 'red' : colors.border,
                },
              ]}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Enter last Name"
              placeholderTextColor={colors.border}
            />
          )}
          name="lastName"
        />
        {errors.lastName && (
          <Text isPrimary style={styles.errorStyle}>
            Required!
          </Text>
        )}

        <Controller
          control={control}
          rules={{
            maxLength: 100,
            required: true,
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: colors.card,
                  color: colors.text,
                  borderWidth: 1,
                  borderColor: errors.email ? 'red' : colors.border,
                },
              ]}
              {...register('email', {
                pattern: {
                  value:
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: 'Please enter a valid email',
                },
              })}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Enter your email"
              placeholderTextColor={colors.border}
              autoCapitalize="none"
            />
          )}
          name="email"
        />
        {errors.email && (
          <Text isPrimary style={styles.errorStyle}>
            {errors.email.message ? `${errors.email.message}` : 'Required!'}
          </Text>
        )}
        <View style={styles.btnContainer}>
          <TouchableOpacity
            style={[styles.submitBtn, {backgroundColor: COLORS.primary}]}
            onPress={handleSubmit(onSubmit)}>
            <Text isCenter isHeadingTitle>
              Sign In
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.submitBtn, {backgroundColor: COLORS.red}]}
            onPress={() => reset()}>
            <Text isCenter isHeadingTitle>
              Reset Values
            </Text>
          </TouchableOpacity>
        </View>
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
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 10,
    paddingLeft: 10,
    borderWidth: 1,
  },
  errorStyle: {
    marginLeft: 20,
    marginTop: 5,
  },
  submitBtn: {
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 10,
  },
  btnContainer: {
    margin: 20,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
});
