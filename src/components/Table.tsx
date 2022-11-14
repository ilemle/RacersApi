
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


interface TableProps {
    isLoading: boolean,
    data: any[],
    emptyListMessage?: string,
    headerText: string,
    prevPageText?: string,
    nextPageText?: string,
    whiteList: any[],
    customNames: any[],
    loadingContentCallback: (number) => void
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

    useEffect(() => {
        if(prevPage.current>currentPage) return

        prevPage.current = currentPage;
       
        loadingContentCallback(currentPage)
    }, [currentPage])

    const _data = data.slice(currentPage * 10 - 10, currentPage * 10)

    const isDarkMode = useColorScheme() === 'dark';

    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };

    const _whiteList: any[] = _data.map(n => Object.fromEntries(Object.entries(n)
        .filter(m => whiteList.includes(m[0]))))

    if (isLoading) {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <ActivityIndicator

                    size={'large'}
                    color={'green'}
                />
            </View>
        )
    }

    return (
        <>
            <View style={styles.racersHeader}>
                {customNames.map((content, index) => {
                    return (
                        <View
                            key={index + content}
                            style={styles.racersHeaderCell}
                        >
                            <Text style={styles.racersHeaderText}>
                                {content}
                            </Text>
                        </View>
                    )
                })}
            </View>

            <FlatList

                data={_whiteList}
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

                renderItem={({ item, index }) => {

                    let row: any[] = []
                    for (const value in item) {
                        row.push(item[value])
                    }

                    return (

                        <View style={styles.racersRow}>
                            {
                                row.map((rowEl, index) => {
                                    return (
                                        <View
                                            key={index + rowEl}
                                            style={styles.tableCell}
                                        >
                                            <Text>
                                                {rowEl}
                                            </Text>
                                        </View>
                                    )
                                })
                            }

                        </View>
                    )
                }}
            // ListFooterComponentStyle={}

            />
            <View style={styles.racersFooter}>

                <TouchableOpacity
                    disabled={currentPage === 1}
                    onPress={() => {
                        setCurrentPage(currentPage - 1)

                    }}
                >
                    <Text
                        style={[styles.racersFooterText, { color: currentPage === 1 ? 'gray' : '#000000' }]}
                    >
                        {prevPageText}
                    </Text>
                </TouchableOpacity>

                <Text style={styles.racersFooterText}>{currentPage}</Text>

                <TouchableOpacity onPress={() => {
                    setCurrentPage(currentPage + 1)
                }}

                >
                    <Text style={styles.racersFooterText}>{nextPageText}</Text>
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
