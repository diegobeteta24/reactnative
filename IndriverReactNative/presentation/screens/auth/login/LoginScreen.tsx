import { StyleSheet, Text, View, Image, TextInput, Button, Touchable, TouchableOpacity, Alert } from 'react-native';
import DefaultTextInput from '../../../components/DefaultTextInput';
import DefaultRoundedButton from '../../../components/DefaultRoundedButton';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../../navigator/MainStackNavigator';
import styles from './styles';
import { useState } from 'react';
import EmailValidator from '../../../utils/EmailValidator';
import { AuthRepositoryImpl } from '../../../data/repositories/AuthRepositoryImpl';
import { useLoginViewModel } from '../../../viewmodel/useLoginViewModel';

//Validar correo electrónico

interface Props extends StackScreenProps<RootStackParamList, 'LoginScreen'> { };
export default function LoginScreen({ navigation, route}: Props) {



    const repo = new (AuthRepositoryImpl as any)();
    const vm = useLoginViewModel(repo as any);

    const { email, setEmail, password, setPassword, loading, error, login } = vm;

    const handleLogin = async () => {
        if (email === '' || password === '') {
            Alert.alert('Error', 'Por favor, completa todos los campos.');
            return;
        }

        if (!EmailValidator(email)) {
            Alert.alert('Error', 'Por favor, ingresa un correo electrónico válido.');
            return;
        }

        try {
            const res = await login();
            const token = res?.token ?? res?.user?.token ?? null;
            if (token) {
                navigation.navigate('ProfileEditScreen', { token });
            } else {
                Alert.alert('Login', 'Inicio de sesión completado, pero no se recibió token.');
            }
        } catch (e: any) {
            // ViewModel already set error state; show it
            if (vm.error) {
                Alert.alert('Error', vm.error);
            } else if (e?.message) {
                Alert.alert('Error', String(e.message));
            } else {
                Alert.alert('Error', 'Error al iniciar sesión');
            }
        }
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

