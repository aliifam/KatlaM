import {View, Text, Pressable} from 'react-native';
import React, {FC} from 'react';
import {CLEAR, ENTER, colors, keys} from '../../constants/constants';
import keyboardStyles, {key_width} from './keyboard.styles';

interface KeyboardProps {
    onKeyPressed?: (key: string) => void;
    greenCaps?: string[];
    yellowCaps?: string[];
    greyCaps?: string[];
}
const Keyboard: FC<KeyboardProps> = ({
    onKeyPressed = () => {},
    greenCaps = [],
    yellowCaps = [],
    greyCaps = [],
}) => {
    const isLongButton = (key: string) => {
        return key === ENTER || key === CLEAR;
    };

    const getKeyBGColor = (key: string) => {
        if (greenCaps.includes(key)) {
            return colors.primary;
        }
        if (yellowCaps.includes(key)) {
            return colors.secondary;
        }

        if (greyCaps.includes(key)) {
            return colors.darkgrey;
        }

        return colors.grey;
    };
    return (
        <View style={keyboardStyles.keyboard}>
            {keys.map((keyRow, index) => (
                <View style={keyboardStyles.row} key={`row-${index}`}>
                    {keyRow.map(key => (
                        <Pressable
                            onPress={() => onKeyPressed(key)}
                            disabled={greyCaps.includes(key)}
                            key={key}
                            style={[
                                keyboardStyles.key,
                                isLongButton(key)
                                    ? {width: key_width * 1.4}
                                    : {},
                                {backgroundColor: getKeyBGColor(key)},
                            ]}>
                            <Text style={keyboardStyles.keyText}>
                                {key.toUpperCase()}
                            </Text>
                        </Pressable>
                    ))}
                </View>
            ))}
        </View>
    );
};

export default Keyboard;
