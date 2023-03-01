import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Table, Row, Rows} from 'react-native-table-component';

const TableData = props => {
  let widthArr = [120, 120, 120, 120, 120];
  return (
    <View>
      <Table borderStyle={{borderWidth: 2}}>
        <Row
          data={tableHead}
          widthArr={widthArr}
          style={styles.head}
          textStyle={[styles.text, {fontWeight: 'bold'}]}
        />
        <Rows
          data={props.tableData}
          textStyle={styles.text}
          widthArr={widthArr}
        />
      </Table>
    </View>
  );
};

export default TableData;

const styles = StyleSheet.create({
  head: {height: 40, backgroundColor: '#b0e0e6'},
  text: {
    margin: 6,
    textAlign: 'center',
    backgroundColor: '#00ced1',
  },
});
