import React from 'react';
import {SafeAreaView, View, StyleSheet, Dimensions} from 'react-native';
import {Appbar, Button} from 'react-native-paper';

const TeacherHomeScreen = ({navigation, route}) => {
  /* Recieving Teacher Email From Previous Screen */
  const TeacherEmail = route.params.TeacherEmail;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header Bar With Back Button */}
      <Appbar.Header style={styles.subContainer1}>
        <Appbar.BackAction onPress={() => navigation.navigate('Login')} />
        <Appbar.Content title="Teacher Home" />
      </Appbar.Header>

      <View style={styles.subContainer2}>
        {/* MCQS Creation Button */}
        <Button
          mode="contained"
          onPress={() =>
            navigation.navigate('MCQS', {TeacherEmail: TeacherEmail})
          }
          style={styles.button}>
          Create MCQS
        </Button>

        {/* Quiz Creation Button 
        <Button
          mode="contained"
          onPress={() =>
            navigation.navigate('QuizDetail', {TeacherEmail: TeacherEmail})
          }
          style={styles.button}>
          All MCQS
        </Button>
*/}
        {/* Quiz Creation Button */}
        <Button
          mode="contained"
          onPress={() =>
            navigation.navigate('QuizDetail', {TeacherEmail: TeacherEmail})
          }
          style={styles.button}>
          Create Quiz
        </Button>

        {/* Quiz Creation Button */}
        <Button
          mode="contained"
          onPress={() =>
            navigation.navigate('QuizBank', {TeacherEmail: TeacherEmail})
          }
          style={styles.button}>
          All Quizes
        </Button>

        {/* Show Results Of Students */}
        <Button
          mode="contained"
          onPress={() =>
            navigation.navigate('Results', {TeacherEmail: TeacherEmail})
          }
          style={styles.button}>
          Results
        </Button>

        {/* Logout */}
        <Button
          mode="contained"
          onPress={() => navigation.navigate('Login')}
          style={[styles.button, {alignSelf: 'flex-end', borderRadius: 15}]}>
          Logout
        </Button>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00ced1',
  },
  subContainer1: {
    backgroundColor: '#b0e0e6',
  },
  subContainer2: {
    flex: 1,
    justifyContent: 'center',
  },
  button: {
    width: Dimensions.get('window').width * 0.5,
    alignSelf: 'flex-start',
    backgroundColor: '#b0e0e6',
    marginTop: 30,
    margin: 10,
  },
});

export default TeacherHomeScreen;
