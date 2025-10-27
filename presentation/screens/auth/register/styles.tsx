import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    keyboardView: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
    },
    formContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20,
    },
    ImageBackground: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        opacity: 0.6,
    },
    form: {
        width: '87%',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: 40,
        justifyContent: 'center',
        paddingHorizontal: 25,
        paddingVertical: 30,
    },
    imageUser: {
        width: 150,
        height: 150,
        alignSelf: 'center',
        marginBottom: 10,
    },
    textRegister: {
        fontSize: 25,
        fontWeight: 'bold', 
        color: 'white',
        alignSelf: 'center',
        marginBottom: 20,
    },
    backButton: {
        position: 'absolute',
        top: 20,
        left: 25,
        zIndex: 10,
        padding: 5,
    },
    back: {
        width: 35,
        height: 35,
    },
});

export default styles;

