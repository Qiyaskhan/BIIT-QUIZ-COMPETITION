import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Alert,
  Dimensions,
  ScrollView,
  SafeAreaView,
  FlatList,
} from 'react-native';
import {
  Table,
  TableWrapper,
  Col,
  Cols,
  Cell,
  Rows,
  Row,
} from 'react-native-table-component';
import {
  Appbar,
  TextInput,
  Button,
  ActivityIndicator,
  Provider,
  Portal,
  Modal,
} from 'react-native-paper';

import ipAddress from '../components/api';
import ResultCard from '../components/ResultCard';

export default Test = () => {
  let [tableHead, settableHead] = useState([
    'Registration#',
    'Total Marks',
    'Obtained Marks',
    'Subject',
    'Quiz Title',
  ]);
  const [tableData, settableData] = useState([]);

  const [buttonData, setbuttonData] = useState([]);

  const [loading, setloading] = useState(false);

  useEffect(() => {
    var requestOptions = {
      method: 'Get',
      redirect: 'follow',
    };

    fetch(ipAddress + 'getAllResults', requestOptions)
      .then(response => response.json())
      .then(result => settableData(result))
      .catch(error => console.log('error', error));
  }, []);

  const [title, setTitle] = useState('');
  const [student, setStudent] = useState('');
  const [subject, setsubject] = useState('');

  function onSearch(searchBy, value) {
    var formdata = new FormData();
    formdata.append('searchBy', searchBy);
    formdata.append('Value', value);

    var requestOptions = {
      method: 'Post',
      redirect: 'follow',
      body: formdata,
    };

    fetch(ipAddress + 'searchResult', requestOptions)
      .then(response => response.json())
      .then(result => settableData(result))
      .catch(error => console.log('error', error));
  }

  const [visible2, setVisible2] = useState(false);
  const showModal2 = () => setVisible2(true);
  const hideModal2 = () => setVisible2(false);

  const containerStyle = {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 20,
  };

  let [resID, setResID] = useState('');

  const [resDetail, setresDetail] = useState([]);

  const [QuizTitle, setQuizTitle] = useState('');
  const [QuestionName, setQuestionName] = useState('');
  const [Option1, setOption1] = useState('');
  const [Option2, setOption2] = useState('');
  const [Option3, setOption3] = useState('');
  const [Option4, setOption4] = useState('');
  const [Subject, setSubject] = useState('');
  const [Answer, setAnswer] = useState('');
  const [SelectedAnswer, setSelectedAnswer] = useState('');

  function showDetail(resultID) {
    var formdata = new FormData();
    formdata.append('ResultID', resultID);

    var requestOptions = {
      method: 'Post',
      redirect: 'follow',
      body: formdata,
    };

    fetch(ipAddress + 'getResultDetail', requestOptions)
      .then(response => response.json())
      .then(result => setresDetail(result))
      .catch(error => console.log('error', error))
      .finally(() => showModal2());
  }

  return (
    <SafeAreaView style={styles.container}>
      <Appbar.Header style={styles.subContainer1}>
        <Appbar.BackAction
          onPress={() =>
            navigation.navigate('TeacherHome', {TeacherEmail: TeacherEmail})
          }
        />
        <Appbar.Content title="All Results" />
      </Appbar.Header>
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
        <View style={styles.container2}>
          <View style={{margin: 20}}>
            {/* Search By Title */}
            <View style={styles.searchContainer}>
              <TextInput
                mode="outlined"
                label="Search By Title"
                placeholder="Search By Title"
                onChangeText={e => setTitle(e)}
                value={title}
                style={styles.textFields}
                right={
                  <TextInput.Icon
                    name="table-search"
                    onPress={() => onSearch('Title', title)}
                  />
                }
              />
            </View>
            {/* Search By Subject */}
            <View style={styles.searchContainer}>
              <TextInput
                mode="outlined"
                label="Search By Subject"
                placeholder="Search By Subject"
                onChangeText={e => setsubject(e)}
                value={subject}
                style={styles.textFields}
                right={
                  <TextInput.Icon
                    name="table-search"
                    onPress={() => onSearch('Subject', subject)}
                  />
                }
              />
            </View>
            {/* Search By Student */}
            <View style={styles.searchContainer}>
              <TextInput
                mode="outlined"
                label="Search By ARID#"
                placeholder="Search By ARID#"
                onChangeText={e => setStudent(e)}
                value={student}
                style={styles.textFields}
                right={
                  <TextInput.Icon
                    name="table-search"
                    onPress={() => onSearch('Student', student)}
                  />
                }
              />
            </View>
          </View>
          <View>
            <View style={{flexDirection: 'row'}}>
              <ScrollView horizontal={true}>
                <FlatList
                  data={tableData}
                  renderItem={({item}) => {
                    return (
                      <View style={{borderWidth: 1, flexDirection: 'row'}}>
                        <Button
                          mode="contained"
                          onPress={() => showDetail(item.ResultID)}
                          style={[styles.button]}>
                          Detail
                        </Button>
                        <View style={styles.headerStyle}>
                          <Text style={{fontWeight: 'bold'}}>{item.RegNo}</Text>
                        </View>
                        <View style={styles.headerStyle}>
                          <Text style={{fontWeight: 'bold'}}>
                            {item.TotalNumbers}
                          </Text>
                        </View>
                        <View style={styles.headerStyle}>
                          <Text style={{fontWeight: 'bold'}}>
                            {item.ObtainedNumbers}
                          </Text>
                        </View>
                        <View style={styles.headerStyle}>
                          <Text style={{fontWeight: 'bold'}}>
                            {item.Subject}
                          </Text>
                        </View>
                        <View style={styles.headerStyle}>
                          <Text style={{fontWeight: 'bold'}}>
                            {item.QuizTitle}
                          </Text>
                        </View>
                        <View style={styles.headerStyle}>
                          <Text style={{fontWeight: 'bold'}}>
                            {item.EasyWrong}
                          </Text>
                        </View>
                        <View style={styles.headerStyle}>
                          <Text style={{fontWeight: 'bold'}}>
                            {item.MediumWrong}
                          </Text>
                        </View>
                        <View style={styles.headerStyle}>
                          <Text style={{fontWeight: 'bold'}}>
                            {item.HardWrong}
                          </Text>
                        </View>
                        <View style={styles.headerStyle}>
                          <Text style={{fontWeight: 'bold'}}>
                            {item.EasyRight}
                          </Text>
                        </View>
                        <View style={styles.headerStyle}>
                          <Text style={{fontWeight: 'bold'}}>
                            {item.MediumRight}
                          </Text>
                        </View>
                        <View style={styles.headerStyle}>
                          <Text style={{fontWeight: 'bold'}}>
                            {item.HardRight}
                          </Text>
                        </View>
                      </View>
                    );
                  }}
                />
              </ScrollView>
            </View>
          </View>

          <Provider>
            <Portal>
              <Modal
                visible={visible2}
                onDismiss={hideModal2}
                contentContainerStyle={containerStyle}>
                <View style={{width: '100%', height: '100%'}}>
                  <FlatList
                    data={resDetail}
                    renderItem={({item}) => {
                      return (
                        <ResultCard
                          QuizTitle={item.QuizTitle}
                          Question={item.QuestionName}
                          Option1={item.Option1}
                          Option2={item.Option2}
                          Option3={item.Option3}
                          Option4={item.Option4}
                          Subject={item.Subject}
                          CorrectAnswer={item.Answer}
                          SelectedAnswer={item.SelectedAnswer}
                        />
                      );
                    }}
                  />
                </View>
              </Modal>
            </Portal>
          </Provider>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  head: {height: 70, backgroundColor: '#b0e0e6'},
  text: {textAlign: 'center'},
  button: {
    width: Dimensions.get('window').width * 0.3,
    height: 70,
    backgroundColor: '#b0e0e6',
    marginBottom: 1,
    justifyContent: 'center',
  },

  headerStyle: {
    width: 120,
    height: 70,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  container: {
    flex: 1,
    backgroundColor: '#00ced1',
  },
  subContainer1: {
    backgroundColor: '#b0e0e6',
  },
  container2: {flex: 1, padding: 16, backgroundColor: '#fff'},

  textFields: {
    backgroundColor: '#b0e0e6',
    width: Dimensions.get('window').width * 0.9,
  },
  searchContainer: {
    margin: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
