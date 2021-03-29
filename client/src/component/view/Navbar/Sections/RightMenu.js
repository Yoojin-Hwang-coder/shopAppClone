import React from 'react';
import { Menu, Badge } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';

function RightMenu(props) {
  const user = useSelector((state) => state.user);

  const logoutHandler = () => {
    axios.get('/api/users/logout').then((response) => {
      if (response.status === 200) {
        window.localStorage.removeItem('userId');
        props.history.push('/login');
        alert('로그아웃 되었습니다');
      } else {
        alert('Log Out Failed');
      }
    });
  };

  if (user.userData && !user.userData.isAuth) {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key='mail'>
          <a href='/login'>Signin</a>
        </Menu.Item>
        <Menu.Item key='app'>
          <a href='/register'>Signup</a>
        </Menu.Item>
      </Menu>
    );
  } else {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key='upload'>
          <a href='/product/upload'>Upload</a>
        </Menu.Item>
        <Menu.Item
          key='cart'
          style={{ paddingRight: '-22px', marginRight: -5 }}
        >
          <Badge count={5} style={{ marginRight: '23px' }}>
            <a href='/user/cart' className='head-example'>
              <ShoppingCartOutlined style={{ fontSize: '30px' }} />
            </a>
          </Badge>
        </Menu.Item>
        <Menu.Item key='logout'>
          <a onClick={logoutHandler}>Logout</a>
        </Menu.Item>
      </Menu>
    );
  }
}

export default withRouter(RightMenu);
