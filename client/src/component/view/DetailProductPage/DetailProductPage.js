import axios from 'axios';
import { Row, Col } from 'antd';
import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import ProductImage from './Sections/ProductImage';
import ProductInfo from './Sections/ProductInfo';

function DetailProductPage(props) {
  console.log(props);
  const product_id = props.match.params.productId;
  const [Product, setProduct] = useState({});

  useEffect(() => {
    axios
      .get(`/api/product/product_by_id?id=${product_id}&type=single`)
      .then((response) => {
        setProduct(response.data[0]);
      })
      .catch((err) => alert(err));
  }, []);

  return (
    <div style={{ width: '100%', padding: '3rem 4rem' }}>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <h1>{Product.title}</h1>
      </div>
      <br />
      <Row gutter={[16, 16]}>
        <Col lg={12} sm={24}>
          {/* product Image */}
          <ProductImage detail={Product} />
        </Col>

        <Col lg={12} sm={24}>
          {/* product Info */}
          <ProductInfo detail={Product} />
        </Col>
      </Row>
    </div>
  );
}

export default withRouter(DetailProductPage);
