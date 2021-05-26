import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listProductsByName } from '../actions/productActions';

export default function SearchBox(props) {
  const [name, setName] = useState('');
  const dispatch = useDispatch();
  // const productByNameList = useSelector(state => state.productByNameList)


  //changes Home screen
  useEffect(() => {
    dispatch(
      listProductsByName(name)  //by type changing product list 

    );
  }, [name, dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    if(name.length > 0)
    props.history.push(`/search/name/${name}`);
    // dispatch(
    //   listProductsByName(name),
    // );
  };


  return (
  <div className="search">
    <form  onSubmit={submitHandler}>
      
        <input
        className="search-input"
          type="text"
          name="q"
          id="q"
          onChange={(e) => setName(e.target.value)}
        ></input>
        <button className="primary" type="submit">
          <i className="fa fa-search"></i>
        </button>
      
    </form> 
</div>
);
}



