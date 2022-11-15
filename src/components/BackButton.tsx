import { useNavigation } from "@react-navigation/native"
import React from "react"
import { TouchableOpacity, Text, useColorScheme, StyleSheet } from "react-native"

const BackButton = (props) => {
    const { route } = props
    const navigation = useNavigation();
    const isDarkMode = useColorScheme() === 'dark';
    return (
        <TouchableOpacity
            onPress={() => navigation.goBack()}
        >
            <Text style={[styles.backButtonText, { color: isDarkMode ? '#ffffff' : '#000000' }]}>Назад</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({

    backButtonText: {
        marginBottom: 16,
        fontSize: 16,
    },

});

export default BackButton