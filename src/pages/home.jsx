import { useEffect, useState } from 'react';
import { fetchAllProductsAPI } from '../services/api.service';
import '../styles/home.css';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    const loadProducts = async () => {
        try {
            const res = await fetchAllProductsAPI();
            if (res.data) {
                setProducts(res.data.products);
                console.log(">check :", res.data.products);
            }
        } catch (error) {
            console.error("Failed to fetch products", error);
        }
    };

    useEffect(() => {
        loadProducts();
    }, []);

    const handleAddToCart = (product) => {
        console.log("Add to cart:", product);
        // Implement add to cart functionality here
    };

    const handleViewDetails = (product) => {
        navigate(`/product/${product.id}`);
    };

    return (
        <div className="home-container">
            <div className="home-content">
                <h1 className="home-title">Products</h1>
                <div className="products-grid">
                    {products.length > 0 ? (
                        products.map((product, index) => (
                            <div key={index} className="product-card">
                                <h2>{product.name}</h2>
                                <img
                                    src={product.image.startsWith('http') ? product.image : `${import.meta.env.VITE_BACKEND_URL}/image/${product.image}`}
                                    alt={product.name}
                                    className="product-image"
                                />
                                <div className="product-details">
                                    <p>Price: {product.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
                                    <p>Stock: {product.stock}</p>
                                </div>
                                <div className="product-buttons">
                                    <button className="add-to-cart-btn" onClick={() => handleAddToCart(product)}>
                                        Add to Cart
                                    </button>
                                    <button className="details-btn" onClick={() => handleViewDetails(product)}>
                                        Product Details
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div>No data available</div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default HomePage;