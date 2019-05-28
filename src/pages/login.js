/**
 * 
 * 登录页面
 */

import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View
} from 'react-native';
import {connect} from 'react-redux';

class Login extends Component{
    constructor(props) {
        super(props);
        console.log(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>
                    这是登录页面
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f3ec',
    },
});

const mapStateToPorops = (state,ownProps) => {
    return {
        post: state.post
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        
    }
}

// 通过connect链接组件和redux数据
export default connect(mapStateToPorops)(Login)
