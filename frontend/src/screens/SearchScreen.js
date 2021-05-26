import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link,  } from 'react-router-dom';
import { listProductsByName, listProductsCategory } from '../actions/productActions';
import {LoadingBox} from '../components/LoadingBox';
import {MessageBox} from '../components/MessageBox';
import Product from '../components/Product';
// import {Rating} from '../components/Rating';
// import { prices, ratings } from '../utils';

export default function SearchScreen(props) {
  const category = props.match.params.category;
  const name = props.match.params.name;
  console.log(name);
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  
  
 
  const productCategoryList = useSelector((state) => state.productCategoryList);
  const {
    loading: loadingCategories,
    error: errorCategories,
    categories,
  } = productCategoryList;


  useEffect(() => {
    console.log('effect' +name);
    name ?(
    dispatch(listProductsByName(name)) )
    :dispatch(listProductsCategory(category));
  }, [dispatch,name,category]);

  // dispatch(listProductsCategory(category));
  const categorylisthandler = (e)=>{
    // e.preventDefault();
    dispatch(listProductsCategory(category));
  }

  // useEffect(() => {
  //   dispatch(
  //     listProductsCategory(category),
  //     // listProductsByName(name),
  //   );
  // }, [category,  dispatch]);



  // useEffect(() => {
  //   dispatch(
  //     listProductsByName(name),
  //   );
  // }, [name,  dispatch]);


  
  return (
    <div>
      {console.log('return' +name)}

      <div className="row">

        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <div>{products.length} Results</div>
        )}
        {/* <div>
          Sort by{' '}
          <select
            value={order}
            onChange={(e) => {
              props.history.push(getFilterUrl({ order: e.target.value }));
            }}
          > */}
            {/* <option value="newest">Newest Arrivals</option>
            <option value="lowest">Price: Low to High</option>
            <option value="highest">Price: High to Low</option>
            <option value="toprated">Avg. Customer Reviews</option>
          </select>
        </div> */}
      </div>
      <div className="row top">
        <div className="col-1">
          
          <div>
            {loadingCategories ? (
              <LoadingBox></LoadingBox>
            ) : errorCategories ? (
              <MessageBox variant="danger">{errorCategories}</MessageBox>
            ) : (
              <ul onClick={categorylisthandler}>
                <li>
                  <Link
                    className={'all' === category ? 'active' : ''}
                    to='/search/category/all'
                    // onClick={categorylisthandler}
                  >
                    Any
                  </Link>
                </li>
                {categories.map((c) => (
                  <li key={c}>
                    <Link 
                      className={c === category ? 'active' : ''}
                      to={`/search/category/${c}`}
                      
                    >
                      {c}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
         
        </div>
        <div className="col-3">
          {loading ? (
            <LoadingBox></LoadingBox>
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          )
           : (
            <>
              {/* {(!name && products.length === 0) && (
                <MessageBox>No Product Found</MessageBox>
              )} */}
              <div className="row center">
                {products.map((product) => (
                  <Product key={product._id} product={product}></Product>
                ))}
              </div>
              
            </>
          )
        }
        </div>

        


      </div>
    </div>
  );
}