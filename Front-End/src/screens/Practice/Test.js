import {
  StyleSheet,
  Text,
  View,
  Alert,
  ActivityIndicator,
  Button,
  FlatList,
} from 'react-native';
import React, {useState, useEffect} from 'react';

const Test = () => {
  /* Alert Practice */

  /*Alert.alert('Warning!', `Click On Of The Following...`, [
    {
      text: 'CANCEL',
      onPress: () => null,
      style: 'CANCEL',
    },
    {
      text: 'Ok',
      onPress: () => null,
      style: 'Ok Select Randomly',
    },
  ]);
  Alert.alert('Please Fill All The Fields!');
  */

  const [myList, setMyList] = useState([1, 2, 3, 4, 5]);
  const [list2, setList2] = useState([
    {
      Name: 'Osama',
      Age: 23,
    },
    {
      Name: 'Gul Hussain',
      Age: 27,
    },
    {
      Name: 'Zeeshan',
      Age: 26,
    },
  ]);

  //   let list1 = [1, 2, 3, 4, 5];
  //   list1.push(1);

  //   let [counter, setCounter] = useState(0);

  //   let c = 0;

  //   function myFunc() {
  //     c++;
  //     setCounter(c);
  //     console.log(counter);
  //     // setMyList([...myList, 6]);
  //   }

  //   let data = FormData();
  //   data.append('Name', 'Osama');

  //   var requestOptions = {
  //     method: 'POST',
  //     body: data,
  //   };

  //   fetch(ipAddress + 'getSubjects', requestOptions)
  //     .then(response => response.json())
  //     .then(result => setSubjectList(result))
  //     .catch(error => console.log('error', error))
  //     .finally(() => {});

  return (
    <View>
      <Button title="Click Me!" />
      <FlatList
        data={list2}
        renderItem={({item}) => {
          return (
            <View>
              <Text>{item.Name}</Text>
              <Text>{item.Age}</Text>
            </View>
          );
        }}
      />
    </View>
  );
};

export default Test;

const styles = StyleSheet.create({});
