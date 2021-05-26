import React, { useEffect, useState } from 'react';
// import 'react-responsive-carousel/lib/styles/carousel.min.css';
// import { Carousel } from 'react-responsive-carousel';
import Product from '../components/Product';
import {LoadingBox} from '../components/LoadingBox';
import {MessageBox} from '../components/MessageBox';
import { useDispatch, useSelector } from 'react-redux';
import { listProductCategories, listProducts } from '../actions/productActions';
import { Link } from 'react-router-dom';
// import { listTopSellers } from '../actions/userActions';
// import { Link } from 'react-router-dom';

export default function HomeScreen() {
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const productCategoryList = useSelector((state) => state.productCategoryList);
  const {
    loading: loadingCategories,
    error: errorCategories,
    categories,
  } = productCategoryList;
  // useEffect(() => {
    
  // }, [dispatch]);

  // const userTopSellersList = useSelector((state) => state.userTopSellersList);
  // const {
  //   loading: loadingSellers,
  //   error: errorSellers,
  //   users: sellers,
  // } = userTopSellersList;

  useEffect(() => {
    dispatch(listProducts());
    dispatch(listProductCategories());
  }, [dispatch]);
  return (
    <div>


                  




      {/* <h2>Top Sellers</h2>
      {loadingSellers ? (
        <LoadingBox></LoadingBox>
      ) : errorSellers ? (
        <MessageBox variant="danger">{errorSellers}</MessageBox>
      ) : (
        <>
          {sellers.length === 0 && <MessageBox>No Seller Found</MessageBox>}
          <Carousel showArrows autoPlay showThumbs={false}>
            {sellers.map((seller) => (
              <div key={seller._id}>
                <Link to={`/seller/${seller._id}`}>
                  <img src={seller.seller.logo} alt={seller.seller.name} />
                  <p className="legend">{seller.seller.name}</p>
                </Link>
              </div>
            ))}
          </Carousel>
        </>
      )} */}

                <div className="sidebar">
                  <aside className={sidebarIsOpen ? 'open' : ''}>
                                              <ul className="categories">
                                                <li>
                                                  <strong>Categories</strong>
                                                  <button
                                                    onClick={() => setSidebarIsOpen(false)}
                                                    className="close-sidebar"
                                                    type="button"
                                                  >
                                                    <i className="fa fa-close"></i>
                                                  </button>
                                                </li>
                                                {loadingCategories ? (
                                                  <LoadingBox></LoadingBox>
                                                ) : errorCategories ? (
                                                  <MessageBox variant="danger">{errorCategories}</MessageBox>
                                                ) : (
                                                  categories.map((c) => (
                                                    <li key={c}>
                                                      <Link
                                                        to={`/search/category/${c}`}
                                                        onClick={() => setSidebarIsOpen(false)}
                                                      >
                                                        {c}
                                                      </Link>
                                                    </li>
                                                  ))
                                                )}
                                              </ul>
                                      </aside>
                                      <button
                                      type="button"
                                      className="open-sidebar"
                                      onClick={() => setSidebarIsOpen(true)}><i className="fa fa-bars"></i></button>
                                      <h2> Products</h2>
                </div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          {products.length === 0 && <MessageBox>No Product Found</MessageBox>}
          <div className="row center">
            {products.map((product) => (
              <Product key={product._id} product={product}></Product>
            ))}
          </div>
        </>
      )}
    </div>
  );
}