import React, { useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { destroyImage, uploadImage } from '../../actions/image';
import {
  createProduct,
  getProducts,
  updateProducts,
} from '../../actions/products';
import './createProduct.css';

const initialState = {
  product_id: 'product_01',
  title: 'Rose',
  price: 100,
  description: 'This is a funny photo. Do you like this picture',
  content:
    'Welcome to my shop ROSÉ. There are smiles here, buy it here to enjoy any life',
  category: 'man',
  _id: '',
};

function CreateProduct() {
  const [productData, setProductData] = useState(initialState);
  const [images, setImages] = useState(false);
  const [onEdit, setOnEdit] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();
  const { slug } = useParams();

  const accessToken = useSelector((state) => state.auth.authData, shallowEqual);
  const categories = useSelector(
    (state) => state.category.categories,
    shallowEqual
  );
  const products = useSelector((state) => state.product.products, shallowEqual);

  useEffect(() => {
    if (typeof slug !== 'undefined') {
      setOnEdit(true);
      products.forEach((product) => {
        if (product._id === slug) {
          setProductData(product);
          setImages(product.images);
        }
      });
    } else {
      setOnEdit(false);
      setProductData(initialState);
      setImages(false);
    }
  }, [slug]);

  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      const file = e.target.files[0];

      if (!file) return alert('File not exist.');

      if (file.size > 1024 * 1024)
        // 1mb
        return alert('Size too large!');

      if (file.type !== 'image/jpeg' && file.type !== 'image/png')
        // 1mb
        return alert('File format is incorrect.');

      let formData = new FormData();
      formData.append('file', file);

      uploadImage(
        formData,
        accessToken.accesstoken
      )(dispatch).then((data) => {
        setImages(data);
      });
    } catch (err) {
      alert('Thêm thất bại');
    }
  };

  const handleDestroy = async () => {
    destroyImage(images?.public_id, accessToken?.accesstoken)(dispatch);
    setImages(false);
  };

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!images) return alert('No Image Upload');
      if (onEdit) {
        const newProduct = { ...productData, images: images };
        updateProducts(
          slug,
          accessToken?.accesstoken,
          newProduct
        )(dispatch).then((data) => {
          alert('Update product success!!!');
          getProducts(1, '', '', '')(dispatch);
        });
      } else {
        createProduct(
          { ...productData, images },
          accessToken?.accesstoken
        )(dispatch).then((data) => {
          alert('Create product success!!!');
          getProducts(1, '', '', '')(dispatch);
        });
      }
      history.push('/');
    } catch (err) {
      alert(err.response?.data.msg);
    }
  };

  const styleUpload = {
    display: images ? 'block' : 'none',
  };
  return (
    <div className="create_product">
      <div className="upload">
        <input type="file" name="file" id="file_up" onChange={handleUpload} />
        <div id="file_img" style={styleUpload}>
          <img src={images ? images.url : ''} alt="" />
          <span onClick={handleDestroy}>X</span>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="row">
          <label htmlFor="product_id">Product ID</label>
          <input
            type="text"
            name="product_id"
            id="product_id"
            required
            value={productData.product_id}
            onChange={handleChangeInput}
            disabled={onEdit}
          />
        </div>

        <div className="row">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            required
            value={productData.title}
            onChange={handleChangeInput}
          />
        </div>

        <div className="row">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            name="price"
            id="price"
            required
            value={productData.price}
            onChange={handleChangeInput}
          />
        </div>

        <div className="row">
          <label htmlFor="description">Description</label>
          <textarea
            type="text"
            name="description"
            id="description"
            required
            value={productData.description}
            rows="5"
            onChange={handleChangeInput}
          />
        </div>

        <div className="row">
          <label htmlFor="content">Content</label>
          <textarea
            type="text"
            name="content"
            id="content"
            required
            value={productData.content}
            rows="7"
            onChange={handleChangeInput}
          />
        </div>

        <div className="row">
          <label htmlFor="categories">Categories: </label>
          <select
            name="category"
            value={productData.category}
            onChange={handleChangeInput}
          >
            <option value="">Please select a category</option>
            {categories.map((category) => (
              <option value={category._id} key={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
                    
        <button type="submit">{onEdit ? 'Update' : 'Create'}</button>
      </form>
    </div>
  );
}

export default CreateProduct;
