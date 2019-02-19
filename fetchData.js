import React from 'react';
import { FlatList, StyleSheet, PixelRatio, Button, TouchableOpacity, ActivityIndicator, Text, View, Image } from 'react-native';



export default class fetchData extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            avatarSource: null,
            dataSource: []
        }
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
                <View style={{ flex: 1, padding: 20 }}>
                    <ActivityIndicator />
                </View>
            )
        }

        return (
            <View style={{ flex: 1, paddingTop: 80, alignItems: 'center' }}>
                <Text style={{ color: 'red', fontSize: 20 }}>{dataSource.data.first_name}{dataSource.data.last_name}</Text>
               
               <TouchableOpacity onPress={() => this.props.navigation.navigate('imageupload')}>
                <Image
                    source={{ uri: `${dataSource.data.avatar}` }}
                    style={{ height: 100, width: 100,borderRadius:50, }}
                />
               </TouchableOpacity>
                
                {/* <FlatList
            data={this.state.dataSource}
            renderItem={({item}) => <Text>{item}</Text>}
            keyExtractor={({id}, index) => id}
          /> */}
            </View>

        )
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
