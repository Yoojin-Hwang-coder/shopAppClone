import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  getCartItems,
  removeCartItem,
  onSuccessBuy,
} from '../../../_actions/user_action';
import UserCardBlock from './Sections/UserCardBlock';
import { Empty, Result } from 'antd';
import Paypal from '../../utils/Paypal';

function CartPage() {
  const disPatch = useDispatch();
  const user = useSelector((state) => state.user);

  const [Total, setTotal] = useState(0);
  const [ShowTotal, setShowTotal] = useState(false);
  const [ShowSuccess, setShowSuccess] = useState(false);

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

  const transactionSuccess = (data) => {
    disPatch(
      onSuccessBuy({
        paymentData: data,
        cartDetail: user.cartDetail,
      })
    ).then((response) => {
      if (response.payload.success) {
        setShowTotal(false);
        setShowSuccess(true);
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
      ) : ShowSuccess ? (
        <Result status='success' title='Successfully Purchased Items!' />
      ) : (
        <>
          <br />
          <br />
          <Empty description={false} />
          <span
            style={{
              display: 'flex',
              justifyContent: 'center',
              fontSize: '20px',
            }}
          >
            신나는 여행지를 골라보세요!
          </span>
        </>
      )}
      {ShowTotal && <Paypal total={Total} onSuccess={transactionSuccess} />}
    </div>
  );
}

export default CartPage;
