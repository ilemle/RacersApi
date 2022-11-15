
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
import { useDispatch } from 'react-redux';
import { paginationSize } from '../constants';
import Loader from './Loaders';

interface TableProps {
    isLoading: boolean,
    data: any[],
    emptyListMessage?: string,
    headerText: string,
    prevPageText?: string,
    nextPageText?: string,
    whiteList: any[],
    customNames: any[],
    loadingContentCallback: (number) => void,
}

const Table = (props: TableProps) => {

    const {
        isLoading,
        data,
        emptyListMessage = 'Список пуст',
        headerText,
        prevPageText = 'Назад',
        nextPageText = 'Вперёд',
        whiteList,
        customNames,
        loadingContentCallback,
    } = props

    const [currentPage, setCurrentPage] = useState(1)
    const prevPage = useRef(0)
    const isDarkMode = useColorScheme() === 'dark';

    useEffect(() => {
        if (prevPage.current > currentPage) return
        prevPage.current = currentPage;
        loadingContentCallback(currentPage)
    }, [currentPage])

    const _data = data.slice(currentPage * paginationSize - paginationSize, currentPage * paginationSize)


    const _whiteList: any[] = _data.map(n => Object.fromEntries(Object.entries(n)
        .filter(m => whiteList.includes(m[0]))))

    if (isLoading) {
        return <Loader />
    }

    const ThemeInstall = {
        color: isDarkMode ?
            '#ffffff'
            :
            '#000000',
        borderColor: isDarkMode ?
            '#ffffff'
            :
            '#000000'
    }

    return (
        <>
            {_whiteList.length > 0 && <View style={styles.racersHeader}>
                {customNames.map((content, index) => {
                    return (
                        <View
                            key={index + content}
                            style={[styles.racersHeaderCell, ThemeInstall]}
                        >
                            <Text style={[styles.racersHeaderText, ThemeInstall]}>
                                {content}
                            </Text>
                        </View>
                    )
                })}
            </View>}

            <FlatList

                data={_whiteList}
                style={styles.racersList}
                contentContainerStyle={{ flexGrow: 1 }}
                ListEmptyComponent={() => {
                    return (
                        <View style={styles.racersEmpty}>
                            <Text style={[styles.racersEmptyText, ThemeInstall]}>
                                {emptyListMessage}
                            </Text>
                        </View>
                    )
                }}

                renderItem={({ item, index }) => {

                    let row: any[] = []
                    for (const value in item) {
                        row.push(item[value])
                    }

                    return (

                        <TouchableOpacity
                            onPress={() => { }}
                            style={styles.racersRow}
                        >
                            {
                                row.map((rowEl, index) => {
                                    return (
                                        <View
                                            key={index + rowEl}
                                            style={[styles.tableCell, ThemeInstall]}
                                        >
                                            <Text style={ThemeInstall}>
                                                {rowEl}
                                            </Text>
                                        </View>
                                    )
                                })
                            }

                        </TouchableOpacity>
                    )
                }}

            />
            {_whiteList.length > 0 &&
                <View style={[styles.racersFooter, ThemeInstall]}>

                    <TouchableOpacity
                        disabled={currentPage === 1}
                        onPress={() => {
                            setCurrentPage(currentPage - 1)

                        }}
                    >
                        <Text
                            style={[styles.racersFooterText, isDarkMode ?
                                { color: currentPage === 1 ? 'gray' : '#ffffff' }
                                :
                                { color: currentPage === 1 ? 'gray' : '#000000' }]}
                        >
                            {prevPageText}
                        </Text>
                    </TouchableOpacity>

                    <Text style={[styles.racersFooterText,ThemeInstall]}>{currentPage}</Text>

                    <TouchableOpacity onPress={() => {
                        setCurrentPage(currentPage + 1)
                    }}

                    >
                        <Text style={[styles.racersFooterText,ThemeInstall]}>{nextPageText}</Text>
                    </TouchableOpacity>
                </View>
            }
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

export default Table;
