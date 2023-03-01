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
import QuizCard from '../../components/QuizCard';
import MCQSCard from '../../components/MCQSCard';
import EditQuizes from './EditQuizes';
import ipAddress from '../../components/api';

const QuizBank = ({navigation, route}) => {
  let TeacherEmail = route.params.TeacherEmail;

  /* Getting Subject List From API */
  let [dataItems, setDataItems] = useState([]);
  let [loading, setLoading] = useState(true);

  useEffect(() => {
    var requestOptions = {
      method: 'Get',
    };

    fetch(ipAddress + 'getAllQuizes', requestOptions)
      .then(response => response.json())
      .then(result => setDataItems(result))
      .catch(error => console.log('error', error))
      .finally(() => setLoading(false));
  }, []);

  const [qID, setqID] = useState('');
  const [quizTitle, setquizTitle] = useState('');
  const [date, setdate] = useState('');
  const [time, settime] = useState('');
  const [subject, setsubject] = useState('');
  const [totalQuestions, settotalQuestions] = useState('');
  const [easy, seteasy] = useState('');
  const [medium, setmedium] = useState('');
  const [hard, sethard] = useState('');

  //Model
  const [visible1, setVisible1] = useState(false);
  const showModal = () => setVisible1(true);
  const hideModal = () => setVisible1(false);

  const [visible2, setVisible2] = useState(false);
  const showModal2 = () => setVisible2(true);
  const hideModal2 = () => setVisible2(false);

  const containerStyle = {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 20,
  };

  //Handle On Delete Question
  function handleOnEdit(
    QuizID,
    QuizTitle,
    Date,
    Time,
    Subject,
    TotalQuestions,
    EasyQuestions,
    MediumQuestions,
    HardQuestions,
  ) {
    setqID(QuizID);
    setquizTitle(QuizTitle);
    setdate(Date);
    settime(Time);
    setsubject(Subject);
    settotalQuestions(TotalQuestions);
    seteasy(EasyQuestions);
    setmedium(MediumQuestions);
    sethard(HardQuestions);
    showModal();
  }

  function api() {
    console.log('Ím Here...........');
    setLoading(true);
    var requestOptions = {
      method: 'Get',
    };

    fetch(ipAddress + 'getAllQuizes', requestOptions)
      .then(response => response.json())
      .then(result => setDataItems(result))
      .catch(error => console.log('error', error))
      .finally(() => setLoading(false));
  }

  //Handle On Delete Question
  function handleOnDelete(QuizID) {
    var formdata = new FormData();
    formdata.append('QuizID', QuizID);

    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow',
    };

    fetch(ipAddress + 'deleteQuiz', requestOptions)
      .then(response => response.text())
      .then(result => alert(result))
      .catch(error => alert(`error ${error}`))
      .finally(() => api());
  }

  function handleChange() {
    api();
  }

  const [mcqsData, setmcqsData] = useState([]);
  const [loading2, setloading2] = useState(true);

  function MCQSDetail(QuizID) {
    setloading2(true);
    try {
      var formdata = new FormData();
      formdata.append('QuizID', QuizID);
      var requestOptions = {
        method: 'Post',
        body: formdata,
      };

      fetch(ipAddress + 'getMCQSWithQuizID', requestOptions)
        .then(response => response.json())
        .then(result => setmcqsData(result))
        .catch(error => console.log('error', error))
        .finally(() => setloading2(false));
    } finally {
      showModal2();
    }
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
              <QuizCard
                QuizID={item.QuizID}
                QuizTitle={item.QuizTitle}
                Date={item.Date}
                Time={item.Time}
                Subject={item.Subject}
                TotalQuestions={item.TotalQuestions}
                EasyQuestions={item.EasyQuestions}
                HardQuestions={item.HardQuestions}
                MediumQuestions={item.MediumQuestions}
                handleOnDelete={handleOnDelete}
                handleOnEdit={handleOnEdit}
                TeacherEmail={TeacherEmail}
                MCQSDetail={MCQSDetail}
              />
            );
          }}
        />
      )}

      <Button
        mode="contained"
        onPress={() =>
          navigation.navigate('TeacherHome', {TeacherEmail: TeacherEmail})
        }
        style={[styles.button]}>
        Go Back
      </Button>

      <Provider>
        <Portal>
          <Modal
            visible={visible1}
            onDismiss={hideModal}
            contentContainerStyle={containerStyle}>
            <View style={{width: '100%', height: '100%'}}>
              <ScrollView>
                <EditQuizes
                  QuizID={qID}
                  QuizTitle={quizTitle}
                  Date={date}
                  Time={time}
                  Subject={subject}
                  TotalQuestions={totalQuestions}
                  EasyQuestions={easy}
                  HardQuestions={hard}
                  MediumQuestions={medium}
                  TeacherEmail={TeacherEmail}
                  hideModal={hideModal}
                  handleChange={handleChange}
                />
              </ScrollView>
            </View>
          </Modal>
        </Portal>
      </Provider>

      <Provider>
        <Portal>
          <Modal
            visible={visible2}
            onDismiss={hideModal2}
            contentContainerStyle={containerStyle}>
            {loading2 ? (
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
              <View style={{width: '100%', height: '100%'}}>
                <FlatList
                  data={mcqsData}
                  renderItem={({item}) => {
                    return (
                      <MCQSCard
                        QuestionID={item.QuestionID}
                        QuestionName={item.QuestionName}
                        Option1={item.Option1}
                        Option2={item.Option2}
                        Option3={item.Option3}
                        Option4={item.Option4}
                        Answer={item.Answer}
                        Subject={item.Subject}
                        DifficultyLevel={item.DifficultyLevel}
                        hideModal={hideModal}
                        TeacherEmail={TeacherEmail}
                      />
                    );
                  }}
                />
                <Button
                  mode="contained"
                  onPress={hideModal2}
                  style={[styles.button]}>
                  Go Back
                </Button>
              </View>
            )}
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

export default QuizBank;
