import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getCategory } from '../../actions/category';
import { getProducts } from '../../actions/products';

export default function Filters({ pages }) {
  const [category, setCategory] = useState('');
  const [sort, setSort] = useState('');
  const [search, setSearch] = useState('');
  const [categories, setCategories] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    getCategory()(dispatch).then((data) => setCategories(data));
  }, []);

  useEffect(() => {
    getProducts(pages, category, sort, search)(dispatch);
  }, [pages, category, sort, search]);

  const handleCategory = (e) => {
    setCategory(e.target.value);
    setSearch('');
  };

  return (
    <div className="filter_menu">
      <div className="row">
        <span>Filters: </span>
        <select name="category" value={category} onChange={handleCategory}>
          <option value="">All Products</option>
          {categories.map((category) => (
            <option value={'category=' + category._id} key={category._id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <input
        type="text"
        value={search}
        placeholder="Enter your search!"
        onChange={(e) => setSearch(e.target.value.toLowerCase())}
      />

      <div className="row sort">
        <span>Sort By: </span>
        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="">Newest</option>
          <option value="sort=oldest">Oldest</option>
          <option value="sort=-sold">Best sales</option>
          <option value="sort=-price">Price: Hight-Low</option>
          <option value="sort=price">Price: Low-Hight</option>
        </select>
      </div>
    </div>
  );
}
