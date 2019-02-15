import React from 'react';
import { FlatList, ActivityIndicator, Text, View , Image } from 'react-native';

export default class FetchExample extends React.Component {

  constructor(props){
    super(props);
    this.state ={ isLoading: true}
  }

  componentDidMount(){
    return fetch('https://reqres.in/api/users/2')
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          dataSource: responseJson,
        }, function(){

        });

      })
      .catch((error) =>{
        console.error(error);
      });
  }
  render(){
    const {dataSource}=this.state
    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }

    return(
      <View style={{flex: 1, paddingTop:20}}>
        {/* <FlatList
          data={this.state.dataSource}
          renderItem={({item}) => <Text>{item}</Text>}
          keyExtractor={({id}, index) => id}
        /> */}
        {/* <Text>{dataSource.data.first_name} {dataSource.data.last_name}  </Text>
        <Image 
        source={{uri: `${dataSource.data.avatar}`}}
          style={{height:100,width:100}}
        /> */}
          {/* <FlatList
          data={this.state.dataSource}
          renderItem={({item}) => <Text>{item}</Text>}
          keyExtractor={({id}, index) => id}
        /> */}
      </View>
    );
  }
}