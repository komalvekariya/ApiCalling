import React from 'react';
import { FlatList, ActivityIndicator, Text, View, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';

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
          Product_Name: '',
          Product_Number: '',
          Product_Details: '',

        });
      })
      .catch((error) => {
        console.error(error);
      });
  }


  Insert_Data_Into_MySQL = () => {
    this.setState({ ActivityIndicator_Loading: true }, () => {
      fetch('https://reactnativecode.000webhostapp.com/Insert_Product.php',
        {
          method: 'POST',
          headers:
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(
            {
              product_name: this.state.Product_Name,

              product_number: this.state.Product_Number,

              product_details: this.state.Product_Details

            })

        }).then((response) => response.json()).then((responseJsonFromServer) => {
          alert(responseJsonFromServer);
          //  console.warn(product_name)
          this.setState({ ActivityIndicator_Loading: false }); 

        }).catch((error) => {
          console.error(error);

          this.setState({ ActivityIndicator_Loading: false });
        });
    });
  }

  render() {
    const { dataSource } = this.state
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, marginTop: 200 }}>
          <ActivityIndicator size="large" color="#00ff00" />
        </View>
      )
    }

    return (
      <View style={{ flex: 1, marginTop: 100 }}>

        <Text style={{ color: 'white', fontSize: 40 }}>{dataSource.data.first_name} {dataSource.data.last_name}  </Text>
        <Image
          source={{ uri: `${dataSource.data.avatar}` }}
          style={{ height: 100, width: 100 }}
        />
        {/* <FlatList
          data={this.state.dataSource}
          renderItem={({item}) => <Text>{item}</Text>}
          keyExtractor={({id}, index) => id}
        /> */}

        <View style={{ flex: 1, marginTop: 100 }}>
          <TextInput
            placeholder="Enter Product Name"
            style={styles.TextInputStyleClass}
            underlineColorAndroid="transparent"
            onChangeText={(TextInputText) => this.setState({ Product_Name: TextInputText })} />

          <TextInput
            placeholder="Enter Product Number"
            style={styles.TextInputStyleClass}
            underlineColorAndroid="transparent"
            onChangeText={(TextInputText) => this.setState({ Product_Number: TextInputText })} />

          <TextInput
            placeholder="Enter Product Details"
            style={styles.TextInputStyleClass}
            underlineColorAndroid="transparent"
            onChangeText={(TextInputText) => this.setState({ Product_Details: TextInputText })} />

          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.TouchableOpacityStyle}
            onPress={this.Insert_Data_Into_MySQL}>

            <Text style={styles.TextStyle}>Insert Data Into MySQL Database</Text>

          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create(
  {
    MainContainer:
    {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      margin: 20

    },

    TextInputStyleClass:
    {

      textAlign: 'center',
      height: 40,
      backgroundColor: "#fff",
      borderWidth: 1,
      borderColor: '#009688',
      borderRadius: 7,
      marginBottom: 10,
      width: '95%'
    },

    TouchableOpacityStyle:
    {
      paddingTop: 10,
      paddingBottom: 10,
      backgroundColor: '#009688',
      marginBottom: 20,
      width: '90%'
    },

    TextStyle:
    {
      color: '#fff',
      textAlign: 'center',
      fontSize: 18
    },

    ActivityIndicatorStyle: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      alignItems: 'center',
      justifyContent: 'center'

    }
  });