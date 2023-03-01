import {StyleSheet, Alert, View, ScrollView} from 'react-native';
import React, {useState, useEffect} from 'react';
import {
  Button,
  Card,
  Title,
  Paragraph,
  Checkbox,
  Subheading,
} from 'react-native-paper';

const QuestionCard = props => {
  const [checked, setChecked] = React.useState(false);

  useEffect(() => {
    props.handleQuestions(props.QuestionID, props.DifficultyLevel, checked);
  }, [checked]);

  function onDelete() {
    Alert.alert(
      'Warning!',
      `Are You Sure You Want To Delete Question ID: ${props.QuestionID}`,
      [
        {
          text: 'NO',
          onPress: () => null,
          style: 'No',
        },
        {
          text: 'YES',
          onPress: () => props.handleOnDelete(props.QuestionID),
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

        <Card.Actions>
          <Button
            icon="grease-pencil"
            onPress={() =>
              props.handleOnEdit(
                props.QuestionID,
                props.QuestionName,
                props.Option1,
                props.Option2,
                props.Option3,
                props.Option4,
                props.Answer,
                props.DifficultyLevel,
              )
            }>
            Edit
          </Button>
          <Button icon="delete-outline" onPress={() => onDelete()}>
            Delete
          </Button>

          <Checkbox
            status={checked ? 'checked' : 'unchecked'}
            onPress={() => {
              setChecked(!checked);
            }}
            color={'#8055ff'}
            uncheckedColor={'#8055ff'}
          />
          <Subheading style={{color: '#8055ff', fontWeight: 'bold'}}>
            SELECT
          </Subheading>
        </Card.Actions>
      </Card>
    </View>
  );
};

export default QuestionCard;

const styles = StyleSheet.create({});
