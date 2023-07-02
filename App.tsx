import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './src/pages/Home';
import LoginPage from './src/pages/Login';
import UserRegister from './src/pages/User/User';
import HomeRoles  from './src/pages/roles/Role';
import RolesAdd from './src/pages/roles/RoleAdd';

const Stack = createNativeStackNavigator()

export default function App() {
  return(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Login' component={LoginPage} options={{title: 'Acesso ao sistema'}}/>
        <Stack.Screen name='Home' component={Home}/>
        <Stack.Screen name='UserRegister' component={UserRegister}/>    
        <Stack.Screen name='Permissões' component={HomeRoles} />    
        <Stack.Screen name='RolesAdd' component={RolesAdd} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}