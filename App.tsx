import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TextInput, Button, Touchable, TouchableOpacity } from 'react-native';
import DefaultRoundedButton from './presentation/components/DefaultRoundedButton';
import DefaultTextInput from './presentation/components/DefaultTextInput';

export default function App() {
  return (

    //LOGIN SCREEN
    <View style={styles.container}>
      <Image
        style={styles.ImageBackground}
        source={require('./assets/city.jpg')}
      />

      <View style={styles.form}>

        <Image

          source={require('./assets/user.png')}
          style={styles.imageUser}
        />

        <Text style={styles.textLogin}>LOGIN</Text>


           <DefaultTextInput
             placeholder="Correo Electrónico"
             value='hola'
             onChangeText={text => {}}
             icon={require('./assets/email.png')}
             keyboardType='email-address'
           />
            <DefaultTextInput
              placeholder="Contraseña"
              value=''
              onChangeText={text => {}}
              icon={require('./assets/password.png')}
             
              secureTextEntry
            />
 



        <DefaultRoundedButton
          text="Iniciar Sesión"
          onPress={() => {}}
        />

        <View style={styles.RegisterContainer}>
          <View style={styles.divider}></View>
          <Text style={styles.textoRegistro}>¿No tienes cuenta?</Text>
          <View style={styles.divider}></View>
        </View>


   <DefaultRoundedButton
          text="Registrarse"
          onPress={() => {}}
          backgroundColor="black"
        />



      </View>


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ImageBackground: {
    width: '100%',
    height: '100%',
    opacity: 0.7,
  },
  form: {
    width: '87%',
    height: '75%',
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 40,
    justifyContent: 'center',
    paddingHorizontal: 25,
  },
  imageUser: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    marginBottom: 15,
  },
  textLogin: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
    alignSelf: 'center',

  },
 
  RegisterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,

  },


  textoRegistro: {
    color: 'white',
    fontSize: 18,

  },




  divider: {
    height: 1,
    flex: 1,
    backgroundColor: 'white',
    marginHorizontal: 5,
  },

});
