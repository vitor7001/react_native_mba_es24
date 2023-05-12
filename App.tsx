import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './src/Home';
import LoginPage from './src/Login';
import UserRegister from './src/User/User';


const Stack = createNativeStackNavigator()

export default function App() {
  return(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Login' component={LoginPage} options={{title: 'Acesso ao sistema'}}/>
        <Stack.Screen name='Home' component={Home}/>
        <Stack.Screen name='UserRegister' component={UserRegister}/>        
      </Stack.Navigator>
    </NavigationContainer>
  )
}