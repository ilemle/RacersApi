
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import {
    StyleSheet,
    useColorScheme,
    Text,
    View,
    FlatList,
    ActivityIndicator,
    TouchableOpacity,
} from 'react-native'
import Colors from 'react-native/Libraries/NewAppScreen/components/Colors';
import { useDispatch, useSelector } from 'react-redux';
import { Racer, RacerCircuitShortedData } from '../types';
import Screen from '../components/Screen'
import { racerCircuitsClean, racerCircuitsRequest } from '../store/redux/racers';
import Table from '../components/Table';
import { RootState } from '../store/redux';


const RacerCircuitsScreen = (props) => {

    const { route } = props
    const { driverId }: { driverId: string } = route.params
    const navigation = useNavigation();
    const dispatch = useDispatch()
    //@ts-ignore
    const racerCircuits: Racer[] = useSelector((state: RootState) => state.racersReducer.racer_circuits)
    //@ts-ignore
    const racersCircuitsFetching: boolean = useSelector((state: RootState) => state.racersReducer.racer_circuits_fetching)

    const [currentPage, setCurrentPage] = useState(1)
    const prevPage = useRef(0)

    useEffect(() => {
        if (prevPage.current > currentPage) return

        prevPage.current = currentPage;

        // dispatch(racerCircuitsRequest({ page: currentPage, racerId: 'albon' }))

        return () => {
            dispatch(racerCircuitsClean())
        }
    }, [currentPage])

    // const _data = data.slice(currentPage * 10 - 10, currentPage * 10)

    const isDarkMode = useColorScheme() === 'dark';

    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };

    // if (racersCircuitsFetching) {
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

    function getPage(number) {
        setCurrentPage(number)
    }
    return (
        <Screen>
            <>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                >
                    <Text style={styles.backButtonText}>Назад</Text>
                </TouchableOpacity>
                <Table
                    isLoading={racersCircuitsFetching}
                    data={racerCircuits}
                    headerText={'Гонщики'}
                    emptyListMessage={'Записей не найдено'}
                    whiteList={['circuitName', 'locality', 'country', 'url']}
                    customNames={['Имя круга', 'Город', 'Страна', 'Wiki']}
                    // getCurrentPage={getPage}
                    loadingContentCallback={(num) => dispatch(racerCircuitsRequest({ page: currentPage, racerId: driverId }))}
                />
            </>
        </Screen>
    );
};

const styles = StyleSheet.create({
    racersList: {
        flex: 1,
    },
    racersFooter: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        paddingTop: 10,
        marginTop: 20,
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
    racersHeaderCell: {
        borderColor: '#000000',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        flex: 1,
        height: 50,
        borderLeftRadius: 5,
        borderRightRadius: 5,
    },
    racersHeader: {
        // flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    tableCell: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#000000',
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
    },
    racersRow: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    backButtonText: {
        marginBottom: 16,
        fontSize: 16,
    },
});

export default RacerCircuitsScreen;
