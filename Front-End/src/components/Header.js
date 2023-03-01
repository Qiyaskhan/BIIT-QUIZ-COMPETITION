import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Appbar} from 'react-native-paper';

const Header = props => {
  let routeName = props.routName;
  let value = props.value;
  return (
    <Appbar.Header style={styles.container}>
      <Appbar.BackAction
        onPress={() => navigation.navigate(props.screen, {routeName: value})}
      />
      <Appbar.Content title={props.Name} />
    </Appbar.Header>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#b0e0e6',
  },
});
