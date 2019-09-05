import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FlatList } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '../../services/api';
import { formatPrice } from '../../util/format';

import * as CartActions from '../../store/modules/cart/actions';

import {
  Container,
  Product,
  Image,
  Title,
  Price,
  AddButton,
  Amount,
  AmountText,
  AddButtonText,
} from './styles';

export default function Home() {
  const [products, setProducts] = useState([]);

  const amount = useSelector(state =>
    state.cart.reduce((sumAmount, product) => {
      sumAmount[product.id] = product.amount;

      return sumAmount;
    }, {}),
  );

  const dispatch = useDispatch();

  useEffect(() => {
    async function loadProducts() {
      const response = await api.get('products');

      const data = response.data.map(product => ({
        ...product,
        priceFormatted: formatPrice(product.price),
      }));

      setProducts(data);
    }

    loadProducts();
  }, []);

  function handleAddProduct(id) {
    dispatch(CartActions.addToCartRequest(id));
  }

  return (
    <Container>
      <FlatList
        horizontal
        data={products}
        extraData={amount}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => (
          <Product key={item.id}>
            <Image source={{ uri: item.image }} />
            <Title>{item.title}</Title>
            <Price>{formatPrice(item.price)}</Price>
            <AddButton onPress={() => handleAddProduct(item.id)}>
              <Amount>
                <Icon name="add-shopping-cart" color="#FFF" size={20} />
                <AmountText>{amount[item.id] || 0}</AmountText>
              </Amount>
              <AddButtonText>ADICIONAR</AddButtonText>
            </AddButton>
          </Product>
        )}
      />
    </Container>
  );
}
