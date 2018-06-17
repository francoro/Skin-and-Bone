import React, { Component } from 'react';
import { Button, StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Popover, PopoverController } from 'react-native-modal-popover';

const styles = StyleSheet.create({
    content: {
      padding: 16,
      backgroundColor: 'pink',
      borderRadius: 8,
    },
    arrow: {
      borderTopColor: 'pink',
    },
    background: {
      backgroundColor: 'rgba(0, 0, 255, 0.5)'
    },
  });

export class ButtonsHome extends Component {
    
    render() {
        return (
            <View>
            <PopoverController>
              {({ openPopover, closePopover, popoverVisible, setPopoverAnchor, popoverAnchorRect }) => (
                <View>
                  <Button title="Press me!" ref={setPopoverAnchor} onPress={openPopover} />
                  <Popover 
                    contentStyle={styles.content}
                    arrowStyle={styles.arrow}
                    backgroundStyle={styles.background}
                    visible={popoverVisible}
                    onClose={closePopover}
                    fromRect={popoverAnchorRect}
                    supportedOrientations={['portrait', 'landscape']}
                  >
                    <Text>Hello from inside popover!</Text>
                  </Popover>
                </View>
              )}
            </PopoverController>
          </View>
        );
    }
} 
{/* <View>
<TouchableHighlight onPress={this.openFilterTypeModal}>
    <Icon name="md-options" size={18} />
</TouchableHighlight>
</View> */}