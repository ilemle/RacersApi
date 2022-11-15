
import React from 'react';
import {
  StyleSheet,
  useColorScheme,
  Text
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import { Provider } from 'react-redux';

import { persistor, store } from './src/store/redux/index';
import { HomeStack } from './src/navigation/navigation';
import { PersistGate } from 'redux-persist/integration/react';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <NavigationContainer>
      <Provider store={store}>
        <PersistGate loading={<Text>Loading...</Text>} persistor={persistor}>
          <HomeStack />
        </PersistGate>
      </Provider>
    </NavigationContainer >
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
