import { StyleSheet, Text, View, Image, TextInput, Button, Touchable, TouchableOpacity, Alert } from 'react-native';
import DefaultTextInput from '../../../components/DefaultTextInput';
import DefaultRoundedButton from '../../../components/DefaultRoundedButton';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../../navigator/MainStackNavigator';
import styles from './styles';
import { useState } from 'react';
import EmailValidator from '../../../utils/EmailValidator';
import Api from '../../../services/api';

//Validar correo electrónico

interface Props extends StackScreenProps<RootStackParamList, 'LoginScreen'> { };
export default function LoginScreen({ navigation, route}: Props) {



    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        if (email === '' || password === '') {
            Alert.alert('Error', 'Por favor, completa todos los campos.');
            return;
        }

        if (!EmailValidator(email)) {
            Alert.alert('Error', 'Por favor, ingresa un correo electrónico válido.');
            return;
        }

         console.log('Iniciar Sesión con:', { email, password });
        // simple login demo: call API and show token in alert
        Api.login(email, password).then(res => {
            const token = res?.token ?? res?.user?.token ?? null;
            if (token) {
                // navigate to ProfileEditScreen and pass token so user can copy/use it
                navigation.navigate('ProfileEditScreen', { token });
            } else {
                Alert.alert('Login fallo', JSON.stringify(res));
            }
        }).catch(err => {
            Alert.alert('Error', String(err));
        });
    }

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
                    value={email}
                    onChangeText={setEmail}
                    icon={require('../../../../assets/email.png')}
                    keyboardType='email-address'
                />
                <DefaultTextInput
                    placeholder="Contraseña"
                    value={password}
                    onChangeText={setPassword}
                    icon={require('../../../../assets/password.png')}
                    secureTextEntry={true}
                />




                <DefaultRoundedButton
                    text="Iniciar Sesión"
                    onPress={() => { 
                        handleLogin();
                    }}
                />

                <DefaultRoundedButton
                    text="Probar Editar Perfil"
                    onPress={() => navigation.navigate('ProfileEditScreen') }
                    backgroundColor="#0066cc"
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

