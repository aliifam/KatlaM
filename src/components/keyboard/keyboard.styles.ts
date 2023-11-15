import {Dimensions, StyleSheet} from 'react-native';
import {colors, keys} from '../../constants/constants';

const screen_width = Dimensions.get('window').width;
export const key_width = (screen_width - 10) / keys[0].length;
const key_height = key_width * 1.3;

export default StyleSheet.create({
    keyboard: {
        alignSelf: 'stretch',
        marginTop: 'auto',
    },
    row: {
        alignSelf: 'stretch',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    key: {
        width: key_width - 4,
        height: key_height - 4,
        margin: 2,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.grey,
    },
    keyText: {
        color: colors.lightgrey,
        fontWeight: 'bold',
    },
});
