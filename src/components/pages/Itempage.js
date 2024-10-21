import React, { useEffect, useState } from 'react';
import DefaultLayout from '../DefaultLayout';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Input, Modal, Select, Table, Form, message } from 'antd';

const Itempage = () => {

  const dispatch = useDispatch();
  const [itemsData, setItemsData] = useState([]);
  const [popupModal, setPopupModal] = useState(false);
  const [editItem,setEditItem] = useState(null);

  // Placeholder for getAllItems function
  const getAllItems = async () => {
    try {
      dispatch({
        type: "SHOW_LOADING",
      });
      const { data } = await axios.get('/api/items/get-item');
      setItemsData(data);
      dispatch({ type: "HIDE_LOADING" });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllItems();
  }, []);

  

  const handleSubmit = async (value) => {
    if (editItem === null) {
      try {
        dispatch({
          type: "SHOW_LOADING",
        });
        const res = await axios.post('/api/items/add-item', value);
        message.success('Item Added Successfully');
        getAllItems(); // Call getAllItems to fetch the updated list
        setPopupModal(false);
        dispatch({ type: "HIDE_LOADING" });
      } catch (error) {
        message.error('Something Went Wrong');
        console.log(error);
      }
    } else {
      try {
        dispatch({
          type: "SHOW_LOADING",
        });
        await axios.put('/api/items/update-item', { ...value, itemId: editItem._id });
        message.success('Item Updated Successfully');
        getAllItems(); // Call getAllItems to fetch the updated list
        setPopupModal(false);
        dispatch({ type: "HIDE_LOADING" });
      } catch (error) {
        message.error('Something Went Wrong');
        console.log(error);
      }
    }
  };
  const handleDelete = async (itemId) => {
    try {
      const confirmDelete = window.confirm("Are you sure you want to delete this item?");
    
      if (!confirmDelete) {
        return; 
      }
  
      dispatch({
        type: "SHOW_LOADING",
      });
      await axios.delete('/api/items/delete-item', {
        data: { itemId },
      });
  
      message.success('Item Deleted Successfully');
      getAllItems(); 
      dispatch({ type: "HIDE_LOADING" });
    } catch (error) {
      message.error('Something Went Wrong');
      console.log(error);
    }
  };
  
  const columns = [
    { title: "Name", dataIndex: "name" },
    {
      title: 'Image',
      dataIndex: 'image',
      render: (image, record) => <img src={image} alt={record.name} height="60" width="60" />,
    },
    { title: 'Price', dataIndex: 'price' },
    {
      title: 'Actions',
      dataIndex: "id",
      render: (id, record) => (
        <div>
           <EditOutlined style={{ cursor: 'pointer' }} 
            onClick={() => {
              setEditItem(record);
              setPopupModal(true);
            }}
           />

          <DeleteOutlined style={{ cursor: 'pointer', marginLeft: '30px', marginRight: '40px' }} 
          onClick={() => handleDelete(record._id)}/>
         
        </div>
      ),
    },
  ];

  return (
    <DefaultLayout>
      <div className="d-flex justify-content-between">
        <h1>Item List</h1>
        <Button type='primary' onClick={() => setPopupModal(true)}>Add Item</Button>
      </div>

      <Table columns={columns} dataSource={itemsData} bordered />
     {
      popupModal &&(
        <Modal
        title={`${editItem !== null ? 'Edit Item' : 'Add New Item'}`}
        visible={popupModal}
        onCancel={() =>{
          setEditItem(null)
          setPopupModal(false)
          
          }}
        footer={false}
      >
        <Form layout="vertical" initialValues={editItem} onFinish={handleSubmit}>
          <Form.Item name='name' label="Name">
            <Input />
          </Form.Item>
          <Form.Item name='price' label="Price">
            <Input />
          </Form.Item>
          <Form.Item name='category' label="Category">
            <Select>
              <Select.Option value="drinks">Drinks</Select.Option>
              <Select.Option value="roti">Roti</Select.Option>
              <Select.Option value="rice">Rice</Select.Option>
              <Select.Option value="noodles">Noodles</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name='image' label="Image Url">
            <Input />
          </Form.Item>

          <div className='d-flex justify-content-end'>
            <Button type='primary' htmlType='submit'>SAVE</Button>
          </div>
        </Form>
      </Modal>
      )
     }
    </DefaultLayout>
    
  );
  
}

export default Itempage;
