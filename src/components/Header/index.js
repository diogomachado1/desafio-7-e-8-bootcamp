import React from 'react';

import Icon from 'react-native-vector-icons/MaterialIcons';
import { useSelector } from 'react-redux';

import { Wrapper, Container, Logo, BasketContainer, ItemCount } from './styles';

export default function Header({ navigation }) {
  const InCart = useSelector(state => state.cart);

  return (
    <Wrapper>
      <Container>
        <Logo />
        <BasketContainer
          onPress={() => {
            navigation.navigate('Cart');
          }}
        >
          <Icon name="shopping-basket" color="#FFF" size={24} />
          <ItemCount>{InCart.length || 0}</ItemCount>
        </BasketContainer>
      </Container>
    </Wrapper>
  );
}
