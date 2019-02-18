import React from 'react';
import { FlatList, StyleSheet,PixelRatio,TouchableOpacity,ActivityIndicator, Text, View, Image } from 'react-native';
import ImagePicker from 'react-native-image-picker';

var FileUpload = require('NativeModules').FileUpload;
export default class FetchExample extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      avatarSource: null,
      imgBase64: '',
    }
  }

  selectPhotoTapped() {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true
      }
    };


    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);
     
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: response.uri };
     
        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
     
        this.setState({
          avatarSource: source,
        });
      }
    });
  }

  upload() {
    console.log("click");
    var obj = {
      uploadUrl: 'http://pttkht.esy.es/uphinhanh.php',
      method: 'POST', // default 'POST',support 'POST' and 'PUT'
      headers: {
        'Accept': 'application/json',
      },
      fields: {
        'img': this.state.imgBase64,
      },
      files: [

      ]

    };
    FileUpload.upload(obj, function (err, result) {
      console.log('upload:', err, result);
      if (err == null) {
        Alert.alert(
          'Thong Bao',
          'Upload thanh cong',
          [
            { text: 'OK', onPress: () => console.log('OK Pressed') },
          ]
        )
      } else {
        Alert.alert(
          'Thong Bao',
          err,
          [
            { text: 'OK', onPress: () => console.log('OK Pressed') },
          ]
        )
      }

    })
  }


  //   componentDidMount() {

  //     var imagePath = './image.png'
  // console .warn(imagePath)
  //     let body = new FormData();
  //     body.append('photo', { uri: imagePath, name: 'photo.png', filename: 'imageName.png', type: 'image/png' });
  //     body.append('Content-Type', 'image/png');

  //     fetch(' https://pictshare.net/api/upload.php', {
  //       method: 'POST', headers: {
  //         "Content-Type": "multipart/form-data",
  //         "otherHeader": "foo",
  //       }, body: body
  //     })
  //       .then((res) => checkStatus(res))
  //       .then((res) => res.json())
  //       .then((res) => { console.log("response" + JSON.stringify(res)); })
  //       .catch((e) => console.log(e))
  //       .done()

  // return fetch('https://reqres.in/api/users/2')
  //   .then((response) => response.json())
  //   .then((responseJson) => {

  //     this.setState({
  //       isLoading: false,
  //       dataSource: responseJson,
  //     }, function () {

  //     });

  //   })
  //   .catch((error) => {
  //     console.error(error);
  //   });


render() {
  // const { dataSource } = this.state
  // if (this.state.isLoading) {
  //   return (
  //     <View style={{ flex: 1, padding: 20 }}>
  //       <ActivityIndicator />
  //     </View>
  //   )
  // }

  return (
    // <View style={{ flex: 1, paddingTop: 20 }}>
    //   {/* <FlatList
    //       data={this.state.dataSource}
    //       renderItem={({item}) => <Text>{item}</Text>}
    //       keyExtractor={({id}, index) => id}
    //     /> */}
    //   <Text>{dataSource.data.first_name} {dataSource.data.last_name}  </Text>
    //   <Image
    //     source={{ uri: `${dataSource.data.avatar}` }}
    //     style={{ height: 100, width: 100 }}
    //   />
    //   {/* <FlatList
    //       data={this.state.dataSource}
    //       renderItem={({item}) => <Text>{item}</Text>}
    //       keyExtractor={({id}, index) => id}
    //     /> */}
    // </View>


    <View style={styles.container}>
    <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
      <View style={[styles.avatar, styles.avatarContainer, {marginBottom: 20}]}>
      { this.state.avatarSource === null ? <Text>Select a Photo</Text> :
        <Image style={styles.avatar} source={this.state.avatarSource} />
      }
      </View>
    </TouchableOpacity>

    <TouchableOpacity style={{backgroundColor:'yellow', width:60, height:20,marginTop:20,justifyContent: 'center',
    alignItems: 'center'}} onPress={this.upload.bind(this)}>
      <Text>Upload</Text>
    </TouchableOpacity>

    <TouchableOpacity style={{backgroundColor:'yellow',width:60, height:20, marginTop:20,justifyContent: 'center',
    alignItems: 'center'}} onPress={this.props.cancel}>
      <Text>Cancel</Text>
    </TouchableOpacity>

  </View> 
  );
}
}


const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  avatarContainer: {
    borderColor: '#9B9B9B',
    borderWidth: 1 / PixelRatio.get(),
    justifyContent: 'center',
    alignItems: 'center'
  },
  avatar: {
    borderRadius: 75,
    width: 150,
    height: 150
  }

});