import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import './categories.css';
import {
  getCategory,
  createCategory,
  deleteCategory,
  updateCategory,
} from '../../actions/category';

export default function Categories() {
  const [category, setCategory] = useState('');
  const [onEdit, setOnEdit] = useState(false);
  const [id, setID] = useState('');
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.auth.authData, shallowEqual);
  const categories = useSelector(
    (state) => state.category.categories,
    shallowEqual
  );

  const onCreateCategory = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      if (onEdit) {
        updateCategory(
          id,
          accessToken.accesstoken,
          category
        )(dispatch).then((data) => {
          alert('Update category success!!!');
          getCategory()(dispatch);
          setLoading(false);
        });
      } else {
        createCategory(
          accessToken.accesstoken,
          category
        )(dispatch).then((data) => {
          alert('Create category success!!!');
          getCategory()(dispatch);
          setLoading(false);
        });
      }
      setOnEdit(false);
      setCategory('');
    } catch (error) {}
  };

  const onEditCategory = async (id, name) => {
    setOnEdit(true);
    setCategory(name);
    setID(id);
  };

  const onDeleteCategory = async (id) => {
    try {
      deleteCategory(
        id,
        accessToken?.accesstoken
      )(dispatch).then((data) => getCategory()(dispatch));
    } catch (error) {
      alert(error.response.data.msg);
    }
  };

  return (
    <div className="categories">
      <form onSubmit={onCreateCategory}>
        <label htmlFor="category">Category</label>
        <input
          type="text"
          name="category"
          value={category}
          required
          onChange={(e) => setCategory(e.target.value)}
        />

        <button type="submit">
          {loading ? '...' : onEdit ? 'Update' : 'Create'}
        </button>
      </form>

      <div className="col">
        {categories?.map((category) => (
          <div className="row" key={category?._id}>
            <p>{category?.name}</p>
            <div>
              <button
                onClick={() => onEditCategory(category._id, category.name)}
              >
                Edit
              </button>
              <button onClick={() => onDeleteCategory(category._id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
