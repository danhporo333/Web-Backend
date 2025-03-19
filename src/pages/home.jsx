import { useEffect, useState } from 'react';
import { fetchAllProductsAPI, addToCartAPI, fetchAllCategoryAPI, fetchAllProductsByCategoryAPI } from '../services/api.service';
import '../styles/home.css';
import { useNavigate } from 'react-router-dom';
import { notification, Spin } from 'antd';
import gsap from 'gsap';
import Slideshow from '../components/slideshow/Slideshow';

const HomePage = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        loadCategories();
    }, []);

    useEffect(() => {
        if (selectedCategory) {
            loadProductsByCategory(selectedCategory);
        } else {
            loadProducts();
        }
    }, [selectedCategory]);

    const loadCategories = async () => {
        try {
            const res = await fetchAllCategoryAPI();
            if (res.data && res.data.categories) {
                setCategories(res.data.categories);
            }
        } catch (error) {
            console.error("Failed to fetch categories", error);
        }
    };

    const loadProducts = async () => {
        try {
            const res = await fetchAllProductsAPI();
            if (res.data) {
                setProducts(res.data.products);
            }
        } catch (error) {
            console.error("Failed to fetch products", error);
        } finally {
            setLoading(false);
        }
    };

    const loadProductsByCategory = async (categoryId) => {
        setLoading(true);
        try {
            const res = await fetchAllProductsByCategoryAPI(categoryId);
            console.log("res", res);
            console.log(res);
            if (res.data) {
                setProducts(res.data);
            }
        } catch (error) {
            console.error("Failed to fetch products by category", error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddToCart = async (product, event) => {
        try {
            const res = await addToCartAPI(product.id);
            if (res.data) {
                notification.success({
                    message: "Thông báo",
                    description: "thêm sản phẩm vào giỏ hàng thành công"
                });
                // Dispatch event để Header component biết cần cập nhật số lượng
                window.dispatchEvent(new Event('cartUpdated'));
                animateProductToCart(event.target);
            } else {
                notification.error({
                    message: "Lỗi",
                    description: "thêm sản phẩm vào giỏ hàng thất bại hoặc bạn chưa đăng nhập"
                });
            }
        } catch (error) {
            console.error("Failed to add product to cart", error);
        }
    };

    const animateProductToCart = (button) => {
        const productCard = button.closest('.product-card');
        const productImage = productCard.querySelector('.product-image');
        const cartIcon = document.querySelector('.anticon-shopping-cart');

        if (!cartIcon) {
            console.error('Cart icon not found');
            return;
        }

        const productImageClone = productImage.cloneNode(true);
        productImageClone.style.position = 'fixed';
        productImageClone.style.zIndex = 1000;
        productImageClone.style.width = '100px';
        productImageClone.style.height = '100px';
        productImageClone.style.top = `${productImage.getBoundingClientRect().top}px`;
        productImageClone.style.left = `${productImage.getBoundingClientRect().left}px`;
        productImageClone.style.objectFit = 'contain';

        document.body.appendChild(productImageClone);

        gsap.to(productImageClone, {
            duration: 2,
            x: cartIcon.getBoundingClientRect().left - productImage.getBoundingClientRect().left,
            y: cartIcon.getBoundingClientRect().top - productImage.getBoundingClientRect().top,
            scale: 0.1,
            ease: "power1.inOut",
            onComplete: () => {
                productImageClone.remove();
                gsap.to(cartIcon, {
                    scale: 1.3,
                    duration: 0.3,
                    yoyo: true,
                    repeat: 1
                });
            }
        });
    };

    const handleViewDetails = (product) => {
        navigate(`/product/${product.id}`);
    };

    return (
        <div className="home-container">
            <div className="home-content">
                <div className="category-sidebar">
                    <h2 className="category-title">Danh mục sản phẩm</h2>
                    <div className="category-list">
                        <div 
                            className={`category-item ${selectedCategory === null ? 'active' : ''}`}
                            onClick={() => setSelectedCategory(null)}
                        >
                            Tất cả sản phẩm
                        </div>
                        {categories.map((category) => (
                            <div 
                                key={category.id}
                                className={`category-item ${selectedCategory === category.id ? 'active' : ''}`}
                                onClick={() => setSelectedCategory(category.id)}
                            >
                                {category.name}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="products-section">
                    <Slideshow />
                    <h1 className="home-title">
                        {selectedCategory 
                            ? categories.find(c => c.id === selectedCategory)?.name 
                            : "Tất cả sản phẩm"}
                    </h1>
                    {loading ? (
                        <div className="center-spinner">
                            <Spin size="large" />
                        </div>
                    ) : (
                        <div className="products-grid">
                            {products.length > 0 ? (
                                products.map((product, index) => (
                                    <div key={index} className="product-card">
                                        <h2>{product.name}</h2>
                                        <img
                                            src={product.image.startsWith('http') ? product.image : `${import.meta.env.VITE_BACKEND_URL}/image/products/${product.image}`}
                                            alt={product.name}
                                            className="product-image"
                                        />
                                        <div className="product-details">
                                            <p>Price: {product.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
                                            <p>Stock: {product.stock}</p>
                                        </div>
                                        <div className="product-buttons">
                                            <button className="add-to-cart-btn" onClick={(e) => handleAddToCart(product, e)}>
                                                thêm vào giỏ hàng
                                            </button>
                                            <button className="details-btn" onClick={() => handleViewDetails(product)}>
                                                Chi tiết
                                            </button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div>No data available</div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default HomePage;