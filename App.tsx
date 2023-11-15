import {
    Text,
    SafeAreaView,
    StatusBar,
    useColorScheme,
    StyleSheet,
    ScrollView,
    View,
} from 'react-native';
import React, {useState} from 'react';
import {CLEAR, colors} from './src/constants/constants';
import Keyboard from './src/components/keyboard';

const copyArray = (arr: string[][]) => {
    return [...arr.map(rows => [...rows])];
};

const App = () => {
    const isDarkMode = useColorScheme() === 'dark';

    const kata = 'hallo';
    const huruf = kata.split('');
    const maxtry = 6;

    const [rows, setRows] = useState<string[][]>(
        new Array(maxtry).fill(new Array(huruf.length).fill('')),
    );
    const [curRow, setCurRow] = useState<number>(0);
    const [curCol, setCurCol] = useState<number>(0);

    const onKeyPressed = (key: string) => {
        const updatedRows = copyArray(rows);

        if (key === CLEAR) {
            const prevCol = curCol - 1;
            if (prevCol >= 0) {
                updatedRows[curRow][prevCol] = '';
                setRows(updatedRows);
                setCurCol(prevCol);
            }
            return;
        }
        //check if row already fullfilled
        if (curCol < rows[curRow].length) {
            updatedRows[curRow][curCol] = key;
            setRows(updatedRows);
            setCurCol(curCol + 1);
        }
    };

    const isCellActive = (row: number, col: number) => {
        return row === curRow && col === curCol;
    };

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
                            <View
                                key={cellIndex}
                                style={[
                                    styles.cell,
                                    {
                                        borderColor: isCellActive(
                                            index,
                                            cellIndex,
                                        )
                                            ? colors.grey
                                            : colors.darkgrey,
                                    },
                                ]}>
                                <Text style={styles.cellText}>
                                    {cell.toUpperCase()}
                                </Text>
                            </View>
                        ))}
                    </View>
                ))}
            </ScrollView>
            <Keyboard onKeyPressed={onKeyPressed} />
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
