import {SafeAreaView, StyleSheet, View, Image, Dimensions} from 'react-native';
import React, {useState} from 'react';
import {TextInput, Button} from 'react-native-paper';
import ipAddress from '../components/api';

const Login = ({navigation}) => {
  /* Use States To Manage Username And Password And Secure Text */
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [secureText, setSecureText] = useState(true);

  const onLogin = async () => {
    if (username === '' || password === '') {
      /* Alert On Empty Text Fields */
      alert('Please Enter your Credentials');
    } else {
      /* Setting Data For Post as Form Data*/
      const data = new FormData();
      data.append('id', username);
      data.append('password', password);

      /* Calling API */
      try {
        const response = await fetch(ipAddress + 'login', {
          method: 'POST',
          body: data,
        });

        /* Getting Response and Data From Server */
        const json = await response.json();
        console.log(json[0].Role);
        /* Checking If It's Student Trying To Login*/
        if (json[0].Role == 'STUDENT') {
          /* Matching The Credentials */
          if (username === json[0].RegNo && password === json[0].Password) {
            /* Setting Text Fields Empty */
            setUsername('');
            setPassword('');

            /* Navigating To Student Home Screen with Student Registration#*/
            navigation.navigate('StudentHome', {
              StudentRegNo: json[0].RegNo,
              Semester: json[0].Semester,
            });
          } else {
            alert('Incorrect Credentials');
          }

          /* Checking If It's Invigilator Trying To Login*/
        } else if (json[0].Role == 'Teacher') {
          //console.log('Here');
          if (
            /* Matching The Credentials */

            username == json[0].Email &&
            password == json[0].Password
          ) {
            /* Setting Text Fields Empty */
            setUsername('');
            setPassword('');

            /* Navigating To Invigilator Home Screen With Teacher Email */
            navigation.navigate('TeacherHome', {TeacherEmail: json[0].Email});
          } else {
            alert('Incorrect Credentials');
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.subContainer1}>
        {/* BQC Logo */}
        <Image
          source={require('../../assets/Logo.png')}
          style={styles.image}
          resizeMode={'contain'}
        />
      </View>
      <View style={styles.subContainer2}>
        {/* User Name Text Input */}
        <TextInput
          mode="outlined"
          label="User Name"
          placeholder="User Name"
          left={<TextInput.Icon name="face-man-profile" />}
          onChangeText={e => setUsername(e)}
          value={username}
          style={styles.textFields}
        />

        {/* Password Text Input */}
        <TextInput
          mode="outlined"
          label="Password"
          placeholder="Password"
          right={
            <TextInput.Icon
              name="eye"
              onPress={() =>
                secureText ? setSecureText(false) : setSecureText(true)
              }
            />
          }
          left={<TextInput.Icon name="lock" />}
          secureTextEntry={secureText}
          onChangeText={e => setPassword(e)}
          value={password}
          style={styles.textFields}
        />
        {/* Login Button */}
        <Button
          mode="contained"
          onPress={() => onLogin()}
          style={styles.loginButton}>
          Login
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#b0e0e6',
  },
  subContainer1: {
    flex: 2,
    backgroundColor: '#b0e0e6',
  },
  subContainer2: {
    flex: 3,
    backgroundColor: '#00ced1',
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    justifyContent: 'center',
  },
  image: {
    flex: 1,
    aspectRatio: 3 / 1,
    alignSelf: 'center',
  },
  textFields: {
    backgroundColor: '#b0e0e6',
    width: Dimensions.get('window').width * 0.9,
    alignSelf: 'center',
  },
  loginButton: {
    width: Dimensions.get('window').width * 0.5,
    alignSelf: 'center',
    backgroundColor: '#b0e0e6',
    marginTop: 30,
  },
});
