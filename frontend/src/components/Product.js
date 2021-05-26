import React from 'react';
import { Rating } from './Rating';

function Product(props) {
    const {product} = props; 
    return (
            <div key={product._id} className="card">
                 
                  <a className="imgBx" href={`/product/${product._id}`}>
                      <img className="medium" src={product.image} alt={product.name} />
                      <h2>{product.name}</h2>
                  </a>
                  <div className="card-body">
                  {/* <a href={`/product/${product._id}`}> </a> */}
                     <Rating rating={product.rating} numReviews={product.numReviews}/>
                     <div className="price">{product.price}$</div>
                     </div>
              </div>
    );
}

export default Product;