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
                (async () => {
                    try {
                        const res = await Api.login(email, password);
                        const token = res?.token ?? res?.user?.token ?? null;
                        if (token) {
                            navigation.navigate('ProfileEditScreen', { token });
                        } else {
                            Alert.alert('Login', 'Inicio de sesión completado, pero no se recibió token.');
                        }
                    } catch (err: any) {
                        // err is our normalized error from api.ts
                        if (err?.errors) {
                            // validation errors from backend
                            const msgs = Object.values(err.errors).flat().join('\n');
                            Alert.alert('Errores de validación', msgs);
                        } else if (err?.message) {
                            Alert.alert('Error', String(err.message));
                        } else {
                            Alert.alert('Error', 'Error desconocido.');
                        }
                    }
                })();
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

