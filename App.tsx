import {
    Text,
    SafeAreaView,
    StatusBar,
    useColorScheme,
    StyleSheet,
} from 'react-native';
import React from 'react';
import {colors} from './src/constants/constants';
import Keyboard from './src/components/keyboard';

const App = () => {
    const isDarkMode = useColorScheme() === 'dark';
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar
                barStyle={isDarkMode ? 'light-content' : 'dark-content'}
                backgroundColor={isDarkMode ? colors.black : colors.lightgrey}
            />
            <Text style={styles.title}>KATLAM</Text>
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
        fontSize: 32,
        fontWeight: 'bold',
        letterSpacing: 7,
    },
});

export default App;
