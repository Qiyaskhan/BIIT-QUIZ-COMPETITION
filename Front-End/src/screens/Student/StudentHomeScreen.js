import React, {useState, useEffect} from 'react';
import {SafeAreaView, View, StyleSheet, Dimensions} from 'react-native';
import {Appbar, Button, Headline} from 'react-native-paper';
import DropDown from 'react-native-paper-dropdown';
import ipAddress from '../../components/api';

const StudentHomeScreen = ({navigation, route}) => {
  let StudentRegNo = route.params.StudentRegNo;
  let Semester = route.params.Semester;

  const [showDropDown, setShowDropDown] = useState(false);
  const [title, setTitle] = useState('');
  const [titleList, setTitleList] = useState([]);
  const [time, setTime] = useState(0);
  console.log(title);
  // console.log(titleList);
  //new Date().toISOString().split('T')[0]
  useEffect(() => {
    var formdata = new FormData();
    formdata.append('Semester', Semester);
    formdata.append('Date', '2022-09-18');

    var requestOptions = {
      method: 'Post',
      redirect: 'follow',
      body: formdata,
    };

    fetch(ipAddress + 'getTitlesBySemesterAndDate', requestOptions)
      .then(response => response.json())
      .then(result => setTitleList(result))
      .catch(error => console.log('error', error))
      .finally(() => console.log(titleList[0].Time));
  }, []);

  function onStart() {
    for (let i = 0; i < titleList.length; i++) {
      if (title == titleList[i].label) {
        navigation.navigate('Quiz', {
          StudentRegNo: StudentRegNo,
          QuizTitle: title,
          QuizTime: titleList[i].Time,
        });
      }
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Appbar.Header style={styles.subContainer1}>
        <Appbar.BackAction onPress={() => navigation.navigate('Login')} />
        <Appbar.Content title="Student Home" />
      </Appbar.Header>
      <View style={styles.subContainer2}>
        <Headline style={{alignSelf: 'center'}}>Select Quiz</Headline>
        <DropDown
          label={'Quizes'}
          visible={showDropDown}
          showDropDown={() => setShowDropDown(true)}
          onDismiss={() => setShowDropDown(false)}
          value={title}
          setValue={setTitle}
          list={titleList}
          activeColor={'#b0e0e6'}
        />
        <Button
          mode="contained"
          onPress={() => onStart()}
          style={[styles.button, {alignSelf: 'center'}]}>
          Start Quiz
        </Button>
        <Button
          mode="contained"
          onPress={() =>
            navigation.navigate('StudentResult', {StudentRegNo: StudentRegNo})
          }
          style={styles.button}>
          Results
        </Button>
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
    width: Dimensions.get('window').width * 0.4,
    alignSelf: 'flex-start',
    backgroundColor: '#b0e0e6',
    marginTop: 30,
    margin: 10,
  },
});

export default StudentHomeScreen;
