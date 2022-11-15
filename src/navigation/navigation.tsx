import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RacersScreen from '../screens/RacersScreen';
import RacerProfileScreen from '../screens/RacerProfileScreen';
import RacerCircuitsScreen from '../screens/RacerCircuitsScreen';
import { useColorScheme } from 'react-native';

const Stack = createNativeStackNavigator();

export const HomeStack = () => {
    const isDarkMode = useColorScheme() === 'dark'
    const _backgroundColor = isDarkMode ? '#ff2600' : '#ffffff'
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="RacerScreen"
                component={RacersScreen}
                options={{ title: 'Гонщики', headerStyle: { backgroundColor: _backgroundColor } }}
            />
            <Stack.Screen
                name="RacerProfileScreen"
                component={RacerProfileScreen}
                options={{ title: 'Профиль гонщика', headerStyle: { backgroundColor: _backgroundColor } }}
            />
            <Stack.Screen
                name="RacerCircuitsScreen"
                component={RacerCircuitsScreen}
                options={{ title: 'Гонки гонщика', headerStyle: { backgroundColor: _backgroundColor } }}
            />
        </Stack.Navigator>
    );
};