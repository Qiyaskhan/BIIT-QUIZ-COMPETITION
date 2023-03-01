import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  FlatList,
  View,
  Dimensions,
  Alert,
  ScrollView,
} from 'react-native';
import {
  ActivityIndicator,
  Button,
  Modal,
  Portal,
  Provider,
} from 'react-native-paper';
import QuestionCard from '../../components/questionCard';
import EditMCQS from '../../screens/Teacher/EditMCQS';
import ipAddress from '../../components/api';

const QuestionBank = ({navigation, route}) => {
  /* Recieving Props From Previous Screen */
  let QuizTitle = route.params.QuizTitle;
  let Subject = route.params.Subject;
  let Date = route.params.Date;
  let Time = route.params.Time;
  let TeacherEmail = route.params.TeacherEmail;
  let SelectSemester = route.params.SelectSemester;

  let TotalQuestions = 0,
    EasyQuestions = 0,
    MediumQuestions = 0,
    HardQuestions = 0;

  /* Getting Subject List From API */
  let [dataItems, setDataItems] = useState([]);
  let [loading, setLoading] = useState(true);

  useEffect(() => {
    var formdata = new FormData();
    formdata.append('Subject', Subject);
    var requestOptions = {
      method: 'Post',
      body: formdata,
    };

    fetch(ipAddress + 'getMCQSWithSubject', requestOptions)
      .then(response => response.json())
      .then(result => setDataItems(result))
      .catch(error => console.log('error', error))
      .finally(() => setLoading(false));
  }, []);

  //const [questionData, setQuestionData] = useState([]);

  let questionData = [];

  const handleQuestions = (id, DifficultyLevel, checked) => {
    console.log(id, checked);
    var isThere = false;
    for (var i in questionData) {
      if (questionData[i].ID == id && checked == false) {
        questionData.splice(i, 1);
        isThere = true;
      }
    }
    if (isThere == false && checked == true) {
      questionData.push({ID: id, DifficultyLevel: DifficultyLevel});
    }
    console.log('Data', questionData);
    console.log('length', questionData.length);
  };

  function appCalling() {
    var formdata = new FormData();
    formdata.append('Title', QuizTitle);
    formdata.append('Date', Date);
    formdata.append('Time', Time);
    formdata.append('Subject', Subject);
    formdata.append('TotalQuestions', TotalQuestions);
    formdata.append('EasyQuestions', EasyQuestions);
    formdata.append('MediumQuestions', MediumQuestions);
    formdata.append('HardQuestions', HardQuestions);
    formdata.append('TeacherEmail', TeacherEmail);
    formdata.append('SemesterCount', SelectSemester.length);

    for (let i = 0; i < SelectSemester.length; i++) {
      formdata.append(`Semester[${i}]`, SelectSemester[i]);
    }

    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow',
    };

    fetch(ipAddress + 'setQuizDetail', requestOptions)
      .then(response => response.json())
      .then(result => {
        try {
          var formdata = new FormData();
          formdata.append('QuizID', result);
          formdata.append('QuestionCount', questionData.length);
          for (let i = 0; i < questionData.length; i++) {
            formdata.append(`QuestionID[${i}]`, questionData[i].ID);
          }

          var requestOptions = {
            method: 'Post',
            body: formdata,
            redirect: 'follow',
          };

          fetch(ipAddress + 'quiz', requestOptions)
            .then(response => response.json())
            .then(result => console.log(result))
            .catch(error => console.log(`error ${error}`));
        } finally {
          /* Navigating To Invigilator Home Screen With Teacher Email */
          navigation.navigate('TeacherHome', {TeacherEmail: TeacherEmail});
        }
      })
      .catch(error => alert('error', error));
  }

  /* Submit Function */
  function onSubmit() {
    for (let i in questionData) {
      if (questionData[i].DifficultyLevel == 'Easy') {
        EasyQuestions++;
      }
      if (questionData[i].DifficultyLevel == 'Medium') {
        MediumQuestions++;
      }
      if (questionData[i].DifficultyLevel == 'Hard') {
        HardQuestions++;
      }
      TotalQuestions++;
    }

    console.log(TotalQuestions, EasyQuestions, MediumQuestions, HardQuestions);

    if (questionData.length == 0) {
      Alert.alert('Warning!', `Select Any Question To Continue`, [
        {
          text: 'Ok',
          onPress: () => null,
          style: 'Ok',
        },
      ]);
    } else if (questionData.length != 0) {
      appCalling();
    }
  }
  const [qID, setqID] = useState('');
  const [question, setquestion] = useState('');
  const [opt1, setopt1] = useState('');
  const [opt2, setopt2] = useState('');
  const [opt3, setopt3] = useState('');
  const [opt4, setopt4] = useState('');
  const [ans, setans] = useState('');
  const [difficulty, setdifficulty] = useState('');

  //Model
  const [visible1, setVisible1] = useState(false);
  const showModal = () => setVisible1(true);
  const hideModal = () => setVisible1(false);

  const containerStyle = {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 20,
  };

  //Handle On Delete Question
  function handleOnEdit(
    qID,
    question,
    opt1,
    opt2,
    opt3,
    opt4,
    ans,
    difficulty,
  ) {
    setqID(qID);
    setquestion(question);
    setopt1(opt1);
    setopt2(opt2);
    setopt3(opt3);
    setopt4(opt4);
    setans(ans);
    setdifficulty(difficulty);
    showModal();
  }

  function api() {
    console.log('Ím Here...........');
    setLoading(true);
    var formdata = new FormData();
    formdata.append('Subject', Subject);
    var requestOptions = {
      method: 'Post',
      body: formdata,
    };

    fetch(ipAddress + 'getMCQSWithSubject', requestOptions)
      .then(response => response.json())
      .then(result => setDataItems(result))
      .catch(error => console.log('error', error))
      .finally(() => setLoading(false));
  }

  //Handle On Delete Question
  function handleOnDelete(QuestionID) {
    var formdata = new FormData();
    formdata.append('QuestionID', QuestionID);

    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow',
    };

    fetch(ipAddress + 'deleteMCQS', requestOptions)
      .then(response => response.text())
      .then(result => alert(result))
      .catch(error => alert(`error ${error}`))
      .finally(() => api());
  }

  function handleChange() {
    api();
  }

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator
            size={'large'}
            animating={true}
            color={'red'}
            hidesWhenStopped={false}
          />
        </View>
      ) : (
        <FlatList
          data={dataItems}
          renderItem={({item}) => {
            return (
              <QuestionCard
                QuestionID={item.QuestionID}
                QuestionName={item.QuestionName}
                Option1={item.Option1}
                Option2={item.Option2}
                Option3={item.Option3}
                Option4={item.Option4}
                Answer={item.Answer}
                Subject={item.Subject}
                DifficultyLevel={item.DifficultyLevel}
                navigation={navigation}
                handleQuestions={handleQuestions}
                handleOnDelete={handleOnDelete}
                handleOnEdit={handleOnEdit}
                TeacherEmail={TeacherEmail}
              />
            );
          }}
        />
      )}

      <Button
        mode="contained"
        onPress={() => onSubmit()}
        style={[styles.button]}>
        Submit
      </Button>

      <Provider>
        <Portal>
          <Modal
            visible={visible1}
            onDismiss={hideModal}
            contentContainerStyle={containerStyle}>
            <View style={{width: '100%', height: '100%'}}>
              <ScrollView>
                <EditMCQS
                  QuestionID={qID}
                  Question={question}
                  Option1={opt1}
                  Option2={opt2}
                  Option3={opt3}
                  Option4={opt4}
                  Answer={ans}
                  DifficultyLevel={difficulty}
                  TeacherEmail={TeacherEmail}
                  hideModal={hideModal}
                  handleChange={handleChange}
                />
              </ScrollView>
            </View>
          </Modal>
        </Portal>
      </Provider>
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
  button: {
    width: Dimensions.get('window').width * 0.5,
    alignSelf: 'center',
    backgroundColor: '#b0e0e6',
    margin: 10,
  },
});

export default QuestionBank;
