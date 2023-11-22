import {View, Text, ScrollView, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './game.style';
import Keyboard from '../keyboard';
import {CLEAR, ENTER, colors, colorsToEmoji} from '../../constants/constants';
import Clipboard from '@react-native-clipboard/clipboard';
import {copyArray} from '../../utils';
import {kamus} from '../../utils/kamus';
import AsyncStorage from '@react-native-async-storage/async-storage';

const kata = kamus[Math.floor(Math.random() * kamus.length)];
const huruf = kata.split('');
const maxtry = 6;

const Game = () => {
    // AsyncStorage.clear();
    const [rows, setRows] = useState<string[][]>(
        new Array(maxtry).fill(new Array(huruf.length).fill('')),
    );
    const [curRow, setCurRow] = useState<number>(0);
    const [curCol, setCurCol] = useState<number>(0);
    const [gameState, setGameState] = useState<string>('playing'); //playing, won, lost
    const [loaded, setLoaded] = useState<boolean>(false);

    useEffect(() => {
        if (curRow > 0) {
            checkGameState();
        }
    }, [curRow]);

    useEffect(() => {
        if (loaded) {
            persistState();
        }
    }, [rows, curRow, curCol, gameState]);

    useEffect(() => {
        loadState();
    }, []);

    const persistState = async () => {
        const data = {
            rows,
            curRow,
            curCol,
            gameState,
        };
        await AsyncStorage.setItem('gameState', JSON.stringify(data));
    };

    const loadState = async () => {
        const datastring = await AsyncStorage.getItem('gameState');
        try {
            if (datastring) {
                const data = JSON.parse(datastring);
                // console.log(data);
                setRows(data.rows);
                setCurRow(data.curRow);
                setCurCol(data.curCol);
                setGameState(data.gameState);
            }
        } catch (error) {
            console.log(error);
        }
        setLoaded(true);
    };

    const checkGameState = () => {
        if (checkIfWon() && gameState !== 'won') {
            Alert.alert('Horee', 'Anda Menang!', [
                {text: 'Bagikan', onPress: shareScore},
            ]);
            setGameState('won');
        } else if (checkIfLost() && gameState !== 'lost') {
            Alert.alert('You lost!');
            setGameState('lost');
        }
    };

    const shareScore = () => {
        const emojiShare = rows
            .map((row: string[], rowIndex: number) =>
                row
                    .map(
                        (cell: string, colIndex: number) =>
                            colorsToEmoji[
                                getCellBackgroundColor(rowIndex, colIndex)
                            ],
                    )
                    .join(''),
            )
            .filter((row: string) => row)
            .join('\n');
        const textShare = `KATLAM\n\n${emojiShare}`;
        Clipboard.setString(textShare);
        Alert.alert('Berhasil', 'Berhasil disalin ke clipboard');
    };
    const checkIfWon = () => {
        const row = rows[curRow - 1];
        return row.every(
            (cell: string, index: number) => cell === huruf[index],
        );
    };

    const checkIfLost = () => {
        return !checkIfWon() && curRow === rows.length;
    };

    const onKeyPressed = (key: string) => {
        if (gameState !== 'playing') {
            return;
        }
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
            if (!kamus.includes(rows[curRow].join(''))) {
                Alert.alert('Kata tidak ada dalam KBBI');
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
        <>
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
        </>
    );
};

export default Game;
