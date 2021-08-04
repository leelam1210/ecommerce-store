import React from 'react'
import BtnRender from './BtnRender'
import './productItem.css'

export default  function ProductItem({product, isAdmin, deleteProduct, handleCheck, onAddCart}) {
    return (
        <div className="product_card">
            {
                isAdmin && <input type="checkbox" checked={product?.checked}
                onChange={() => handleCheck(product._id)} />
            }
            <img src={product?.images?.url} alt="" />

            <div className="product_box">
                <h2 title={product?.title}>{product?.title}</h2>
                <span>${product?.price}</span>
                <p>{product?.description}</p>
            </div>

            
            <BtnRender product={product} deleteProduct={deleteProduct} isAdmin = {isAdmin} onAddCart = {onAddCart}/>
        </div>
    )
}
