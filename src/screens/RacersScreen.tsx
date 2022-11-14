
import React, { useState } from 'react';
import {
    SafeAreaView,
    StatusBar,
    StyleSheet,
    useColorScheme,
    Text,
    View,
    TouchableOpacity,
    FlatList,
    ActivityIndicator,
} from 'react-native'
import Screen from '../components/Screen'
import Colors from 'react-native/Libraries/NewAppScreen/components/Colors';
import { racersRequest } from '../store/redux/racers';
import { useDispatch, useSelector } from 'react-redux';
import { Racer } from '../types';
import Table from '../components/Table';


const RacersScreen = (props) => {
    const isDarkMode = useColorScheme() === 'dark';
    const dispatch = useDispatch()
    const racers: Racer[] = useSelector(state => state.racersReducer.racers)
    const racersFetching: boolean = useSelector(state => state.racersReducer.racers_fetching)

    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };

    const [currentPage, setCurrentPage] = useState(1)
    console.log('racer', racers);

    function getPage(number) {
        setCurrentPage(number)
    }

    return (
        <Screen>
            <View style={{ flex: 1 }}>
                <Table
                    isLoading={racersFetching}
                    data={racers}
                    headerText={'Гонщики'}
                    whiteList={['driverId', 'givenName', 'familyName']}
                    customNames={['ID', 'Имя', 'Фамилия']}
                    // getCurrentPage={getPage}
                    loadingContentCallback={(num) => dispatch(racersRequest(num))}
                />
                {/* <TouchableOpacity
                    onPress={() => dispatch(racersRequest())}
                    style={{ height: 60, width:100, backgroundColor: 'pink', }}
                /> */}
            </View>
        </Screen>
    )

    // if (racersFetching) {
    //     return (
    //         <View
    //             style={{
    //                 flex: 1,
    //                 justifyContent: 'center',
    //                 alignItems: 'center',
    //             }}
    //         >
    //             <ActivityIndicator

    //                 size={'large'}
    //                 color={'green'}
    //             />
    //         </View>
    //     )
    // }

    // return (
    //     <Screen>
    //         <>
    //             <FlatList
    //                 data={racers}
    //                 style={styles.racersList}
    //                 ListEmptyComponent={() => {
    //                     return (
    //                         <View style={styles.racersEmpty}>
    //                             <Text style={styles.racersEmptyText}>
    //                                 Список пуст
    //                             </Text>
    //                         </View>
    //                     )
    //                 }}
    //                 ListHeaderComponent={() => {
    //                     return (
    //                         <View style={styles.racersHeader}>
    //                             <Text style={styles.racersHeaderText}>Гонщики</Text>
    //                         </View>
    //                     )
    //                 }}
    //                 renderItem={({ item }) => {
    //                     return (
    //                         <View>
    //                             <Text>{item.familyName}</Text>
    //                         </View>
    //                     )
    //                 }}
    //                 // ListFooterComponentStyle={}
    //                 ListFooterComponent={() => {
    //                     return (
    //                         <View style={styles.racersFooter}>
    //                             <Text style={styles.racersFooterText}>Назад</Text>
    //                             <Text style={styles.racersFooterText}>Вперед</Text>
    //                         </View>
    //                     )
    //                 }}
    //             />


    //             <TouchableOpacity
    //                 onPress={() => dispatch(racersRequest())}
    //                 style={{ height: 60, width:100, backgroundColor: 'pink', }}
    //             />
    //         </>
    //     </Screen>
    // );
};

const styles = StyleSheet.create({
    racersList: {
        flex: 1,
    },
    racersFooter: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    racersFooterText: {
        fontSize: 20,
    },
    racersEmpty: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    racersEmptyText: {
        fontSize: 24,
    },
    racersHeaderText: {
        fontSize: 20,
    },
    racersHeader: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default RacersScreen;
