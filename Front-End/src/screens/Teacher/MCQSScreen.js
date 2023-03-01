import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  Text,
  Alert,
} from 'react-native';
import {
  Appbar,
  Button,
  Headline,
  TextInput,
  Subheading,
  RadioButton,
} from 'react-native-paper';
import DropDown from 'react-native-paper-dropdown';
import ipAddress from '../../components/api';

const MCQSScreen = ({navigation, route}) => {
  const TeacherEmail = route.params.TeacherEmail;

  const [question, setQuestion] = useState('');
  const [option1, setOption1] = useState('');
  const [option2, setOption2] = useState('');
  const [option3, setOption3] = useState('');
  const [option4, setOption4] = useState('');
  const [subject, setSubject] = useState('');

  const [answer, setAnswer] = useState('');
  const [showDropDown1, setShowDropDown1] = useState(false);
  const answerList = [
    {label: 'Option#1', value: option1},
    {label: 'Option#2', value: option2},
    {label: 'Option#3', value: option3},
    {label: 'Option#4', value: option4},
  ];
  console.log(answer);
  const [showDropDown, setShowDropDown] = useState(false);
  const [subjectList, setSubjectList] = useState([]);
  console.log(subject);
  useEffect(() => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };

    fetch(ipAddress + 'getSubjects', requestOptions)
      .then(response => response.json())
      .then(result => setSubjectList(result))
      .catch(error => console.log('error', error));
  }, []);

  const [difficulty, setDifficulty] = useState('');

  function onNext() {
    if (
      question == '' &&
      option1 == '' &&
      option2 == '' &&
      option3 == '' &&
      option4 == '' &&
      answer == '' &&
      subject == '' &&
      difficulty == ''
    ) {
      Alert.alert('Please Fill All The Fields!');
    } else {
      var formdata = new FormData();
      formdata.append('Question', question);
      formdata.append('Option1', option1);
      formdata.append('Option2', option2);
      formdata.append('Option3', option3);
      formdata.append('Option4', option4);
      formdata.append('Answer', answer);
      formdata.append('Subject', subject);
      formdata.append('Difficulty', difficulty);
      formdata.append('TeacherEmail', TeacherEmail);

      var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow',
      };

      fetch(ipAddress + 'saveMCQS', requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error))
        .finally(() => {
          setQuestion('');
          setOption1('');
          setOption2('');
          setOption3('');
          setOption4('');
          setAnswer('');
          setDifficulty('');
        });
    }
  }
  function onDone() {
    navigation.navigate('TeacherHome', {TeacherEmail: TeacherEmail});
  }

  return (
    <SafeAreaView style={styles.container}>
      <Appbar.Header style={styles.subContainer1}>
        <Appbar.BackAction
          onPress={() =>
            navigation.navigate('TeacherHome', {TeacherEmail: TeacherEmail})
          }
        />
        <Appbar.Content title="Create Questions" />
      </Appbar.Header>

      <ScrollView>
        <View style={styles.subContainer2}>
          <Headline>Question</Headline>
          <TextInput
            label="Question"
            placeholder="Multiline"
            onChangeText={e => setQuestion(e)}
            value={question}
            multiline={true}
            style={styles.textFields}
          />
          <Subheading>Option#1</Subheading>
          <TextInput
            label="Option#1"
            placeholder="Option#1"
            onChangeText={e => setOption1(e)}
            value={option1}
            style={styles.textFields}
          />
          <Subheading>Option#2</Subheading>
          <TextInput
            label="Option#2"
            placeholder="Option#2"
            onChangeText={e => setOption2(e)}
            value={option2}
            style={styles.textFields}
          />
          <Subheading>Option#3</Subheading>
          <TextInput
            label="Option#3"
            placeholder="Option#3"
            onChangeText={e => setOption3(e)}
            value={option3}
            style={styles.textFields}
          />
          <Subheading>Option#4</Subheading>
          <TextInput
            label="Option#4"
            placeholder="Option#4"
            onChangeText={e => setOption4(e)}
            value={option4}
            style={styles.textFields}
          />
          <Subheading>Correct Answer</Subheading>
          <DropDown
            label={'Answer'}
            visible={showDropDown1}
            showDropDown={() => setShowDropDown1(true)}
            onDismiss={() => setShowDropDown1(false)}
            value={answer}
            setValue={setAnswer}
            list={answerList}
            activeColor={'#b0e0e6'}
          />
          <Headline>Subject</Headline>
          <DropDown
            label={'Subject'}
            visible={showDropDown}
            showDropDown={() => setShowDropDown(true)}
            onDismiss={() => setShowDropDown(false)}
            value={subject}
            setValue={setSubject}
            list={subjectList}
            activeColor={'#b0e0e6'}
          />
          <Headline>Difficulty Level</Headline>
          <RadioButton.Group
            onValueChange={newValue => setDifficulty(newValue)}
            value={difficulty}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-around'}}>
              <View style={{flexDirection: 'row'}}>
                <Text style={{fontSize: 20}}>Easy</Text>
                <RadioButton value="Easy" color={'#b0e0e6'} />
              </View>
              <View style={{flexDirection: 'row'}}>
                <Text style={{fontSize: 20}}>Medium</Text>
                <RadioButton value="Medium" color={'#b0e0e6'} />
              </View>
              <View style={{flexDirection: 'row'}}>
                <Text style={{fontSize: 20}}>Hard</Text>
                <RadioButton value="Hard" color={'#b0e0e6'} />
              </View>
            </View>
          </RadioButton.Group>
        </View>
      </ScrollView>
      <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
        <Button
          mode="contained"
          onPress={() => onNext()}
          style={[
            styles.button,
            {width: Dimensions.get('window').width * 0.4},
          ]}>
          Save & Next
        </Button>
        <Button
          mode="contained"
          onPress={() => onDone()}
          style={[styles.button]}>
          Done
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
    margin: 20,
  },
  textFields: {
    backgroundColor: '#b0e0e6',
    width: Dimensions.get('window').width * 0.9,
    alignSelf: 'center',
  },
  button: {
    width: Dimensions.get('window').width * 0.3,
    alignSelf: 'center',
    backgroundColor: '#b0e0e6',
    margin: 30,
  },
});

export default MCQSScreen;
