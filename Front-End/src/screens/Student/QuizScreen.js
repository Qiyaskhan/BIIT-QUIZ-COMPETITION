import React, {useState, useEffect, useRef} from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Dimensions,
  FlatList,
  AppState,
  Text,
} from 'react-native';
import {Headline, Button, Divider} from 'react-native-paper';
import ipAddress from '../../components/api';
import Questions from '../../components/Questions';
import CountDown from 'react-native-countdown-component';
import BackButtonHandler from '../../components/BackButtonHandler';

const QuizScreen = ({navigation, route}) => {
  let QuizTitle = route.params.QuizTitle;
  let QuizTime = route.params.QuizTime;
  let StudentRegNo = route.params.StudentRegNo;
  const [res, setRes] = useState([]);
  const [subject, setSubject] = useState('');

  BackButtonHandler();

  /*Checking App State Forground Or Background*/
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      appState.current = nextAppState;
      console.log('AppState', appState.current);

      /* If Student Minimize The APP Then Logout That Student*/
      if (appState.current == 'background') {
        onSubmit();
      }
    });

    return () => {
      subscription.remove();
    };
  }, []);

  console.log(QuizTime);

  useEffect(() => {
    var formdata = new FormData();
    formdata.append('QuizTitle', QuizTitle);
    var requestOptions = {
      method: 'Post',
      redirect: 'follow',
      body: formdata,
    };

    fetch(ipAddress + 'getQuiz', requestOptions)
      .then(response => response.json())
      .then(result => setRes(result))
      .catch(error => console.log('error', error))
      .finally(() => {
        fetch(ipAddress + 'getSubjectByTitle', requestOptions)
          .then(response => response.json())
          .then(result => setSubject(result))
          .catch(error => console.log('error', error));
      });
  }, []);

  const [answer, setanswer] = useState([]);

  const handleAnswers = e => {
    console.log('e:', e);
    var isThere = false;
    for (var i in answer) {
      if (answer[i].value == e.value) {
        answer.splice(i, 1);
        // setanswer([...answer, e]);
        isThere = true;
      }
    }
    if (isThere == false) {
      setanswer([...answer, e]);
    }
  };

  console.log(answer);

  function onSubmit() {
    /* Checking Correct Answer And Saving Result */
    let totalMarks = 0;
    let totalQuestions = 0;
    let obtainedMarks = 0;

    let easyWrong = 0,
      mediumWrong = 0,
      hardWrong = 0;
    let easyRight = 0,
      mediumRight = 0,
      hardRight = 0;

    // Finding Total Marks
    for (let i in res) {
      totalMarks++;
      totalQuestions++;
    }

    console.log('Total Marks:', totalMarks);

    // Finding Detail
    for (let i = 0; i < res.length; i++) {
      for (let j = 0; j < answer.length; j++) {
        if (res[i].QuestionID == answer[j].QuestionID) {
          if (res[i].Answer == answer[j].label) {
            obtainedMarks++;

            if (res[i].DifficultyLevel == 'Easy') {
              easyRight++;
            }
            if (res[i].DifficultyLevel == 'Medium') {
              mediumRight++;
            }
            if (res[i].DifficultyLevel == 'Hard') {
              hardRight++;
            }
          } else {
            if (res[i].DifficultyLevel == 'Easy') {
              easyWrong++;
            }
            if (res[i].DifficultyLevel == 'Medium') {
              mediumWrong++;
            }
            if (res[i].DifficultyLevel == 'Hard') {
              hardWrong++;
            }
          }
        }
      }
    }

    console.log('Obtained Marks: ', obtainedMarks);

    var formdata = new FormData();
    formdata.append('ObtainedMarks', obtainedMarks);
    formdata.append('TotalMarks', totalMarks);
    formdata.append('Student', StudentRegNo);
    formdata.append('QuizTitle', QuizTitle);
    formdata.append('Subject', subject);
    formdata.append('EasyWrong', easyWrong);
    formdata.append('MediumWrong', mediumWrong);
    formdata.append('HardWrong', hardWrong);
    formdata.append('EasyRight', easyRight);
    formdata.append('MediumRight', mediumRight);
    formdata.append('HardRight', hardRight);

    formdata.append('QuestionCount', answer.length);

    for (let i = 0; i < answer.length; i++) {
      formdata.append(`QuestionID[${i}]`, answer[i].QuestionID);
    }

    for (let i = 0; i < answer.length; i++) {
      formdata.append(`SelectedAnswer[${i}]`, answer[i].label);
    }

    var requestOptions = {
      method: 'Post',
      redirect: 'follow',
      body: formdata,
    };

    fetch(ipAddress + 'saveResults', requestOptions)
      .then(response => response.json())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
    navigation.navigate('StudentHome', {StudentRegNo: StudentRegNo});
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.subContainer1}>
        <View style={{alignSelf: 'center', marginTop: 10}}>
          <Text style={styles.title}>Remaining Time</Text>
          <CountDown
            until={QuizTime * 60}
            timeToShow={['H', 'M', 'S']}
            onFinish={() => onSubmit()}
            size={20}
            digitStyle={{
              width: 70,
              backgroundColor: '#b0e0e6',
              borderWidth: 2,
              borderColor: '#b0e0e6',
            }}
          />
        </View>
        <Divider />
        <FlatList
          data={res}
          renderItem={({item}) => {
            return (
              <Questions
                QuestionName={item.QuestionName}
                Option1={item.Option1}
                Option2={item.Option2}
                Option3={item.Option3}
                Option4={item.Option4}
                QuestionNo={item.QuestionNo}
                QuestionID={item.QuestionID}
                DifficultyLevel={item.DifficultyLevel}
                handleAnswers={handleAnswers}
              />
            );
          }}
        />
        <Button
          mode="contained"
          onPress={() => onSubmit()}
          style={[styles.button, {alignSelf: 'center'}]}>
          Submit
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
    flex: 1,
  },
  button: {
    width: Dimensions.get('window').width * 0.4,
    alignSelf: 'flex-start',
    backgroundColor: '#b0e0e6',
    marginTop: 30,
    margin: 10,
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    padding: 5,
  },
});

export default QuizScreen;
