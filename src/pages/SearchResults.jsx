import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { searchProductsAPI } from '../services/api.service';
import { Spin, Empty } from 'antd';
import '../styles/home.css';

const SearchResults = () => {
    const [searchParams] = useSearchParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const query = searchParams.get('query');

    useEffect(() => {
        const fetchSearchResults = async () => {
            if (!query) return;
            setLoading(true);
            try {
                const res = await searchProductsAPI(query);
                console.log("Search results:", res);
                if (res.data && res.data.products) {
                    setProducts(res.data.products);
                }
            } catch (error) {
                console.error('Error searching products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchSearchResults();
    }, [query]);

    const handleViewDetails = (product) => {
        navigate(`/product/${product.id}`);
    };

    if (loading) return <div className="center-spinner"><Spin size="large" /></div>;

    return (
        <div className="home-container">
            <div className="search-content">
                <h1 className="home-title">Kết quả tìm kiếm cho: "{query}"</h1>
                {products.length === 0 ? (
                    <Empty 
                        description={
                            <span>
                                Không tìm thấy sản phẩm phù hợp với từ khóa "{query}".<br/>
                                Vui lòng thử lại với từ khóa khác.
                            </span>
                        }
                    />
                ) : (
                    <>
                        <p style={{ textAlign: 'center', marginBottom: '20px' }}>
                            Tìm thấy {products.length} sản phẩm
                        </p>
                        <div className="products-grid">
                            {products.map((product) => (
                                <div key={product.id} className="product-card">
                                    <h2>{product.name}</h2>
                                    <img
                                        src={product.image.startsWith('http') ? product.image : `${import.meta.env.VITE_BACKEND_URL}/image/products/${product.image}`}
                                        alt={product.name}
                                        className="product-image"
                                    />
                                    <div className="product-details">
                                        <p>Giá: {product.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
                                        <p>Còn lại: {product.stock} sản phẩm</p>
                                        {/* <p>Danh mục: {product.Category?.name || 'Chưa phân loại'}</p> */}
                                    </div>
                                    <div className="product-buttons">
                                        <button 
                                            className="details-btn" 
                                            onClick={() => handleViewDetails(product)}
                                        >
                                            Chi tiết
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default SearchResults;
