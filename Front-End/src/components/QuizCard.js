import {StyleSheet, Alert, View} from 'react-native';
import React from 'react';
import {Button, Card, Title, Paragraph} from 'react-native-paper';

const QuizCard = props => {
  function onDelete() {
    Alert.alert(
      'Warning!',
      `Are You Sure You Want To Delete Quiz Title: ${props.QuizTitle}`,
      [
        {
          text: 'NO',
          onPress: () => null,
          style: 'No',
        },
        {
          text: 'YES',
          onPress: () => props.handleOnDelete(props.QuizID),
          style: 'YES',
        },
      ],
    );
  }

  return (
    <View>
      <Card
        style={{borderRadius: 30, marginTop: 10, backgroundColor: '#b0e0e6'}}
        mode={'outlined'}>
        <Card.Content>
          <Title>Quiz ID: {props.QuizID}</Title>
          <Title>Quiz Title: {props.QuizTitle}</Title>
          <Card.Title title="Date" subtitle={props.Date} />
          <Card.Title title="Time" subtitle={props.Time} />
          <Card.Title title="Subject" subtitle={props.Subject} />
          <Paragraph>Total Questions: {props.TotalQuestions}</Paragraph>
          <Paragraph>Easy Questions: {props.EasyQuestions}</Paragraph>
          <Paragraph>Medium Questions: {props.MediumQuestions}</Paragraph>
          <Paragraph>Hard Questions: {props.HardQuestions}</Paragraph>
        </Card.Content>

        <Card.Actions>
          <Button
            icon="grease-pencil"
            onPress={() =>
              props.handleOnEdit(
                props.QuizID,
                props.QuizTitle,
                props.Date,
                props.Time,
                props.Subject,
                props.TotalQuestions,
                props.EasyQuestions,
                props.MediumQuestions,
                props.HardQuestions,
              )
            }>
            Edit
          </Button>
          <Button icon="delete-outline" onPress={() => onDelete()}>
            Delete
          </Button>
          <Button onPress={() => props.MCQSDetail(props.QuizID)}>
            MCQS Detail
          </Button>
        </Card.Actions>
      </Card>
    </View>
  );
};

export default QuizCard;

const styles = StyleSheet.create({});
