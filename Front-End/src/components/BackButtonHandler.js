import {useEffect} from 'react';
import {BackHandler, Alert} from 'react-native';

const BackButtonHandler = () => {
  /* Warning Student On Pressing Back Button During Exam*/

  useEffect(() => {
    const backAction = () => {
      Alert.alert(
        'Warning!',
        'Once Paper Starts You Can Not Go Back!!!, You Must Submit Your Paper',
        [
          {
            text: 'Ok',
            onPress: () => null,
            style: 'Ok',
          },
        ],
      );
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);
};

export default BackButtonHandler;
