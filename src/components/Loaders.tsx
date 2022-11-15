import { useNavigation } from "@react-navigation/native"
import React from "react"
import { useColorScheme, StyleSheet, View, ActivityIndicator } from "react-native"

const Loader = (props) => {
    const { route } = props
    const navigation = useNavigation();
    const isDarkMode = useColorScheme() === 'dark';

    return (
        <View
            style={styles.viewLoader}
        >
            <ActivityIndicator
                size={'large'}
                color={'green'}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    viewLoader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }

});

export default Loader