
import React,{Component} from 'react';
import{createAppContainer,createStackNavigator} from 'react-navigation'
import fetchData from './fetchData';
import imageupload from './imageupload';

const navigator = createStackNavigator({
    fetchData: { screen: fetchData},
    imageupload: { screen: imageupload},
    },{
      initialRouteName:'fetchData'
    })


    const AppNavigator =createAppContainer(navigator)
class Nav extends Component{
    render(){
        return(
            <navigator/>
        )
    }
}

export default AppNavigator;