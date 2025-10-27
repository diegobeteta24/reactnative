import { StyleSheet } from 'react-native';

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

export default styles;