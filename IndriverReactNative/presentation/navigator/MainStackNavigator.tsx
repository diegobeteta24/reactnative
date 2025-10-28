import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/auth/login/LoginScreen";
import RegisterScreen from "../screens/auth/register/RegisterScreen";
import ProfileEditScreen from "../screens/profile/ProfileEditScreen";

export type RootStackParamList = {
 LoginScreen: undefined,
 RegisterScreen : undefined,
 ProfileEditScreen: undefined,
}

const Stack = createNativeStackNavigator<RootStackParamList>();

export const MainStackNavigator = () => {
    return (
<Stack.Navigator initialRouteName="LoginScreen">
   <Stack.Screen options={{ headerShown: false }} name="LoginScreen" component={LoginScreen} />
     <Stack.Screen options={{ headerShown: false }} name="RegisterScreen" component={RegisterScreen} />
     <Stack.Screen options={{ headerShown: false }} name="ProfileEditScreen" component={ProfileEditScreen} />
 </Stack.Navigator>
    )
 
};
