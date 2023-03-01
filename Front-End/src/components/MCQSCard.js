import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Card, Title, Paragraph} from 'react-native-paper';

const MCQSCard = props => {
  return (
    <View>
      <Card
        style={{borderRadius: 30, marginTop: 10, backgroundColor: '#b0e0e6'}}
        mode={'outlined'}>
        <Card.Content>
          <Title>Question ID: {props.QuestionID}</Title>
          <Paragraph>Question: {props.QuestionName}</Paragraph>
          <Paragraph>1- {props.Option1}</Paragraph>
          <Paragraph>2- {props.Option2}</Paragraph>
          <Paragraph>3- {props.Option3}</Paragraph>
          <Paragraph>4- {props.Option4}</Paragraph>
          <Card.Title title="Answer" subtitle={props.Answer} />
          <Card.Title title="Subject" subtitle={props.Subject} />
          <Card.Title
            title="Difficulty Level"
            subtitle={props.DifficultyLevel}
          />
        </Card.Content>
      </Card>
    </View>
  );
};

export default MCQSCard;

const styles = StyleSheet.create({});
