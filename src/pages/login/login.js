import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View } from 'react-native';
import {
  PlaceholderContainer,
  Placeholder
} from 'react-native-loading-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import { Actions } from 'react-native-router-flux';
export default class Login extends Component {

  loadingComponent: Promise<React.Element<*>>;
  loadingComponent1: Promise<*>;
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={styles.container}>
        <PlaceholderExample/>
      </View>
    );
  }
}

const Gradient = (): React.Element<*> => {
  return (
    <LinearGradient
      colors={['#eeeeee', '#dddddd', '#eeeeee']}
      start={{ x: 1.0, y: 0.0 }}
      end={{ x: 0.0, y: 0.0 }}
      style={{
        flex: 1,
        width: 120
      }}
    />
  );
};

const PlaceholderExample = () => {
  return (
    <PlaceholderContainer
      style={styles.placeholderContainer}
      animatedComponent={<Gradient />}
      duration={1000}
      delay={1000}
    >
      <View style={{ flexDirection: 'row', marginTop: 15 }}>
        <Placeholder style={[styles.placeholder, { width: 50, height: 50, borderRadius: 50 }]} />
        <View
          style={{
            flexDirection: 'column',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Placeholder
            style={[
              styles.placeholder,
              {
                width: '50%',
                height: 10
              }
            ]}
          />
          <Placeholder
            style={[
              styles.placeholder,
              {
                width: '35%',
                height: 7
              }
            ]}
          />
        </View>
      </View>

      <Placeholder
        style={[styles.placeholder, {marginLeft: 0, marginTop: 20, width: '100%', height: 400 }]}
      />
    </PlaceholderContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f6f7f8',
    marginTop: 25,
    marginBottom: 180
  },
  placeholderContainer: {
    width: '100%',
    backgroundColor: '#fff',
    height: 400
  },
  placeholder: {
    height: 8,
    marginTop: 6,
    marginLeft: 15,
    alignSelf: 'flex-start',
    justifyContent: 'center',
    backgroundColor: '#eeeeee'
  },
  row: {
    flexDirection: 'row',
    width: '100%'
  }
});