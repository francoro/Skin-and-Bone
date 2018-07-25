import React, { Component } from 'react';
import { Button, StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Popover, PopoverController } from 'react-native-modal-popover';
import { RadioGroup, RadioButton } from 'react-native-flexi-radio-button'
import * as actions from "./actions";
import { connect } from 'react-redux';


class ButtonsHome extends Component {
  onSelect(index, value) {
    this.props.selected_date_filter(value)
  }

  toggleMenu() {
    let isMenuOpen = this.props.openMenu ? false : true;
    this.props.open_menu(isMenuOpen);
  }

  render() {
    return (
      <View style={styles.containerIcon}>
        <PopoverController>
          {({ openPopover, closePopover, popoverVisible, setPopoverAnchor, popoverAnchorRect }) => (
            <View>
              <TouchableHighlight ref={setPopoverAnchor} onPress={openPopover}>
                <Icon style={styles.iconFilter} name="md-options" size={18} />
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
                    color='#262628'
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
        <View>
          <TouchableHighlight onPress={this.toggleMenu.bind(this)}>
            <Icon name="md-notifications" style={styles.iconFilter} size={18} />
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  content: {
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 8,
  },
  arrow: {
    opacity: 0,
  },
  background: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  containerIcon: {
    marginRight: 5
  },
  iconFilter: {
    color: "#FFF",
    fontSize: 22,
    marginRight: 10
  }
});

const mapStateToProps = state => {
  return {
    dateFilter: state.dateFilter,
    openMenu: state.openMenu
  }
}

export default connect(mapStateToProps, actions)(ButtonsHome);