import React, { useContext, useState } from 'react';
import { AuthContext } from '../../navigation/AuthProvider';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FormButton from '../../components/FormButton';
import CustomInput from '../../components/CustomInput';
import { connect, useSelector } from 'react-redux';
import { GREY, PURPLE, WHITE } from '../../utils/colors';
import { heightPercentageToDP, widthPercentageToDP } from '../../utils/sizes';
import CheckBox from '@react-native-community/checkbox';
import Storage from '../../services/Storage';
import { fetchGroups } from '../../actions';
import CustomButton from '../../components/CustomButton';

function CreateGroupScreen({fetchGroups, navigation}) {
  const { user } = useContext(AuthContext);
  const [group_name, setGroupName] = useState('');
  const [group_members, setGroupMembers] = useState([]);
  const employees = useSelector(({ employees }) => employees.employees)

  const saveGroup = () => {
    Storage.getGroups()
    .then(res => {
      let tmp_arr = res ? JSON.parse(res) : [];
      tmp_arr.push({group_name, group_members, user_id: user.uid});
      Storage.setGroups(JSON.stringify(tmp_arr)).then(() => {
        fetchGroups(user.uid);
        navigation.navigate('Home')
      });
    })
  }

  const addOrRemoveToGroupMembers = (newValue, index) => {
    if (newValue) {
      setGroupMembers([...group_members, index])
    } else {
      setGroupMembers(group_members.filter(item => item != index))
    }
  }

  function renderItem(item) {
    return (
      <View key={item.index} style={styles.employee}>
        <Text>{item.item.first_name} {item.item.last_name}</Text>
        <View style={{width: widthPercentageToDP('60'), display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
          <CustomButton
            buttonStyle={{...styles.buttonContainer, backgroundColor: GREY}}
            buttonTitle='Info'
            buttonTextStyle={styles.buttonText}
            onPress={() => navigation.navigate('Member', {index: item.index})}
          />
          <View style={{display:'flex', flexDirection: 'row', alignItems: 'center'}}>
            <Text>Add to group</Text>
            <CheckBox
              disabled={group_members.length >= 5 && !group_members.includes(item.index)}
              value={group_members.includes(item.index)}
              onValueChange={newValue => addOrRemoveToGroupMembers(newValue, item.index)}
            />
          </View>
        </View>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon color={GREY} name="arrow-left" size={widthPercentageToDP('10')}/>
      </TouchableOpacity>
      <CustomInput value={group_name} onChange={name => setGroupName(name)} labelValue='Group Name'/>
      <Text style={styles.text}>Select Group Members (Max 5)</Text>
      <View style={styles.listContainer}>
        <FlatList
          bounces={false}
          style={styles.employeesList}
          data={employees}
          renderItem={(item) => renderItem(item)}
          keyExtractor={(item) => item.index}
          numColumns={1}
          extraData={employees}
        />

      </View>
      <View style={{display: 'flex', alignItems: 'center'}}>
        <FormButton
          buttonContainerStyle={{backgroundColor: (!group_name.length || !group_members.length) ? GREY : PURPLE}}
          buttonTitle='Add group'
          onPress={saveGroup}
          disabled={!group_name.length || !group_members.length}
        />
      </View>
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

export default connect(null, {fetchGroups})(CreateGroupScreen);
