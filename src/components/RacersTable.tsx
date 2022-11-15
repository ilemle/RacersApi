
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
import { paginationSize } from '../constants';
import { loadedRacersPage } from '../store/redux/racers';
import { Racer } from '../types';
import Loader from './Loaders';

interface TableProps {
    isLoading: boolean,
    data: Racer[],
    emptyListMessage?: string,
    headerText: string,
    prevPageText?: string,
    nextPageText?: string,
    customNames: any[],
    loadingContentCallback: (number) => void,
}

const RacersTable = (props: TableProps) => {

    const {
        isLoading,
        data,
        emptyListMessage = 'Список пуст',
        headerText,
        prevPageText = 'Назад',
        nextPageText = 'Вперёд',
        customNames,
        loadingContentCallback,
    } = props

    const navigation = useNavigation();
    const dispatch = useDispatch()
    const [currentPage, setCurrentPage] = useState(1)
    const prevPage = useRef(0)

    const loadedPages: number[] = useSelector(state => state.racersReducer.loaded_racers_page)
    useEffect(() => {

        if (currentPage < prevPage.current || loadedPages.includes(currentPage)) return

        prevPage.current = currentPage;

        dispatch(loadedRacersPage(currentPage))

        loadingContentCallback(currentPage)
    }, [currentPage])

    const _data = data.slice(currentPage * paginationSize - paginationSize, currentPage * paginationSize)

    const isDarkMode = useColorScheme() === 'dark';

    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };

    const ThemeInstall = {
        color: isDarkMode ?
            '#ffffff'
            :
            '#000000',
        borderColor: isDarkMode ?
            '#ff2600'
            :
            '#000000'
    }

    return (
        <>
            <View style={styles.racersHeader}>
                {customNames.map((content, index) => {
                    return (
                        <View
                            key={index + content}
                            style={isDarkMode ? styles.racersHeaderCellDark : styles.racersHeaderCell}
                        >
                            <Text style={isDarkMode ? [styles.racersHeaderText, { color: '#ffffff' }] : styles.racersHeaderText}>
                                {content}
                            </Text>
                        </View>
                    )
                })}
            </View>

            {
                isLoading ?
                    <Loader />
                    :
                    <FlatList

                        data={_data}
                        style={styles.racersList}
                        contentContainerStyle={{ flexGrow: 1 }}
                        ListEmptyComponent={() => {
                            return (
                                <View style={styles.racersEmpty}>
                                    <Text style={styles.racersEmptyText}>
                                        {emptyListMessage}
                                    </Text>
                                </View>
                            )
                        }}
                        keyExtractor={(item, index) => item.driverId + index}
                        renderItem={({ item, index }) => {
                            return (
                                <View
                                    key={item.driverId + index}

                                    style={[styles.racersRow,
                                    isDarkMode ?
                                        { backgroundColor: index % 2 === 0 ? '#878787' : '#d6d0d0' }
                                        :
                                        { backgroundColor: index % 2 === 0 ? '#d6d0d0' : '#ffffff' }
                                    ]}
                                >
                                    <TouchableOpacity
                                        onPress={() => navigation.navigate('RacerCircuitsScreen', { driverId: item.driverId })}
                                        key={index}
                                        style={styles.tableCell}
                                    >
                                        <Text >
                                            {item.driverId}
                                        </Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={styles.racersRow}
                                        onPress={() => navigation.navigate('RacerProfileScreen', { data: item })}>
                                        <View
                                            key={index}
                                            style={styles.tableCell}
                                        >
                                            <Text>
                                                {item.givenName}
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={styles.racersRow}
                                        onPress={() => navigation.navigate('RacerProfileScreen', { data: item })}>
                                        <View
                                            key={index}
                                            style={styles.tableCell}
                                        >
                                            <Text>
                                                {item.familyName}
                                            </Text>
                                        </View>
                                    </TouchableOpacity>


                                </View>
                            )
                        }}

                    />
            }
            <View style={[styles.racersFooter, ThemeInstall]}>

                <TouchableOpacity
                    disabled={currentPage === 1}
                    onPress={() => {
                        setCurrentPage(currentPage - 1)

                    }}
                >
                    <Text
                        style={[styles.racersFooterText,
                        isDarkMode ?
                            { color: currentPage === 1 ? 'gray' : '#ffffff' }
                            :
                            { color: currentPage === 1 ? 'gray' : '#000000' }
                        ]}
                    >
                        {prevPageText}
                    </Text>
                </TouchableOpacity>

                <Text
                    style={[styles.racersFooterText, ThemeInstall]}
                >{currentPage}</Text>

                <TouchableOpacity onPress={() => {
                    setCurrentPage(currentPage + 1)
                }}

                >
                    <Text
                        style={[styles.racersFooterText, ThemeInstall]}
                    >
                        {nextPageText}
                    </Text>
                </TouchableOpacity>
            </View>

        </>
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
    racersHeaderCellDark: {
        borderColor: '#ffffff',
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
    }
});

export default RacersTable;
