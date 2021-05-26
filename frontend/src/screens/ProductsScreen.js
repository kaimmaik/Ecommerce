import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import {
  listProducts,
  deleteProduct,
  createProduct,
} from '../actions/productActions';
import { LoadingBox } from '../components/LoadingBox';
import { MessageBox } from '../components/MessageBox';

function ProductsScreen(props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState('');
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);
  const productList = useSelector((state) => state.productList);
  const [product, setProduct] = useState('')
  const { loading, error, products } = productList;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,

  } = productCreate;


  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(listProducts());
    console.log(
      products
    )}, [dispatch]);
  // };
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createProduct(product));
    dispatch(listProducts());
    setModalVisible(!modalVisible)
    console.log(product);
  };
  
  const deleteHandler = (product) => {
  
    dispatch(deleteProduct(product._id));
    dispatch(listProducts());
    window.location.reload();
  };


  const [loadingUpload, setLoadingUpload] = useState(false);
  const [errorUpload, setErrorUpload] = useState('');
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append('image', file);
    setLoadingUpload(true);
    try {
      const { data } = await axios.post('/api/uploads', bodyFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      setImage(data);
      setLoadingUpload(false);
    } catch (error) {
      setErrorUpload(error.message);
      setLoadingUpload(false);
    }
  };
  return (
 
    <div className="content content-margined">
      <div className="product-header">
        <h3>Products</h3>
        <button className="button primary" 
          onClick={() => {
            setModalVisible(!modalVisible)}}
            >
          Create Product
        </button>
      </div>
      {modalVisible && (
        <div className="box">
        <div className="container ">
        <div className="form">
          <form 
          onSubmit={submitHandler}
          >
            <ul className="form-container">
              <li>
                <h2>Create Product</h2>
              </li>
              <li>
                {loadingCreate && <div>Loading...</div>}
                {errorCreate && <div>{errorCreate}</div>}
              </li>
              <label htmlFor="name">Name</label>
              <li className="inputBox">
                <input 
                  type="text"
                  name="name"
                  value={name}
                  id="name"
                  onChange={(e) => setName(e.target.value)}
                ></input>
              </li>
              <label htmlFor="price">Price</label>

              <li className="inputBox">
                <input
                  type="text"
                  name="price"
                  value={price}
                  id="price"
                  onChange={(e) => setPrice(e.target.value)}
                  onClick={(e) => setPrice(e.target.value)}
                ></input>
                  {loadingUpload && <LoadingBox></LoadingBox>}
              {errorUpload && (
                <MessageBox variant="danger">{errorUpload}</MessageBox>
              )}
              </li>
              <label htmlFor="image">Image</label>

              <li className="inputBox">
                <input
                  type="text"
                  name="image"
                  value={image}
                  id="image"
                  onChange={(e) => setImage(e.target.value)}
                ></input>
                <input type="file"
                id="imageFile"
                label="Choose Image"
                onChange={uploadFileHandler}></input>
                {uploading && <div>Uploading...</div>}
              </li>
              <label htmlFor="brand">Brand</label>
              <li className="inputBox">
                <input
                  type="text"
                  name="brand"
                  value={brand}
                  id="brand"
                  onChange={(e) => setBrand(e.target.value)}
                ></input>
              </li>
              <label htmlFor="countInStock">CountInStock</label>

              <li className="inputBox">
                <input
                  type="text"
                  name="countInStock"
                  value={countInStock}
                  id="countInStock"
                  onChange={(e) => setCountInStock(e.target.value)}
                ></input>
                <label htmlFor="name">Category</label>
              </li>
              <li className="inputBox">
                <input
                  type="text"
                  name="category"
                  value={category}
                  id="category"
                  onChange={(e) => setCategory(e.target.value)}
                ></input>
                <label htmlFor="description">Description</label>
              </li>
              <li className="inputBox">
                <textarea
                  name="description"
                  value={description}
                  id="description"
                  required
                  onChange={(e) =>{setDescription(e.target.value);
                    setProduct({ 
                      id,
                      name,
                      price,
                      image,
                      brand,
                      category,
                      countInStock,
                      description});
                  }}
                
                ></textarea>
              </li>
              <li>
                <button type="submit" className="inputBox">
                  {id ? 'Update' : 'Create'}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setModalVisible(false)}
                  className="inputBox"
                >
                  Back
                </button>
              </li>
            </ul>
          </form>
        </div>
        </div>
        </div>
      )}

      <div className="product-list">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Brand</th>
              <th>Action</th>
            </tr>
          </thead>
          
          
          <tbody>
      
          {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        
       
          //  {products.length === 0 && <MessageBox>No Product Found</MessageBox>}
          <>

            {products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td>
                <button
                      type="button"
                      className="small"
                      onClick={() =>
                        props.history.push(`/product/${product._id}/edit`)
                      }
                    >
                      Edit
                    </button>{' '}
                  <button
                    className="button"
                    onClick={() => deleteHandler(product)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            </>)}

            </tbody>
          
        </table>
      </div>
    </div>
  );
}
export default ProductsScreen;