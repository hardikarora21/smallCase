import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TouchableWithoutFeedback,
  ScrollView,
  View,
  Text,
  StatusBar,
  Dimensions,
  Alert,
  FlatList,
  Switch,
  ActivityIndicator,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import axios from 'axios';
import styles from './src/styles/styles';

export default class App extends React.Component {
  state = {
    Data: [],
    count: 20,
    offset: 0,
    value: false,
    ExpandIndex: '',
    BonusView: false,
  };
  componentDidMount() {
    this.call_Api(this.state.count, this.state.offset);
  }
  call_Api = (count, offset) => {
    axios
      .get(
        'https://api.smallcase.com/news/getNews?count=' +
          count +
          '&offset=' +
          offset,
      )
      .then(ResponseJes => {
        this.setState({Data: ResponseJes.data});
      })
      .catch(error => {
        Alert.alert(
          'Error',
          'Something went wrong, Please try again' +
            `\n` +
            'Error Code: ' +
            error,
        );
      });
  };
  show_PerfectDateFormat = Date => {
    var CorrectDate = Date.substring(0, 10);
    var cor = CorrectDate.split('-');
    cor = cor.reverse();
    CorrectDate = cor.join('');
    var day = CorrectDate.substring(0, 2);
    var month = CorrectDate.substring(2, 4);
    var year = CorrectDate.substring(4, 8);
    if (month == '01') {
      month = ' January ';
    } else if (month == '02') {
      month = ' February ';
    } else if (month == '03') {
      month = ' March ';
    } else if (month == '04') {
      month = ' April ';
    } else if (month == '05') {
      month = ' May ';
    } else if (month == '06') {
      month = ' June ';
    } else if (month == '07') {
      month = ' July ';
    } else if (month == '08') {
      month = ' August ';
    } else if (month == '09') {
      month = ' September ';
    } else if (month == '10') {
      month = ' October ';
    } else if (month == '11') {
      month = ' November ';
    } else if (month == '12') {
      month = ' December ';
    }
    return day + month + year;
  };
  valueChange = () => {
    if (this.state.value == true) {
      this.setState({value: false});
    } else {
      this.setState({value: true});
    }
  };
  comfortableView = ({item, index}) => {
    return (
      <TouchableWithoutFeedback onPress={() => this.bonusView(index)}>
        <View
          style={{
            width: Dimensions.get('window').width,
            height: 300,
            overflow: 'hidden',
            justifyContent: 'space-between',
            marginTop: 10,
            borderRadius: 8,
          }}>
          <View
            style={{
              backgroundColor: '#efefef',
              width: '96%',
              alignSelf: 'center',
              overflow: 'hidden',
              borderRadius: 8,
              height: 280,
            }}>
            <FastImage
              style={{
                height: '60%',
                width: '100%',
                alignSelf: 'center',
              }}
              resizeMode={'center'}
              source={{uri: item.imageUrl}}
            />
            {this.state.ExpandIndex == index && this.state.BonusView == true ? (
              <View>
                <Text
                  style={{
                    textAlign: 'left',
                    fontWeight: 'bold',
                    paddingHorizontal: 10,
                    marginTop: 5,
                    fontSize: 15,
                    color: 'black',
                    fontFamily: 'sans-serif-condensed',
                  }}>
                  {item.headline}
                </Text>
                <Text
                  style={{
                    textAlign: 'left',
                    paddingHorizontal: 10,
                    marginTop: 5,
                    color: '#a7a7a7',
                    fontFamily: 'sans-serif-condensed',
                    fontSize: 12,
                  }}>
                  {item.summary}
                </Text>
              </View>
            ) : (
              <View>
                <Text
                  numberOfLines={2}
                  style={{
                    textAlign: 'left',
                    fontWeight: 'bold',
                    paddingHorizontal: 10,
                    marginTop: 5,
                    fontSize: 15,
                    color: 'black',
                    fontFamily: 'sans-serif-condensed',
                  }}>
                  {item.headline}
                </Text>
                <Text
                  numberOfLines={3}
                  style={{
                    textAlign: 'left',
                    paddingHorizontal: 10,
                    marginTop: 5,
                    color: '#a7a7a7',
                    fontFamily: 'sans-serif-condensed',
                    fontSize: 12,
                  }}>
                  {item.summary}
                </Text>
              </View>
            )}
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  };
  compactView = ({item}) => {
    return (
      <View
        style={{
          width: '50%',
          height: 150,
          overflow: 'hidden',
          justifyContent: 'center',
          marginTop: 10,
          borderRadius: 8,
        }}>
        <View
          style={{
            backgroundColor: '#efefef',
            width: '96%',
            alignSelf: 'center',
            overflow: 'hidden',
            borderRadius: 8,
            height: 280,
          }}>
          <View
            style={{
              height: '65%',
              width: '100%',
              justifyContent: 'center',
              alignSelf: 'center',
            }}>
            <FastImage
              style={{
                height: '80%',
                width: '100%',
                marginTop: 10,
                alignSelf: 'center',
              }}
              resizeMode={'center'}
              source={{uri: item.imageUrl}}
            />
          </View>

          <Text
            style={{
              textAlign: 'center',
              color: '#a7a7a7',
              marginTop: 5,
              fontFamily: 'sans-serif',
            }}
            numberOfLines={2}>
            created on :{' '}
            <Text
              style={{
                textAlign: 'center',
                fontWeight: 'bold',
                marginTop: 5,
                color: 'black',
                fontFamily: 'sans-serif-condensed',
              }}>
              {this.show_PerfectDateFormat(item.createdAt)}
            </Text>
          </Text>
        </View>
      </View>
    );
  };
  endReached = () => {
    this.setState({
      count: this.state.count + 20,
    });
    this.call_Api(this.state.count, this.state.offset);
  };
  bonusView = index => {
    if (this.state.BonusView) {
      this.setState({BonusView: false});
    } else {
      this.setState({ExpandIndex: index, BonusView: true});
    }
  };
  render() {
    if (this.state.Data.length > 0) {
      return (
        <View style={{flex: 1, backgroundColor: '#efefef'}}>
          <ActivityIndicator
            size={30}
            style={{marginVertical: 20, height: 30}}
            color={'#deebff'}
          />
        </View>
      );
    } else {
      return (
        <View
          style={[
            this.state.BonusView
              ? {backgroundColor: '#ebf4ff'}
              : styles.parentView,
          ]}>
          <StatusBar barStyle={'dark-content'} backgroundColor={'white'} />
          <View style={styles.header}>
            <FastImage
              source={require('./src/assets/smallcase.png')}
              style={{height: 46, width: 70, alignSelf: 'center'}}
              resizeMode="contain"
            />
          </View>

          <View
            style={[
              styles.switchComponent,
              {flexDirection: 'row', alignSelf: 'center'},
            ]}>
            <Text
              style={[
                this.state.value == false
                  ? {color: '#207ce4'}
                  : {color: 'darkgray'},
                {
                  fontSize: 15,
                  alignSelf: 'center',
                  fontWeight: 'bold',
                  fontFamily: 'sans-serif-condensed',
                },
              ]}>
              Comfortable
            </Text>
            <View
              style={{
                width: 70,
                alignSelf: 'center',
                justifyContent: 'center',
              }}>
              <Switch
                style={{alignSelf: 'center'}}
                value={this.state.value}
                onValueChange={() => this.valueChange()}
                thumbColor={'#207ce4'}
                trackColor={'darkblue'}
                tintColor={'#207ce4'}
              />
            </View>

            <Text
              style={[
                this.state.value == true
                  ? {color: '#207ce4'}
                  : {color: 'darkgray'},
                {
                  fontSize: 15,
                  alignSelf: 'center',
                  fontWeight: 'bold',
                  fontFamily: 'sans-serif-condensed',
                  marginLeft: -5,
                },
              ]}>
              Compact
            </Text>
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            {this.state.value == false ? (
              <View>
                <FlatList
                  data={this.state.Data.data}
                  style={{
                    width: Dimensions.get('window').width,
                  }}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{
                    justifyContent: 'space-between',
                  }}
                  onEndReached={() => this.endReached()}
                  onEndReachedThreshold={0.1}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={this.comfortableView}
                />
              </View>
            ) : (
              <FlatList
                data={this.state.Data.data}
                style={{width: Dimensions.get('window').width}}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{justifyContent: 'space-between'}}
                numColumns={2}
                onEndReached={() => this.endReached()}
                onEndReachedThreshold={0.1}
                keyExtractor={(item, index) => index.toString()}
                renderItem={this.compactView}
              />
            )}
            <ActivityIndicator
              size={30}
              style={{marginVertical: 20, height: 30}}
              color={'skyblue'}
            />
          </ScrollView>
        </View>
      );
    }
  }
}
