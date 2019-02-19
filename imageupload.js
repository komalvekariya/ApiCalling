import React, { Component } from 'react'
import { View, Text, ActivityIndicator, TouchableOpacity, Button, Image } from 'react-native'
import ImagePicker from 'react-native-image-picker'


export default class imageupload extends Component {

    constructor(props) {
        super(props)
        this.state = {
            photo: null,

        }
    }

    handleselect = () => {
        let data = new FormData();
        const h = {};
        h.Accept = 'application/json';
        console.warn('photo', this.state.photo.uri)
        data.append('file', this.state.photo.uri)
        return fetch('https://pictshare.net/api/upload.php', { method: 'POST', headers: h, body: data })
            .then((response) => response.json())
            .then((responseJson) => {
                alert('uploaded ...', responseJson)
            })
            .catch((error) => {
                console.error(error);
            });
    }

    handleChoosePhoto = () => {
        const options = {
            noData: true,
        }
        ImagePicker.launchImageLibrary(options, response => {
            if (response.uri) {
                this.setState({ photo: response })
            }
        })
    }


    render() {
        const { photo } = this.state

        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                {photo && (
                    <React.Fragment>
                        <Image
                            source={{ uri: photo.uri }}
                            style={{ width: 300, height: 300 }}
                        />
                        <Button title="Upload" onPress={this.handleselect} />
                    </React.Fragment>
                )}
                <Button title="Choose Photo" onPress={this.handleChoosePhoto} />

                <TouchableOpacity onPress={() => this.props.navigation.navigate('fetchData',{})}>
                    <Text>ShowPhoto</Text>
                </TouchableOpacity>
            </View> 
        )
    }
}
