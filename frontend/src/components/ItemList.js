import React from 'react';
import { Button, Card } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';

const ItemList = ({ item }) => {
  const dispatch = useDispatch()
  //update cart handler
   const handleAddToCart = ()=>{
         dispatch({
          type:'ADD_TO_CART',
          payload:{...item,quantity:1},
         })
   }


  console.log(item.image);
const {Meta} = Card;
return (
  <div>
   <Card
  hoverable
  style={{ width: 240,marginBottom:10 }}
  cover={<img alt={item.name} src={item.image} style={{height:200}}/>}

>
  <Meta title={item.name} />
  <div className="item-button">
    <Button onClick={()=>handleAddToCart()} >Add to cart</Button>
  </div>
</Card>
  </div>
);
};
  

export default ItemList;
