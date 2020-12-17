import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector } from 'react-redux';
import { GREY, WHITE } from '../../utils/colors';
import { heightPercentageToDP, widthPercentageToDP } from '../../utils/sizes';

export default  function GroupScreen({navigation, route}) {
  const [group, setGroup] = useState({});
  const [group_employees, setGroupEmployees] = useState([]);
  const groups = useSelector(({ groups }) => groups.groups)
  const employees = useSelector(({ employees }) => employees.employees)

  useEffect(() => {
    const { group_index } = route.params;
    setGroup(groups[group_index]);
    let tmp_arr = []
    groups[group_index].group_members.map(index => {
      tmp_arr.push(employees[index])
    })
    setGroupEmployees(tmp_arr)
  }, [])

  return (
    <View style={styles.container}>
      <View style={{display: 'flex', flexDirection: 'row',  alignItems: 'center', marginBottom: heightPercentageToDP('5')}}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon color={GREY} name="arrow-left" size={widthPercentageToDP('10')}/>
        </TouchableOpacity>
        <Text style={{...styles.text, marginLeft: widthPercentageToDP('25')}}>Group Info</Text>
      </View>
      <Text style={styles.text}>Group Name: {group.group_name}</Text>
      <Text style={styles.text}>Employees:</Text>
      { group_employees.map(employee => (
          <Text style={styles.text}>{employee.first_name} {employee.last_name} {employee.job_title}</Text>
        ))
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: heightPercentageToDP('5'),
    paddingHorizontal: widthPercentageToDP('2'),
    backgroundColor: '#f5f5f1',
  },
  listContainer: {
    height: heightPercentageToDP('60'),
  },
  employee: {
    borderWidth: 2,
    display: 'flex',
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: 'space-between',
    height: widthPercentageToDP('15'),
    borderRadius: widthPercentageToDP('10')/2,
    borderColor: GREY,
    marginVertical: widthPercentageToDP('1'),
    paddingHorizontal: widthPercentageToDP('1')
  },
  text: {
    fontSize: 20,
    color: '#333333'
  },
  buttonContainer: {
    marginTop: 10,
    width: widthPercentageToDP('20'),
    height: widthPercentageToDP('10'),
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8
  },
  buttonText: {
    color: WHITE,
  }
});
