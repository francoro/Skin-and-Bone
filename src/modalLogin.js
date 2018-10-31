import * as React from 'react';
import { Component } from "react";
import Overlay from 'react-native-modal-overlay';
import { Text } from 'react-native';

export default class ModalLogin extends Component {
    constructor(props) {
        super(props);
    }
    render() {   
        return (
            <Overlay visible={this.props.modalVisible}
                closeOnTouchOutside animationType="zoomIn"
                containerStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
                childrenWrapperStyle={{ backgroundColor: '#eee' }}
                animationDuration={500}
                onClose={() => this.props.setModalClose() }>

                <Text>Some Modal Content</Text>

            </Overlay>
        )
    }
}