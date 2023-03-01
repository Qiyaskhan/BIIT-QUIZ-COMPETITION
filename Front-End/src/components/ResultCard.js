import {StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Card, Title, Paragraph} from 'react-native-paper';

const ResultCard = props => {
  const [isRight, setisRight] = useState('False');
  useEffect(() => {
    if (props.SelectedAnswer == props.CorrectAnswer) {
      setisRight('True');
    }
  }, []);

  return (
    <View style={{flex: 1}}>
      <Card
        style={{borderRadius: 30, marginTop: 10, backgroundColor: '#b0e0e6'}}
        mode={'outlined'}>
        <Card.Content>
          <Title>Quiz Title: {props.QuizTitle}</Title>
          <Paragraph>Question: {props.QuestionName}</Paragraph>
          <Paragraph>1- {props.Option1}</Paragraph>
          <Paragraph>2- {props.Option2}</Paragraph>
          <Paragraph>3- {props.Option3}</Paragraph>
          <Paragraph>4- {props.Option4}</Paragraph>
          <Card.Title title="Subject" subtitle={props.Subject} />
          <Card.Title title="Selected Answer" subtitle={props.SelectedAnswer} />
          <Card.Title title="Correct Answer" subtitle={props.CorrectAnswer} />
          <Title>Answer Is: {isRight}</Title>
        </Card.Content>
      </Card>
    </View>
  );
};

export default ResultCard;

const styles = StyleSheet.create({});
