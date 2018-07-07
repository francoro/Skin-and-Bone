import React, { Component } from 'react';
import { Button, StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Popover, PopoverController } from 'react-native-modal-popover';
import { RadioGroup, RadioButton } from 'react-native-flexi-radio-button'
import * as actions from "./actions";
import {connect} from 'react-redux';


class ButtonsHome extends Component {
  onSelect(index, value) {
    this.props.selected_date_filter(value)
  }


  render() {
    return (
      <View>
        <PopoverController>
          {({ openPopover, closePopover, popoverVisible, setPopoverAnchor, popoverAnchorRect }) => (
            <View>
              <TouchableHighlight ref={setPopoverAnchor} onPress={openPopover}>
                <Icon name="md-options" size={18} />
              </TouchableHighlight>
              <Popover
                contentStyle={styles.content}
                arrowStyle={styles.arrow}
                backgroundStyle={styles.background}
                visible={popoverVisible}
                onClose={closePopover}
                fromRect={popoverAnchorRect}
                supportedOrientations={['portrait', 'landscape']}
              >
                <View>
                  <RadioGroup
                    onSelect={(index, value) => this.onSelect(index, value)}
                    selectedIndex={this.props.dateFilter}
                  >
                    <RadioButton value={0} >
                      <Text>Todos</Text>
                    </RadioButton>

                    <RadioButton value={1}>
                      <Text>Hace 1 semana</Text>
                    </RadioButton>

                    <RadioButton value={2}>
                      <Text>Hace 2 semanas</Text>
                    </RadioButton>

                    <RadioButton value={3}>
                      <Text>Hace 3 semanas</Text>
                    </RadioButton>

                    <RadioButton value={4}>
                      <Text>Hace 1 mes o más</Text>
                    </RadioButton>
                  </RadioGroup>
                </View>
              </Popover>
            </View>
          )}
        </PopoverController>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  content: {
    padding: 16,
    backgroundColor: 'pink',
    borderRadius: 8,
  },
  arrow: {
    opacity: 0,
  },
  background: {
    backgroundColor: 'rgba(0, 0, 255, 0.5)'
  },
});

const mapStateToProps = state => {
  return {dateFilter: state.dateFilter}
}

export default connect(mapStateToProps, actions)(ButtonsHome);