import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {LogBox} from 'react-native';
// Screens
import QuestionBank from './src/screens/Teacher/QuestionBank';
import MyComponent from './src/screens/Test';

import StudentHomeScreen from './src/screens/Student/StudentHomeScreen';
import QuizScreen from './src/screens/Student/QuizScreen';

import Login from './src/screens/Login';
import TeacherHomeScreen from './src/screens/Teacher/TeacherHomeScreen';
import MCQSScreen from './src/screens/Teacher/MCQSScreen';
import QuizDetailScreen from './src/screens/Teacher/QuizDetailScreen';
import Results from './src/screens/Results';
import Test from './src/screens/Test';
import StudentResults from './src/screens/Student/StudentResults';
import QuizBank from './src/screens/Teacher/QuizBank';

const Stack = createNativeStackNavigator();

const App = () => {
  LogBox.ignoreAllLogs(true);
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="TeacherHome" component={TeacherHomeScreen} />
        <Stack.Screen name="QuizDetail" component={QuizDetailScreen} />
        <Stack.Screen name="MCQS" component={MCQSScreen} />
        <Stack.Screen name="Questions" component={QuestionBank} />

        <Stack.Screen name="StudentHome" component={StudentHomeScreen} />
        <Stack.Screen name="Quiz" component={QuizScreen} />
        <Stack.Screen name="My" component={MyComponent} />
        <Stack.Screen name="Results" component={Results} />
        <Stack.Screen name="Test" component={Test} />
        <Stack.Screen name="StudentResult" component={StudentResults} />
        <Stack.Screen name="QuizBank" component={QuizBank} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
