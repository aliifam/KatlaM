import {
    Text,
    SafeAreaView,
    StatusBar,
    useColorScheme,
    StyleSheet,
    ScrollView,
    View,
} from 'react-native';
import React from 'react';
import {colors} from './src/constants/constants';
import Keyboard from './src/components/keyboard';

const App = () => {
    const isDarkMode = useColorScheme() === 'dark';

    const kata = 'hallo';
    const huruf = kata.split('');
    const maxtry = 6;

    const rows = new Array(maxtry).fill(new Array(huruf.length).fill('a'));

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar
                barStyle={isDarkMode ? 'light-content' : 'dark-content'}
                backgroundColor={isDarkMode ? colors.black : colors.lightgrey}
            />
            <Text style={styles.title}>KATLAM</Text>
            <ScrollView style={styles.map}>
                {rows.map((row: string[], index: number) => (
                    <View key={index} style={styles.row}>
                        {row.map((cell: string, cellIndex: number) => (
                            <View key={cellIndex} style={styles.cell}>
                                <Text style={styles.cellText}>
                                    {cell.toUpperCase()}
                                </Text>
                            </View>
                        ))}
                    </View>
                ))}
            </ScrollView>
            <Keyboard />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.black,
        alignItems: 'center',
    },
    title: {
        color: colors.lightgrey,
        marginVertical: 10,
        fontSize: 32,
        fontWeight: 'bold',
        letterSpacing: 7,
    },
    map: {
        alignSelf: 'stretch',
        marginVertical: 20,
        height: 100,
    },
    row: {
        alignSelf: 'stretch',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    cell: {
        borderWidth: 3,
        borderColor: colors.darkgrey,
        flex: 1,
        maxWidth: 70,
        aspectRatio: 1,
        margin: 3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cellText: {
        color: colors.lightgrey,
        fontWeight: 'bold',
        fontSize: 28,
    },
});

export default App;
