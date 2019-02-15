import React from 'react';
import { FlatList, ActivityIndicator, Text, View, Image } from 'react-native';

export default class FetchExample extends React.Component {

  constructor(props) {
    super(props);
    this.state = { isLoading: true }
  }

  componentDidMount() {
    return fetch('https://reqres.in/api/users/2')
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          dataSource: responseJson,
        }, function () {

        });

      })
      .catch((error) => {
        console.error(error);
      });
  }
  render() {
    const { dataSource } = this.state
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, marginTop: 200 }}>
          <ActivityIndicator size="large" color="#00ff00"/>
        </View>
      )
    }

    return (
      <View style={{ flex: 1, marginTop: 100 }}>

        <Text style={{color:'white',fontSize:40}}>{ dataSource.data.first_name} {dataSource.data.last_name}  </Text>
        <Image
          source={{ uri: `${dataSource.data.avatar}` }}
          style={{ height: 100, width: 100 }}
        />
        {/* <FlatList
          data={this.state.dataSource}
          renderItem={({item}) => <Text>{item}</Text>}
          keyExtractor={({id}, index) => id}
        /> */}
      </View>
    );
  }
}