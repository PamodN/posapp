
import React, { useState } from 'react'
import DefaultLayout from '../DefaultLayout';
import { useSelector,useDispatch } from 'react-redux';
import { DeleteOutlined ,PlusCircleOutlined,MinusCircleOutlined} from '@ant-design/icons';

import { Table } from 'antd';

const Cartpage = () => {
    const dispatch = useDispatch()
    const {cartItems} = useSelector(state =>state.rootReducer);
   
   
    const handleIncrement = (record) => {
      const updatedCartItems = cartItems.map(item =>
        item._id === record._id ? { ...item, quantity: item.quantity + 1 } : item
      );
    
      dispatch({
        type: 'UPDATE_CART',
        payload: { _id: record._id, quantity: record.quantity + 1 },
      });
    };

    const handleDecrement = (record) => {
      if(record.quantity !==1){
        const updatedCartItems = cartItems.map(item =>
          item._id === record._id ? { ...item, quantity: item.quantity -1 } : item
        );
      
        dispatch({
          type: 'UPDATE_CART',
          payload: { _id: record._id, quantity: record.quantity - 1 },
        });
      }
     
    };
    
    

    
    const columns =[
      {title:"Name", dataIndex:"name"},
        {title :'Image', dataIndex:'image',
         render :(image,record)=><img src={image} alt={record.name} height="60" width="60"/>},
         {title:'Price', dataIndex:'price'},
         {title:'Quantity', dataIndex: '-id',
        render:(id,record)=><div>
            <PlusCircleOutlined className='mx-4' style={{cursor:'pointer'}}
           onClick={() => handleIncrement(record)}/>
            <b>{record.quantity}</b>
            <MinusCircleOutlined  className='mx-4'  style={{cursor:'pointer'}}
           onClick={() => handleDecrement(record)}/>

        </div>
        },
         {title:'Actions',dataIndex:"id", render:(id,record) =><DeleteOutlined   style={{cursor:'pointer'}}
         onClick={()=> dispatch({
          type :"DELETE_FROM_CART",
          payload:record
         })}
         
         />,},

    ]
  return (
    <DefaultLayout>
        <h1>Cart Page</h1>
        <Table columns={columns} dataSource={cartItems} bordered/>
    </DefaultLayout>
  )
};
export default Cartpage;