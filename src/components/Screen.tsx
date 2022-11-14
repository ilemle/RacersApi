
import React from 'react';
import {
    SafeAreaView,
    StatusBar,
    StyleSheet,
    useColorScheme,
    View,
} from 'react-native'
import Colors from 'react-native/Libraries/NewAppScreen/components/Colors';

interface ScreenProps {
    children: JSX.Element | null
}

const Screen = (props: ScreenProps) => {
    const { children } = props
    const isDarkMode = useColorScheme() === 'dark';

    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };

    return (
        <SafeAreaView style={[styles.mainSafeAreaStyle, backgroundStyle]}>
            <StatusBar
                barStyle={isDarkMode ? 'light-content' : 'dark-content'}
                backgroundColor={backgroundStyle.backgroundColor}
            />
            <View style={styles.children}>
                {children}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    mainSafeAreaStyle: {
        flex: 1,
    },
    children: {
        flex:1,
        paddingHorizontal:18,
        paddingVertical:24,
    }
});

export default Screen;
