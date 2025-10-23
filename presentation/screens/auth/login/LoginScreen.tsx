import { StyleSheet, Text, View, Image, TextInput, Button, Touchable, TouchableOpacity } from 'react-native';
import DefaultTextInput from '../../../components/DefaultTextInput';
import DefaultRoundedButton from '../../../components/DefaultRoundedButton';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../../navigator/MainStackNavigator';
import styles from './styles';
interface Props extends StackScreenProps<RootStackParamList, 'LoginScreen'> { };
export default function LoginScreen({ navigation, route}: Props) {
    return (
        <View style={styles.container}>
      <Image
        style={styles.ImageBackground}
        source={require('../../../../assets/city.jpg')}
      />

            <View style={styles.form}>

                <Image
    
            source={require('../../../../assets/user.png')}
                    style={styles.imageUser}
                />

                <Text style={styles.textLogin}>LOGIN</Text>


                <DefaultTextInput
                    placeholder="Correo Electrónico"
                    value='hola'
                    onChangeText={text => { }}
                    icon={require('../../../../assets/email.png')}
                    keyboardType='email-address'
                />
                <DefaultTextInput
                    placeholder="Contraseña"
                    value='hola'
                    onChangeText={text => { }}
          icon={require('../../../../assets/password.png')}
                    secureTextEntry={true}
                />




                <DefaultRoundedButton
                    text="Iniciar Sesión"
                    onPress={() => { }}
                />

                <View style={styles.RegisterContainer}>
                    <View style={styles.divider}></View>
                    <Text style={styles.textoRegistro}>¿No tienes cuenta?</Text>
                    <View style={styles.divider}></View>
                </View>


                <DefaultRoundedButton
                    text="Registrarse"
                    onPress={() => navigation.navigate('RegisterScreen') }
                    backgroundColor="black"
                />



            </View>


        </View>
    )
}

