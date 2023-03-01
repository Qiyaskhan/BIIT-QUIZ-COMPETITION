import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  Alert,
} from 'react-native';
import DropDown from 'react-native-paper-dropdown';
import {
  Divider,
  Appbar,
  Headline,
  TextInput,
  Button,
  Title,
} from 'react-native-paper';
import ipAddress from '../../components/api';
import DatePicker from 'react-native-date-picker';

const QuizDetailScreen = ({navigation, route}) => {
  /* Recieving Teacher Email From Previous Screen */
  const TeacherEmail = route.params.TeacherEmail;

  /*Use States For Handling Title, Date and Time */
  const [title, setTitle] = useState('');
  const [time, setTime] = useState('');

  /* Use States For Handling Multi Select Drop Down List Of Semesters */
  const [showMultiSelectDropDown, setShowMultiSelectDropDown] = useState(false);
  const [allowedSemesters, setAllowedSemesters] = useState(''); // '1st,3rd, 5th'
  const semesterList = [
    {label: '1st', value: '1st'},
    {label: '2nd', value: '2nd'},
    {label: '3rd', value: '3rd'},
    {label: '4th', value: '4th'},
    {label: '5th', value: '5th'},
    {label: '6th', value: '6th'},
    {label: '7th', value: '7th'},
    {label: '8th', value: '8th'},
  ];

  /* Use State For Handling Subject And Subjects List */
  const [showDropDown, setShowDropDown] = useState(false);
  const [subject, setSubject] = useState('');
  const [subjectList, setSubjectList] = useState([]);

  /* Use States For Handling # Of Easy, Medium, Hard And Total Questions*/
  const [tQuestions, setTQuestions] = useState(0);
  let [EasyQuestions, setEasyQuestions] = useState(0);
  let [MediumQuestions, setMediumQuestions] = useState(0);
  let [HardQuestions, setHardQuestions] = useState(0);
  let count = 0;

  /* Use States For Handling List Of MCQS Getting From API Call Get All MCQS*/
  const [MCQS, setMCQS] = useState([]);

  /* Use States For Handling Total Easy, Total Medium, Total Hard And Total Questions*/
  let [totalQuestions, setTotalQuestions] = useState(0);
  let [overallQuestions, setOverallQuestions] = useState(1);
  let [totalEasyQuestions, settotalEasyQuestions] = useState(0);
  let [totalMediumQuestions, settotalMediumQuestions] = useState(0);
  let [totalHardQuestions, settotalHardQuestions] = useState(0);

  /* Calling API To Get All Subject List */
  useEffect(() => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };

    fetch(ipAddress + 'getSubjects', requestOptions)
      .then(response => response.json())
      .then(result => setSubjectList(result))
      .catch(error => console.log('error', error))
      /* When *GetSubjects* API Calling Finishes Then *GetMCQS* API Calling Will Begin*/
      .finally(() => {
        var requestOptions = {
          method: 'GET',
          redirect: 'follow',
        };

        fetch(ipAddress + 'getMCQS', requestOptions)
          .then(response => response.json())
          .then(result => setMCQS(result))
          .catch(error => console.log('error', error));
      });
  }, []);

  /* Function To Manage Total Easy,Total Medium,Total Hard And Total Questions And Set There Values*/
  function questionDataLevels() {
    let t = 0,
      e = 0,
      m = 0,
      h = 0;

    if (subject !== '') {
      for (let i = 0; i < MCQS.length; i++) {
        if (MCQS[i].Subject === subject) {
          if (MCQS[i].DifficultyLevel === 'Easy') {
            e++;
          } else if (MCQS[i].DifficultyLevel === 'Medium') {
            m++;
          } else if (MCQS[i].DifficultyLevel === 'Hard') {
            h++;
          }
          t++;
        }
      }
      setTotalQuestions(t);
      settotalEasyQuestions(e);
      settotalMediumQuestions(m);
      settotalHardQuestions(h);
    }
  }
  /* Use States Handling Type And Type Selection*/
  const [type, setType] = useState('');
  const [isTypeSelected, setisTypeSelected] = useState(false);

  /* This Funtion Will Check If Subject Value Is Empty , If Not Set Selection Type (Manual/Random) */
  function checkType(selectionType) {
    subject !== '' ? setType(selectionType) : alert('Please, Chose a subject!');
    subject !== '' ? setisTypeSelected(true) : null;
  }

  /* Use Effect To Call A QuestionData Function Every Time Subject Value Changes*/
  useEffect(() => {
    questionDataLevels();
  }, [subject]);

  /* Use States For Handling QuizID Getting From Response Of API setQuizDetail*/
  const [QuizID, setQuizID] = useState('');
  const [loading, setLoading] = useState(true);

  console.log(QuizID);

  /* Function To Call API setQuizDetail And Navigate To Next Screen*/
  function onClickNext() {
    let semesters = allowedSemesters.split(','); // Split where comma found e.g. ['1st','2nd', '3rd'] and store in list as separate indexes
    console.log(semesters);
    semesters.shift(); // Delete 1st Index Value From List

    navigation.navigate('Questions', {
      QuizTitle: title,
      Subject: subject,
      Date: date.toISOString().split('T')[0],
      Time: time,
      TeacherEmail: TeacherEmail,
      SelectSemester: semesters,
    });
  }

  let questionData = [];

  function getQuestionID() {
    let getAllEasyID = [];
    let getAllMediumID = [];
    let getAllHardID = [];

    for (let i in MCQS) {
      if (MCQS[i].Subject == subject) {
        if (MCQS[i].DifficultyLevel == 'Easy') {
          getAllEasyID.push(MCQS[i].QuestionID);
        }
        if (MCQS[i].DifficultyLevel == 'Medium') {
          getAllMediumID.push(MCQS[i].QuestionID);
        }
        if (MCQS[i].DifficultyLevel == 'Hard') {
          getAllHardID.push(MCQS[i].QuestionID);
        }
      }
    }

    return getAllEasyID, getAllMediumID, getAllHardID;
  }

  function randomQuestions() {
    let countEasy = 0;
    let countMedium = 0;
    let countHard = 0;

    let getAllEasyID = [];
    let getAllMediumID = [];
    let getAllHardID = [];

    for (let i in MCQS) {
      if (MCQS[i].Subject == subject) {
        if (MCQS[i].DifficultyLevel == 'Easy') {
          getAllEasyID.push(MCQS[i].QuestionID);
        }
        if (MCQS[i].DifficultyLevel == 'Medium') {
          getAllMediumID.push(MCQS[i].QuestionID);
        }
        if (MCQS[i].DifficultyLevel == 'Hard') {
          getAllHardID.push(MCQS[i].QuestionID);
        }
      }
    }

    while (countEasy != EasyQuestions) {
      let random =
        getAllEasyID[Math.floor(Math.random() * getAllEasyID.length)];
      let found = false;
      for (let j = 0; j < questionData.length; j++) {
        if (questionData[j] == random) {
          found = true;
        }
      }
      if (!found) {
        questionData.push(random);
        countEasy++;
      }
    }

    while (countMedium != MediumQuestions) {
      let random =
        getAllMediumID[Math.floor(Math.random() * getAllMediumID.length)];
      let found = false;
      for (let j = 0; j < questionData.length; j++) {
        if (questionData[j] == random) {
          found = true;
        }
      }
      if (!found) {
        questionData.push(random);
        countMedium++;
      }
    }

    while (countHard != HardQuestions) {
      let random =
        getAllHardID[Math.floor(Math.random() * getAllHardID.length)];
      let found = false;
      for (let j = 0; j < questionData.length; j++) {
        if (questionData[j] == random) {
          found = true;
        }
      }
      if (!found) {
        questionData.push(random);
        countHard++;
      }
    }
  }

  function api() {
    let semesters = allowedSemesters.split(','); // Split where comma found e.g. ['1st','2nd', '3rd'] and store in list as separate indexes
    semesters.shift(); // Delete 1st Index Value From List

    var formdata = new FormData();
    formdata.append('Title', title);
    formdata.append('Date', date.toISOString().split('T')[0]);
    formdata.append('Time', time);
    formdata.append('Subject', subject);
    formdata.append('TotalQuestions', tQuestions);
    formdata.append('EasyQuestions', EasyQuestions);
    formdata.append('MediumQuestions', MediumQuestions);
    formdata.append('HardQuestions', HardQuestions);
    formdata.append('TeacherEmail', TeacherEmail);
    formdata.append('SemesterCount', semesters.length);

    for (let i = 0; i < semesters.length; i++) {
      formdata.append(`Semester[${i}]`, semesters[i]);
    }

    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow',
    };

    fetch(ipAddress + 'setQuizDetail', requestOptions)
      .then(response => response.json())
      .then(QuizID => {
        console.log(QuizID);

        try {
          var formdata = new FormData();
          formdata.append('QuizID', QuizID);
          formdata.append('QuestionCount', questionData.length);
          for (let i = 0; i < questionData.length; i++) {
            formdata.append(`QuestionID[${i}]`, questionData[i]);
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

  function onDone() {
    let all =
      parseInt(EasyQuestions) +
      parseInt(MediumQuestions) +
      parseInt(HardQuestions);
    console.log(all);
    if (all != tQuestions) {
      alert(
        `Total Questions ${tQuestions} But Selected ${all}, Correct Values And Try Again`,
      );
    } else {
      try {
        randomQuestions();
      } finally {
        api();
      }
    }
  }

  function onRandom10() {
    if (subject !== '') {
      Alert.alert(
        'Confirm!',
        `Are You Sure You Want To Randomly Select 10 Questions; Includes (2-Easy, 3-Medium, 5-Hard)`,
        [
          {
            text: 'NO',
            onPress: () => null,
            style: 'No',
          },
          {
            text: 'YES',
            onPress: () => {
              let Begin = true;
              try {
                let countEasy = 0;
                let countMedium = 0;
                let countHard = 0;

                let getAllEasyID = [];
                let getAllMediumID = [];
                let getAllHardID = [];

                for (let i in MCQS) {
                  if (MCQS[i].Subject == subject) {
                    if (MCQS[i].DifficultyLevel == 'Easy') {
                      getAllEasyID.push(MCQS[i].QuestionID);
                    }
                    if (MCQS[i].DifficultyLevel == 'Medium') {
                      getAllMediumID.push(MCQS[i].QuestionID);
                    }
                    if (MCQS[i].DifficultyLevel == 'Hard') {
                      getAllHardID.push(MCQS[i].QuestionID);
                    }
                  }
                }

                if (getAllEasyID.length < 2) {
                  alert('Easy Questions Are Less Then 2');
                  Begin = false;
                }

                if (getAllMediumID.length < 3) {
                  alert('Medium Questions Are Less Then 3');
                  Begin = false;
                }

                if (getAllHardID.length < 5) {
                  alert('Hard Questions Are Less Then 5');
                  Begin = false;
                }

                if (Begin) {
                  while (countEasy != 2) {
                    let random =
                      getAllEasyID[
                        Math.floor(Math.random() * getAllEasyID.length)
                      ];
                    let found = false;
                    for (let j = 0; j < questionData.length; j++) {
                      if (questionData[j] == random) {
                        found = true;
                      }
                    }
                    if (!found) {
                      questionData.push(random);
                      countEasy++;
                    }
                  }

                  while (countMedium != 3) {
                    let random =
                      getAllMediumID[
                        Math.floor(Math.random() * getAllMediumID.length)
                      ];
                    let found = false;
                    for (let j = 0; j < questionData.length; j++) {
                      if (questionData[j] == random) {
                        found = true;
                      }
                    }
                    if (!found) {
                      questionData.push(random);
                      countMedium++;
                    }
                  }

                  while (countHard != 5) {
                    let random =
                      getAllHardID[
                        Math.floor(Math.random() * getAllHardID.length)
                      ];
                    let found = false;
                    for (let j = 0; j < questionData.length; j++) {
                      if (questionData[j] == random) {
                        found = true;
                      }
                    }
                    if (!found) {
                      questionData.push(random);
                      countHard++;
                    }
                  }
                }
              } finally {
                if (Begin) {
                  api();
                }
              }
            },
            style: 'YES',
          },
        ],
      );
    } else {
      alert('Please, Chose a subject!');
    }
  }

  // For Date Picker
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  console.log(tQuestions, EasyQuestions, MediumQuestions, HardQuestions);

  return (
    <SafeAreaView style={styles.container}>
      <Appbar.Header style={styles.subContainer1}>
        <Appbar.BackAction
          onPress={() =>
            navigation.navigate('TeacherHome', {TeacherEmail: TeacherEmail})
          }
        />
        <Appbar.Content title="Quiz Detail" />
      </Appbar.Header>
      <ScrollView>
        <View style={styles.subContainer2}>
          <Headline>Quiz Title</Headline>
          <TextInput
            label="Title"
            placeholder="Title"
            onChangeText={e => setTitle(e)}
            value={title}
            style={styles.textFields}
          />
          <Headline>Quiz Date</Headline>
          <TextInput
            label="Date"
            placeholder="YYYY-MM-DD"
            onChangeText={e => setDate(e)}
            right={
              <TextInput.Icon
                name="calendar-range-outline"
                onPress={() => (open ? setOpen(false) : setOpen(true))}
              />
            }
            value={date.toISOString().split('T')[0]}
            style={styles.textFields}
          />
          <DatePicker
            modal
            open={open}
            date={date}
            fadeToColor={'none'}
            androidVariant="nativeAndroid"
            mode="date"
            onConfirm={date => {
              setOpen(false);
              setDate(date);
            }}
            onCancel={() => {
              setOpen(false);
            }}
          />
          <Headline>Total Time</Headline>
          <TextInput
            keyboardType="numeric"
            label="Time"
            placeholder="In Minutes e.g. 30"
            onChangeText={e => setTime(e)}
            value={time}
            style={styles.textFields}
          />

          <Headline>Alowed Semesters</Headline>
          <DropDown
            label={'Semesters'}
            mode={'outlined'}
            visible={showMultiSelectDropDown}
            showDropDown={() => setShowMultiSelectDropDown(true)}
            onDismiss={() => setShowMultiSelectDropDown(false)}
            value={allowedSemesters}
            setValue={setAllowedSemesters}
            list={semesterList}
            multiSelect={true}
          />

          <Divider />
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

          {/* If Button Is Not Clicked (Randomly/Manual) Then Show Buttons */}
          {!isTypeSelected ? (
            <View>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Button
                  mode="contained"
                  onPress={() => checkType('Random')}
                  style={[styles.button]}>
                  Randomly
                </Button>
                <Button
                  mode="contained"
                  onPress={() => checkType('Manual')}
                  style={[styles.button]}>
                  Manual
                </Button>
              </View>
              <Text
                style={{
                  textAlign: 'center',
                  textDecorationLine: 'underline',
                  marginTop: 10,
                }}>
                Randomly 2 Easy, 3 Medium And 5 Hard Questions Will Be Selected
              </Text>
              <Button
                mode="contained"
                onPress={() => onRandom10()}
                style={[
                  styles.button,
                  {width: Dimensions.get('window').width * 0.9},
                ]}>
                Select Random 10 Questions
              </Button>
            </View>
          ) : null}

          {/* If Randomly Button Cliked Then Show These Options */}
          {type === 'Random' ? (
            <View style={styles.card}>
              <Text style={{fontSize: 18, textAlign: 'center', marginTop: 10}}>
                Total Available Questions: {totalQuestions}
              </Text>
              <TextInput
                keyboardType="numeric"
                label="Total Questions"
                placeholder="e.g. 10"
                onChangeText={e => {
                  if (e > totalQuestions) {
                    setTQuestions('');
                    alert('Out Of Range');
                  } else {
                    setTQuestions(e);
                  }
                }}
                value={tQuestions}
                style={[
                  styles.textFields,
                  {marginTop: 10, width: Dimensions.get('window').width * 0.8},
                ]}
              />

              <Text
                style={{
                  fontSize: 18,
                  textAlign: 'center',
                  marginTop: 10,
                }}>
                Easy Available Questions: {totalEasyQuestions}
              </Text>
              <TextInput
                keyboardType="numeric"
                label="Easy Questions"
                placeholder="Enter Easy Questions"
                onChangeText={e => {
                  let all =
                    parseInt(e) +
                    parseInt(MediumQuestions) +
                    parseInt(HardQuestions);
                  if (e > totalEasyQuestions) {
                    setEasyQuestions(0);
                    alert('Out Of Range');
                  } else if (all > tQuestions) {
                    setEasyQuestions(0);
                    alert(
                      `Cannot Select More Then ${tQuestions}, Change The Limit In Total Questions And Try Again`,
                    );
                  } else {
                    setEasyQuestions(e);
                  }
                }}
                value={EasyQuestions}
                style={[
                  styles.textFields,
                  {marginTop: 10, width: Dimensions.get('window').width * 0.8},
                ]}
              />

              <Text style={{fontSize: 18, textAlign: 'center', marginTop: 10}}>
                Medium Available Questions: {totalMediumQuestions}
              </Text>
              <TextInput
                keyboardType="numeric"
                label="Medium Questions"
                placeholder="Enter Medium Questions"
                onChangeText={e => {
                  let all =
                    parseInt(e) +
                    parseInt(EasyQuestions) +
                    parseInt(HardQuestions);
                  if (e > totalMediumQuestions) {
                    setMediumQuestions(0);
                    alert('Out Of Range');
                  } else if (all > tQuestions) {
                    setMediumQuestions(0);
                    alert(
                      `Cannot Select More Then ${tQuestions}, Change The Limit In Total Questions And Try Again`,
                    );
                  } else {
                    setMediumQuestions(e);
                  }
                }}
                value={MediumQuestions}
                style={[
                  styles.textFields,
                  {marginTop: 10, width: Dimensions.get('window').width * 0.8},
                ]}
              />

              <Text style={{fontSize: 18, textAlign: 'center', marginTop: 10}}>
                Hard Available Questions: {totalHardQuestions}
              </Text>
              <TextInput
                keyboardType="numeric"
                label="Availbe Hard Questions"
                placeholder="Enter Hard Questions"
                onChangeText={e => {
                  let all =
                    parseInt(e) +
                    parseInt(EasyQuestions) +
                    parseInt(MediumQuestions);
                  if (e > totalHardQuestions) {
                    setHardQuestions(0);
                    alert('Out Of Range');
                  } else if (all > tQuestions) {
                    setHardQuestions(0);
                    alert(
                      `Cannot Select More Then ${tQuestions}, Change The Limit In Total Questions And Try Again`,
                    );
                  } else {
                    setHardQuestions(e);
                  }
                }}
                value={HardQuestions}
                style={[
                  styles.textFields,
                  {marginTop: 10, width: Dimensions.get('window').width * 0.8},
                ]}
              />

              {HardQuestions > totalHardQuestions ? (
                <Text
                  style={{
                    color: 'red',
                    margin: 10,
                    textAlign: 'center',
                    fontSize: 14,
                  }}>
                  Hard Questions Must Be In Given Range ({totalHardQuestions})
                </Text>
              ) : null}

              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Button
                  mode="contained"
                  onPress={() => {
                    checkType(''), setisTypeSelected(false);
                  }}
                  style={[
                    styles.button,
                    {width: Dimensions.get('window').width * 0.3},
                  ]}>
                  Change
                </Button>
                <Button
                  mode="contained"
                  onPress={() => onDone()}
                  style={[
                    styles.button,
                    {width: Dimensions.get('window').width * 0.3},
                  ]}>
                  Done
                </Button>
              </View>
            </View>
          ) : /* If Manual Button Cliked Then Show These Options */
          type == 'Manual' ? (
            <View style={styles.card}>
              <Text style={{fontSize: 18, textAlign: 'center', marginTop: 10}}>
                Total Available Questions: {totalQuestions}
              </Text>
              <Text style={{fontSize: 18, textAlign: 'center', marginTop: 10}}>
                Total Easy Questions: {totalEasyQuestions}
              </Text>
              <Text style={{fontSize: 18, textAlign: 'center', marginTop: 10}}>
                Total Medium Questions: {totalMediumQuestions}
              </Text>
              <Text style={{fontSize: 18, textAlign: 'center', marginTop: 10}}>
                Total Hard Questions: {totalHardQuestions}
              </Text>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Button
                  mode="contained"
                  onPress={() => {
                    checkType(''), setisTypeSelected(false);
                  }}
                  style={[
                    styles.button,
                    {width: Dimensions.get('window').width * 0.3},
                  ]}>
                  Change
                </Button>
                <Button
                  mode="contained"
                  onPress={() => onClickNext()}
                  style={[
                    styles.button,
                    {width: Dimensions.get('window').width * 0.3},
                  ]}>
                  Next
                </Button>
              </View>
            </View>
          ) : null}
        </View>
      </ScrollView>
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
    width: Dimensions.get('window').width * 0.4,
    alignSelf: 'center',
    backgroundColor: '#b0e0e6',
    marginTop: 15,
  },
  card: {
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 8,
    padding: 20,
    borderRadius: 10,
  },
});

export default QuizDetailScreen;
