import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import Loading from "./screens/Loading";
import Login from "./screens/Login";
import Register from "./screens/Register";
import Home from "./screens/Home";
import NewEvent from "./screens/NewEvent";
import Profile from "./screens/Profile";

const authStack = createStackNavigator(
  {
    Login,
    Register
  },
  {
    initialRouteName: "Login",
    headerMode: "none"
  }
);

const appStack = createStackNavigator(
  {
    Profile,
    Home,
    NewEvent
  },
  {
    headerMode: "none"
  }
);

const Routes = createAppContainer(
  createSwitchNavigator(
    {
      Loading,
      Auth: authStack,
      App: appStack
    },
    {
      initialRouteName: "Loading"
    }
  )
);

export default Routes;
