import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native';
import DropDown from 'react-native-paper-dropdown';
import {Divider, Headline, TextInput, Button} from 'react-native-paper';
import ipAddress from '../../components/api';
import DatePicker from 'react-native-date-picker';

const EditQuizes = props => {
  /*Use States For Handling Title, Date and Time */
  const [title, setTitle] = useState(props.QuizTitle);
  const [time, setTime] = useState(props.Time);

  //   /* Use States For Handling Multi Select Drop Down List Of Semesters */
  //   const [showMultiSelectDropDown, setShowMultiSelectDropDown] = useState(false);
  //   const [allowedSemesters, setAllowedSemesters] = useState(''); // '1st,3rd, 5th'
  //   const semesterList = [
  //     {label: '1st', value: '1st'},
  //     {label: '2nd', value: '2nd'},
  //     {label: '3rd', value: '3rd'},
  //     {label: '4th', value: '4th'},
  //     {label: '5th', value: '5th'},
  //     {label: '6th', value: '6th'},
  //     {label: '7th', value: '7th'},
  //     {label: '8th', value: '8th'},
  //   ];

  /* Use State For Handling Subject And Subjects List */
  const [showDropDown, setShowDropDown] = useState(false);
  const [subject, setSubject] = useState(props.Subject);
  const [subjectList, setSubjectList] = useState([]);

  /* Use States For Handling # Of Easy, Medium, Hard And Total Questions*/
  const [tQuestions, setTQuestions] = useState(props.TotalQuestions);
  let [EasyQuestions, setEasyQuestions] = useState(props.EasyQuestions);
  let [MediumQuestions, setMediumQuestions] = useState(props.MediumQuestions);
  let [HardQuestions, setHardQuestions] = useState(props.HardQuestions);

  /* Calling API To Get All Subject List */
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

  function onDone() {
    var formdata = new FormData();
    formdata.append('Title', title);
    formdata.append('QuizID', props.QuizID);
    formdata.append('Date', date.toISOString().split('T')[0]);
    formdata.append('Time', time);
    formdata.append('Subject', subject);
    formdata.append('TotalQuestions', tQuestions);
    formdata.append('EasyQuestions', EasyQuestions);
    formdata.append('MediumQuestions', MediumQuestions);
    formdata.append('HardQuestions', HardQuestions);
    formdata.append('TeacherEmail', props.TeacherEmail);

    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow',
    };

    fetch(ipAddress + 'editQuizes', requestOptions)
      .then(response => response.text())
      .then(result => props.hideModal())
      .catch(error => console.log('error', error))
      .finally(() => props.handleChange());
  }

  // For Date Picker
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
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

          {/*

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
        */}
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
          <View style={styles.card}>
            <Text style={{fontSize: 18, textAlign: 'center', marginTop: 10}}>
              Total Available Questions: {tQuestions}
            </Text>
            <Text style={{fontSize: 18, textAlign: 'center', marginTop: 10}}>
              Total Easy Questions: {EasyQuestions}
            </Text>
            <Text style={{fontSize: 18, textAlign: 'center', marginTop: 10}}>
              Total Medium Questions: {MediumQuestions}
            </Text>
            <Text style={{fontSize: 18, textAlign: 'center', marginTop: 10}}>
              Total Hard Questions: {HardQuestions}
            </Text>
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          margin: 10,
        }}>
        <Button
          mode="contained"
          onPress={() => props.hideModal()}
          style={[
            styles.button,
            {width: Dimensions.get('window').width * 0.4},
          ]}>
          Back
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
    borderRadius: 20,
  },
  subContainer2: {
    flex: 1,
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

export default EditQuizes;
