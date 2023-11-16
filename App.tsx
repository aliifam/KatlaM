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
import {CLEAR, ENTER, colors} from './src/constants/constants';
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

        if (key === ENTER) {
            //check if row already fullfilled
            if (curCol < rows[curRow].length) {
                return;
            }
            setCurRow(curRow + 1);
            setCurCol(0);
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

    const getCellBackgroundColor = (row: number, col: number) => {
        const cell = rows[row][col];
        if (row >= curRow) {
            return colors.black;
        }
        if (cell === huruf[col]) {
            return colors.primary;
        }
        if (huruf.includes(cell)) {
            return colors.secondary;
        }
        return colors.darkgrey;
    };

    const gettAllHurufWithColor = (color: string): string[] => {
        return rows.flatMap((row: string[], rowIndex: number) =>
            row.filter(
                (cell: string, colIndex: number) =>
                    getCellBackgroundColor(rowIndex, colIndex) === color,
            ),
        );
    };

    const greenCaps: string[] = gettAllHurufWithColor(colors.primary);
    const yellowCaps: string[] = gettAllHurufWithColor(colors.secondary);
    const greyCaps: string[] = gettAllHurufWithColor(colors.darkgrey);

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar
                barStyle={isDarkMode ? 'light-content' : 'dark-content'}
                backgroundColor={isDarkMode ? colors.black : colors.lightgrey}
            />
            <Text style={styles.title}>KATLAM</Text>
            <ScrollView style={styles.map}>
                {rows.map((row: string[], rowIndex: number) => (
                    <View key={rowIndex} style={styles.row}>
                        {row.map((cell: string, colIndex: number) => (
                            <View
                                key={colIndex}
                                style={[
                                    styles.cell,
                                    {
                                        borderColor: isCellActive(
                                            rowIndex,
                                            colIndex,
                                        )
                                            ? colors.grey
                                            : colors.darkgrey,
                                    },
                                    {
                                        backgroundColor: getCellBackgroundColor(
                                            rowIndex,
                                            colIndex,
                                        ),
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
            <Keyboard
                onKeyPressed={onKeyPressed}
                greyCaps={greyCaps}
                yellowCaps={yellowCaps}
                greenCaps={greenCaps}
            />
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
