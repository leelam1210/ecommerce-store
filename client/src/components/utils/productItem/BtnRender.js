import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './productItem.css'

function BtnRender({product, deleteProduct, isAdmin, onAddCart}) {

    return (
        <div className="row_btn">
            {
                isAdmin ? 
                <>
                    <Link id="btn_buy" to="" 
                    onClick={() =>deleteProduct(product?._id, product?.images?.public_id)}>
                        Delete
                    </Link>
                    <Link id="btn_view" to={`/edit_product/${product?._id}`}>
                        Edit
                    </Link>
                </>
                : <>
                    <Link id="btn_buy" to="" onClick={() => onAddCart(product)}>
                        Buy
                    </Link>
                    <Link id="btn_view" to={`/detail/${product?._id}`}>
                        View
                    </Link>
                </>
            }
                
        </div>
    )
}

export default BtnRender
