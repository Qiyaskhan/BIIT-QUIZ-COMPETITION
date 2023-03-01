import React, {useState, useEffect} from 'react';
import {SafeAreaView, Text, View, StyleSheet} from 'react-native';
import RadioButtonRN from 'radio-buttons-react-native';
const Questions = props => {
  const [answer, setanswer] = useState();
  const [isFinal, setisFinal] = useState(false);

  const [mcqsData, setmcqsData] = useState([
    {
      value: props.QuestionNo,
      label: props.Option1,
      QuestionID: props.QuestionID,
      DifficultyLevel: props.DifficultyLevel,
    },
    {
      value: props.QuestionNo,
      label: props.Option2,
      QuestionID: props.QuestionID,
      DifficultyLevel: props.DifficultyLevel,
    },
    {
      value: props.QuestionNo,
      label: props.Option3,
      QuestionID: props.QuestionID,
      DifficultyLevel: props.DifficultyLevel,
    },
    {
      value: props.QuestionNo,
      label: props.Option4,
      QuestionID: props.QuestionID,
      DifficultyLevel: props.DifficultyLevel,
    },
  ]);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#00ced1'}}>
      <Text style={{marginTop: 10}}></Text>
      <View style={styles.questionContainer}>
        <View style={styles.questionNo}>
          <Text
            style={[styles.questionText, {fontWeight: 'bold', fontSize: 20}]}>
            Q#{props.QuestionNo}
          </Text>
        </View>

        <View style={styles.question}>
          <Text style={styles.questionText}>{props.QuestionName}</Text>
        </View>
      </View>
      <RadioButtonRN
        activeColor={'#607EAA'}
        deactiveColor={'#606161'}
        boxActiveBgColor={'#b0e0e6'}
        boxDeactiveBgColor={'#b0e0e6'}
        data={mcqsData}
        selectedBtn={e => props.handleAnswers(e)}
      />
    </SafeAreaView>
  );
};

export default Questions;

const styles = StyleSheet.create({
  questionContainer: {
    width: '100%',
    height: 60,
    backgroundColor: '#b0e0e6',
    marginBottom: 10,
    flexDirection: 'row',
  },
  questionText: {
    textAlign: 'center',
    fontSize: 14,
  },
  questionNo: {
    borderWidth: 1,
    borderColor: '#606161',
    justifyContent: 'center',
    height: '100%',
    width: '14%',
    borderTopRightRadius: 40,
    borderBottomRightRadius: 40,
    flex: 1,
  },
  question: {
    //height: "100%",
    justifyContent: 'center',
    flex: 6,
  },
});
