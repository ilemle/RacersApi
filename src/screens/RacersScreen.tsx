
import React, { useState } from 'react';
import {
    StyleSheet,
    useColorScheme,
    View,
} from 'react-native'
import Screen from '../components/Screen'
import Colors from 'react-native/Libraries/NewAppScreen/components/Colors';
import { racersRequest } from '../store/redux/racers';
import { useDispatch, useSelector } from 'react-redux';
import { Racer } from '../types';
import { RootState } from '../store/redux';
import RacersTable from '../components/RacersTable';


const RacersScreen = (props) => {
    const isDarkMode = useColorScheme() === 'dark';
    const dispatch = useDispatch()
    //@ts-ignore
    const racers: Racer[] = useSelector((state: RootState) => state.racersReducer.racers)
    //@ts-ignore
    const racersFetching: boolean = useSelector((state: RootState) => state.racersReducer.racers_fetching)

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

                <RacersTable
                    isLoading={racersFetching}
                    data={racers}
                    headerText={'Гонщики'}
                    customNames={['ID', 'Имя', 'Фамилия']}
                    loadingContentCallback={(num) => dispatch(racersRequest(num))}
                />
            </View>
        </Screen>
    )

};

const styles = StyleSheet.create({

});

export default RacersScreen;
