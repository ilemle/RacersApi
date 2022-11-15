
import React from 'react';
import {
    StyleSheet,
    useColorScheme,
    Text,
    View,
    TouchableOpacity,
    Linking,
} from 'react-native'
import Screen from '../components/Screen'
import Colors from 'react-native/Libraries/NewAppScreen/components/Colors';
import { useNavigation } from '@react-navigation/native';
import { Racer } from '../types';
import BackButton from '../components/BackButton';


const RacerProfileScreen = (props) => {
    const { route } = props
    const { data }: { data: Racer } = route.params
    const navigation = useNavigation();
    const isDarkMode = useColorScheme() === 'dark';

    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };

    function openWiki() {
        let url = data.url;
        Linking.openURL(url)
    }

    return (
        <Screen>
            <>
                <BackButton />
                <View style={styles.contentView}>

                    <View style={styles.rowInfo}>
                        <Text style={styles.textInfo}>ID</Text><Text style={styles.textInfo}>{data.driverId}</Text>
                    </View>
                    <View style={styles.rowInfo}>
                        <Text style={styles.textInfo}>Имя</Text><Text style={styles.textInfo}>{data.givenName}</Text>
                    </View>
                    <View style={styles.rowInfo}>
                        <Text style={styles.textInfo}>Фамилия</Text><Text style={styles.textInfo}>{data.familyName}</Text>
                    </View>
                    <View style={styles.rowInfo}>
                        <Text style={styles.textInfo}>Дата рождения</Text><Text style={styles.textInfo}>{data.dateOfBirth}</Text>
                    </View>
                    <View style={styles.rowInfo}>
                        <Text style={styles.textInfo}>Национальность</Text><Text style={styles.textInfo}>{data.nationality}</Text>
                    </View>
                    <View style={styles.rowInfo}>
                        <Text style={styles.textInfo}>Код</Text><Text style={styles.textInfo}>{data.code ? data.code : 'Отсутствует'}</Text>
                    </View>
                    <View style={styles.rowInfo}>
                        <Text style={styles.textInfo}>Ссылка на wikipedia</Text>
                        <TouchableOpacity onPress={openWiki}>
                            <Text style={styles.textInfo}>Перейти</Text>
                        </TouchableOpacity>
                    </View>


                </View>
            </>
        </Screen>
    )
};

const styles = StyleSheet.create({
    contentView: {
        backgroundColor: '#d6d0d0',
        flex: 1,
        padding: 16,
        borderRadius: 6,
    },
    rowInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    textInfo: {
        fontSize: 16,
    }
});

export default RacerProfileScreen;
