import React, { useState } from 'react';
import { Typography, Button, Form, Input } from 'antd';
import FileUpload from '../../utils/FileUpload';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router';

const { Title } = Typography;
const { TextArea } = Input;
const continents = [
  { key: 1, value: 'Africa' },
  { key: 2, value: 'Europe' },
  { key: 3, value: 'Asia' },
  { key: 4, value: 'North America' },
  { key: 5, value: 'South America' },
  { key: 6, value: 'Oceania' },
  { key: 7, value: 'Antarctica' },
];

function UploadPage(props) {
  const user = useSelector((state) => state.user);

  const [ProductName, setProductName] = useState('');
  const [Description, setDescription] = useState('');
  const [Price, setPrice] = useState(0);
  const [Continents, setContinents] = useState(1);
  const [Images, setImages] = useState([]);

  const titleChangeHandler = (e) => {
    setProductName(e.target.value);
  };
  const descriptionChangeHandler = (e) => {
    setDescription(e.target.value);
  };
  const priceChangeHandler = (e) => {
    setPrice(e.target.value);
  };
  const continentsChangeHandler = (e) => {
    setContinents(e.target.value);
  };
  const updateImages = (newImages) => {
    setImages(newImages);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (!ProductName || !Description || !Price || !Continents || !Images) {
      return alert('모든 내용을 입력해주셔야 합니다.');
    }

    const body = {
      writer: user.userData._id,
      title: ProductName,
      description: Description,
      price: Price,
      images: Images,
      continents: Continents,
    };
    //  모든 값들을 request보낸다
    axios.post('/api/product', body).then((response) => {
      if (response.data.success) {
        alert('제품 업로드를 성공했습니다.');
        props.history.push('/');
      } else {
        alert('제품 업로드를 실패했습니다.');
      }
    });
  };
  return (
    <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <Title level={2}>여행 상품 업로드</Title>
      </div>

      <Form onSubmit={submitHandler}>
        {/* dropzone */}
        <FileUpload refreshFunction={updateImages} />
        <br />
        <br />
        <label>이름</label>
        <Input value={ProductName} onChange={titleChangeHandler} />
        <br />
        <br />
        <label>설명</label>
        <TextArea value={Description} onChange={descriptionChangeHandler} />
        <br />
        <br />
        <label>가격($)</label>
        <Input type='number' value={Price} onChange={priceChangeHandler} />
        <br />
        <br />
        <select onChange={continentsChangeHandler} value={Continents}>
          {continents.map((Item) => (
            <option key={Item.key} value={Item.key}>
              {Item.value}
            </option>
          ))}
        </select>
        <br />
        <br />
        <Button type='submit' onClick={submitHandler}>
          상품업로드
        </Button>
      </Form>
    </div>
  );
}

export default withRouter(UploadPage);
