import { View, Text, Image, TouchableOpacity, Alert, KeyboardAvoidingView, Platform, ScrollView, Keyboard } from "react-native";
import styles from "./styles";
import DefaultTextInput from "../../../components/DefaultTextInput";
import DefaultRoundedButton from "../../../components/DefaultRoundedButton";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../../navigator/MainStackNavigator";
import { useState } from "react";
import EmailValidator from "../../../utils/EmailValidator";
interface Props extends StackScreenProps<RootStackParamList, 'RegisterScreen'> { };

export default function RegisterScreen({ navigation, route }: Props) {
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleRegister = () => {
        if (name === '' || lastName === '' || email === '' || phone === '' || password === '' || confirmPassword === '') {
            Alert.alert('Error', 'Por favor, completa todos los campos.');
            return;
        }

        if (!EmailValidator(email)) {
            Alert.alert('Error', 'Por favor, ingresa un correo electrónico válido.');
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert('Error', 'Las contraseñas no coinciden.');
            return;
        }

        console.log('Registro con:', { name, lastName, email, phone, password });
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
            keyboardVerticalOffset={0}>
            <ScrollView 
                contentContainerStyle={styles.scrollContent}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
                bounces={false}>
                <Image
                    source={require('../../../../assets/city.jpg')}
                    style={styles.ImageBackground}
                />

                <View style={styles.form}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={styles.backButton}
                        activeOpacity={0.7}>
                        <Image
                            style={styles.back}
                            source={require('../../../../assets/left_arrow.png')}
                        />
                    </TouchableOpacity>
                    <Image
                        source={require('../../../../assets/user.png')}
                        style={styles.imageUser}
                    />
                    <Text style={styles.textRegister}>Register</Text>

                    <DefaultTextInput
                        placeholder="Nombre"
                        value={name}
                        onChangeText={setName}
                        icon={require('../../../../assets/user.png')}
                    />
                    
                    <DefaultTextInput
                        placeholder="Apellido"
                        value={lastName}
                        onChangeText={setLastName}
                        icon={require('../../../../assets/user_image.png')}
                    />

                    <DefaultTextInput
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        icon={require('../../../../assets/email.png')}
                    />

                    <DefaultTextInput
                        placeholder="Telefono"
                        value={phone}
                        onChangeText={setPhone}
                        keyboardType="numeric"
                        icon={require('../../../../assets/phone.png')}
                    />

                    <DefaultTextInput
                        placeholder="Contraseña"
                        value={password}
                        onChangeText={setPassword}
                        icon={require('../../../../assets/password.png')}
                        secureTextEntry
                    />

                    <DefaultTextInput
                        placeholder="Confirmar Contraseña"
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        icon={require('../../../../assets/password.png')}
                        secureTextEntry
                    />

                    <DefaultRoundedButton
                        text="Registrarse"
                        backgroundColor="black"
                        onPress={() => { 
                            Keyboard.dismiss();
                            handleRegister();
                        }}
                    />
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}