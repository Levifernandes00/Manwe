import 'react-native-gesture-handler';
import * as React from 'react';
import { AsyncStorage } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

export const AuthContext = React.createContext();
const Stack = createStackNavigator();

import Splash from './src/screens/Splash';
import Login from './src/screens/Login';
import Register from './src/screens/Register';
import Home from './src/screens/Home';
import NewEvent from './src/screens/NewEvent';
import Profile from './src/screens/Profile';

import api from './src/services/api';



export default function App() {
  //state configuration
  const [state, dispatch] = React.useReducer(
    //reducer function
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    //initial state
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async givenData => {
        
        
        try {
          const response = await api.post('/auth/login', givenData);
          console.log(response);
          const { user, token } = response.data;

          await AsyncStorage.setItem('userToken', token);
          await AsyncStorage.setItem('user', user);

          dispatch({ type: 'SIGN_IN', token });

        } catch(err){
          const { error } = err.response.data;
          alert(error);
        }
      },
      signOut: async() => {
        await AsyncStorage.clear();
        dispatch({ type: 'SIGN_OUT' })
      },
      signUp: async givenData => {
        try {

          const response = await api.post('/auth/register', givenData);
          console.log(response);
          const { user, token } = response.data;

          await AsyncStorage.setItem('userToken', token);
          await AsyncStorage.setItem('user', user);

          dispatch({ type: 'SIGN_IN', token });

        } catch(err){
          const { error } = err.response.data;
          alert(error);
        }
      },
    }),
    []
  );

  const renderComponents = ({ isLoading, userToken }) => {
    if(isLoading) return (<Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />);
    if(!userToken){
      return(
        <> 
        <Stack.Screen
          name="SignIn"
          component={Login}
          options={{
            title: 'Sign in',
            headerShown: false,
        // When logging out, a pop animation feels intuitive
            animationTypeForReplace: state.isSignout ? 'pop' : 'push',
          }}
        />
        <Stack.Screen
          name="SignUp"
          component={Register}
          options={{
            title: 'Sign up',
            headerShown: false,
          }}
        />
      </>  
      );
    }
    else {
      return(
        <> 
          <Stack.Screen 
            name="Profile" 
            component={Profile}
            options={{ headerShown: false }}  
          />
        </>
      );
    }
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator>
          {renderComponents(state)}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
