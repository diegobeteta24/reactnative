import { View, Text, Image, TouchableOpacity } from "react-native";
import styles from "./styles";
import DefaultTextInput from "../../../components/DefaultTextInput";
import DefaultRoundedButton from "../../../components/DefaultRoundedButton";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../../navigator/MainStackNavigator";

interface Props extends StackScreenProps<RootStackParamList, 'RegisterScreen'> { };

export default function RegisterScreen({ navigation, route }: Props) {
    return (
        <View style={styles.container}>
            <Image

                source={require('../../../../assets/city.jpg')}
                style={styles.ImageBackground}
            />

            <View style={styles.form}>
                <TouchableOpacity
                    onPress={() => navigation.pop()}
                >
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
                    value=""
                    onChangeText={text => { }}
                    icon={require('../../../../assets/user.png')}
                   
                />
                
                <DefaultTextInput
                    placeholder="Apellido"
                    value=""
                    onChangeText={text => { }}
                    icon={require('../../../../assets/user_image.png')}
                   
                />


               <DefaultTextInput
                   placeholder="Email"
                   value=""
                   onChangeText={text => { }}
                   keyboardType="email-address"
                   icon={require('../../../../assets/email.png')}
               />

               <DefaultTextInput
                   placeholder="Telefono"
                   value=""
                   onChangeText={text => { }}
                     keyboardType="numeric"
                   icon={require('../../../../assets/phone.png')}
               />

               <DefaultTextInput
                   placeholder="Contraseña"
                   value=""
                   onChangeText={text => { }}
                   icon={require('../../../../assets/password.png')}
                   secureTextEntry
               />

              <DefaultTextInput
                   placeholder="Confirmar Contraseña"
                   value=""
                   onChangeText={text => { }}
                   icon={require('../../../../assets/password.png')}
                   secureTextEntry
               />

               <DefaultRoundedButton
                   text="Registrarse"
                   backgroundColor="black"
                   onPress={() => { }}
               />

              

            </View>

        </View>
    );
}