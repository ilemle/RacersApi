import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RacersScreen from '../screens/RacersScreen';
import RacerProfileScreen from '../screens/RacerProfileScreen';
import RacerCircuitsScreen from '../screens/RacerCircuitsScreen';

const Stack = createNativeStackNavigator();

export const HomeStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="RacerScreen"
                component={RacersScreen}
                options={{ title: 'Гонщики' }}
            />
            <Stack.Screen
                name="RacerProfileScreen"
                component={RacerProfileScreen}
                options={{ title: 'Профиль гонщика' }}
            />
            <Stack.Screen
                name="RacerCircuitsScreen"
                component={RacerCircuitsScreen}
                options={{ title: 'Гонки гонщика' }}
            />
        </Stack.Navigator>
    );
};