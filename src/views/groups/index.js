import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { connect, useSelector } from 'react-redux';
import { heightPercentageToDP, widthPercentageToDP } from '../../utils/sizes';
import { GREY, RED, WHITE } from '../../utils/colors';
import CustomButton from '../../components/CustomButton';
import { deleteGroup } from '../../actions';
import { AuthContext } from '../../navigation/AuthProvider';

function GroupsScreen({deleteGroup, navigation}) {
  const { user } = useContext(AuthContext)
  const groups = useSelector(({ groups }) => groups.groups)

  function removeGroup(item) {
    deleteGroup(item.index, user.uid)
  }
  
  function renderItem(item) {
    return (
      <View key={item.index} style={styles.group}>
        <Text style={styles.text}>{item.item.group_name}</Text>
        <View style={{width: widthPercentageToDP('45'), display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
          <CustomButton
            buttonStyle={{...styles.buttonContainer, backgroundColor: GREY}}
            buttonTitle='Info'
            buttonTextStyle={styles.buttonText}
            onPress={() => navigation.navigate('Group', {group_index: item.index})}
            />
          <CustomButton
            buttonStyle={{...styles.buttonContainer, backgroundColor: RED}}
            buttonTitle='Delete'
            buttonTextStyle={styles.buttonText}
            onPress={() => removeGroup(item)}
          />
        </View>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Groups List</Text>
      <View style={styles.listContainer}>
        <FlatList
          bounces={false}
          data={groups}
          renderItem={(item) => renderItem(item)}
          keyExtractor={(item) => item.index}
          numColumns={1}
          extraData={groups}
          ListEmptyComponent={() => <Text style={{marginTop: heightPercentageToDP('30'), alignSelf: 'center', fontSize: 20}}>You have not any group</Text>}
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
    backgroundColor: '#f5f5f1'
  },
  listContainer: {
    marginTop: heightPercentageToDP('5')
  },
  text: {
    fontSize: 20,
    color: '#333333'
  },
  group: {
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

export default connect(null, { deleteGroup })(GroupsScreen);
