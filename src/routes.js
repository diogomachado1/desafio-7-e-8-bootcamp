import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Main from './pages/Main';
import Cart from './pages/Cart';

import Header from './components/Header';

// import colors from './styles/colors';

const Routes = createAppContainer(
  createStackNavigator(
    {
      Main,
      Cart,
    },
    {
      // initialRouteName: 'Cart',
      defaultNavigationOptions: navigation => ({
        // eslint-disable-next-line react/jsx-props-no-spreading
        header: <Header {...navigation} />,
      }),
      cardStyle: {
        backgroundColor: '#141419',
      },
    },
  ),
);

export default Routes;
