import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCartItems, removeCartItem } from '../../../_actions/user_action';
import UserCardBlock from './Sections/UserCardBlock';
import { Empty } from 'antd';

function CartPage() {
  const disPatch = useDispatch();
  const user = useSelector((state) => state.user);

  const [Total, setTotal] = useState(0);
  const [ShowTotal, setShowTotal] = useState(false);

  useEffect(() => {
    //  리덕스 user State 안에 cart안에 상품이 있는지 확인
    let cartItems = [];

    if (user.userData && user.userData.cart) {
      if (user.userData.cart.length > 0) {
        user.userData.cart.forEach((item) => {
          cartItems.push(item.id);
        });
        disPatch(getCartItems(cartItems, user.userData.cart)).then(
          (response) => {
            calTotal(response.payload);
          }
        );
      }
    }
  }, [user.userData]);

  let calTotal = (cartDetail) => {
    let total = 0;
    cartDetail.map((item) => {
      return (total += parseInt(item.price, 10) * parseInt(item.quantity, 10));
    });
    setTotal(total);
    setShowTotal(true);
  };

  let removeFromCart = (productId) => {
    disPatch(removeCartItem(productId)).then((response) => {
      console.log(response);
      if (response.payload.productInfo.length <= 0) {
        setShowTotal(false);
      }
    });
  };

  return (
    <div style={{ width: '85%', margin: '3rem auto' }}>
      <h1>My Cart</h1>
      <UserCardBlock products={user.cartDetail} removeItem={removeFromCart} />

      {ShowTotal ? (
        <div style={{ marginTop: '3rem' }}>
          <h2>Total Amount : {Total} $</h2>
        </div>
      ) : (
        <>
          <br />
          <Empty description={false} />
        </>
      )}
    </div>
  );
}

export default CartPage;
