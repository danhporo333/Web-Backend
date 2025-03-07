import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProductByIdAPI } from '../services/api.service';
import './productDetail.css';

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const loadProduct = async () => {
            try {
                const res = await fetchProductByIdAPI(id);
                if (res.data) {
                    setProduct(res.data.product);
                    console.log(">check ", res.data)
                }
            } catch (error) {
                console.error("Failed to fetch product details", error);
            }
        };
        loadProduct();
    }, [id]);

    if (!product) return <div>Loading...</div>;

    return (
        <div className="product-detail-container">
            <div className="product-detail-content">
                <div className="product-detail-left">
                    <img src={product.image.startsWith('http') ? product.image : `${import.meta.env.VITE_BACKEND_URL}/image/${product.image}`}
                        alt={product.name} className="product-detail-image" />
                </div>
                <div className="product-detail-right">
                    <h1 className="product-detail-title">{product.name}</h1>
                    <div className="product-detail-price">
                        {product.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                    </div>
                    <div className="product-detail-description">
                        <h3>Description</h3>
                        <p>{product.description}</p>
                    </div>
                    <div className="product-detail-stock">
                        <span>Stock: {product.stock}</span>
                    </div>
                    <div className="product-detail-actions">
                        <button className="btn-add-to-cart">Add to Cart</button>
                        <button className="btn-buy-now">Buy Now</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
