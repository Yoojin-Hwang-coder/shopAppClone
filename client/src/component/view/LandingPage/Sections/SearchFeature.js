import React, { useState } from 'react';
import { Input, Space } from 'antd';

const { Search } = Input;
function SearchFeature(props) {
  const [SearchTerm, setSearchTerm] = useState('');

  const searchHandler = (e) => {
    setSearchTerm(e.target.value);
    props.refreshFunction(e.target.value);
  };

  return (
    <div>
      <Space direction='vertical'>
        <Search
          placeholder='도시를 찾아보세요!'
          allowClear
          onChange={searchHandler}
          style={{ width: 200 }}
          value={SearchTerm}
        />
      </Space>
    </div>
  );
}

export default SearchFeature;
