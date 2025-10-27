import { StyleSheet, View, Image, TextInput, KeyboardType} from "react-native"

interface Props{
  placeholder: string,
  value: string,
onChangeText: (text: string) => void,
keyboardType?: KeyboardType,
icon: any,
secureTextEntry?: boolean,

}
const DefaultTextInput = ({placeholder, value, onChangeText, keyboardType='default', icon, secureTextEntry=false}: Props) => {
    return (
 <View style={styles.inputContainer}>
          <Image
            source={icon}
            style={styles.textInputIcon}
          />
          <TextInput
            style={styles.textInput}
            placeholder={placeholder}
            placeholderTextColor="white"
            value={value}
            onChangeText={text => onChangeText(text)}
            keyboardType={keyboardType}
            secureTextEntry={secureTextEntry}

          />
        </View>
    )
}
const styles = StyleSheet.create({
 inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },


  textInput: {

    width: '90%',
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    color: 'white',
    fontSize: 18,
  },
  textInputIcon: {
    width: 25,
    height: 25,
    marginRight: 15,

  },

})

export default DefaultTextInput;
