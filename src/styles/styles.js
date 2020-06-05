import {Dimensions} from 'react-native';
export default {
  parentView: {flex: 1, backgroundColor: '#fbfbfb'},
  switchComponent: {
    flexDirection: 'row',
    width: Dimensions.get('window').width,
    alignSelf: 'center',
    justifyContent: 'center',
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#efefef',
    backgroundColor: 'white',
    elevation: 2,
  },
  header: {
    backgroundColor: 'white',
    justifyContent: 'center',
    height: 50,
  },
  selectedView: {
    fontSize: 15,
    alignSelf: 'center',
    color: 'skyblue',
    fontWeight: 'bold',
    fontFamily: 'sans-serif-condensed',
  },
  notSelectedView: {
    fontSize: 15,
    alignSelf: 'center',
    color: 'skyblue',
    fontWeight: 'bold',
    fontFamily: 'sans-serif-condensed',
  },
};
