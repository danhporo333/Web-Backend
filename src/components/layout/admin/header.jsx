import { Link, useNavigate } from 'react-router-dom';
import { Menu, Badge, Dropdown } from 'antd';
import { UsergroupAddOutlined, HomeOutlined, AuditOutlined, LoginOutlined, AliwangwangOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../context/auth.context';
import { fetchAllCartAPI } from '../../../services/api.service';

const Header = ({ current, setCurrent }) => {
    const { user, setUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const [cartItemCount, setCartItemCount] = useState(0);
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        if (user?.userId) {
            fetchCartItems();
        }
    }, [user?.userId]);

    const fetchCartItems = async () => {
        try {
            const res = await fetchAllCartAPI();
            if (res.data && Array.isArray(res.data.CartItems)) {
                const items = res.data.CartItems.map(item => ({
                    id: item.id,
                    title: item.Product.name,
                    price: item.Product.price,
                    quantity: item.quantity,
                    image: item.Product.image.startsWith('http')
                        ? item.Product.image
                        : `${import.meta.env.VITE_BACKEND_URL}/image/${item.Product.image}`
                }));
                setCartItems(items);
                setCartItemCount(res.data.CartItems.length);
            }
        } catch (error) {
            console.error("Failed to fetch cart items", error);
        }
    };

    useEffect(() => {
        window.addEventListener('cartUpdated', fetchCartItems);
        return () => {
            window.removeEventListener('cartUpdated', fetchCartItems);
        };
    }, []);

    const onClick = (e) => {
        setCurrent(e.key);
    };

    const handleLogout = () => {
        setUser({
            id: "",
            email: "",
            username: "",
            roles: []
        });
        localStorage.removeItem("token");
        setCartItems([]);
        setCartItemCount(0);
        navigate('/');
        setCurrent('home');
    };

    const isAdmin = user?.roles?.includes('Admin');

    const cartMenu = (
        <Menu>
            {cartItems.length > 0 ? (
                <>
                    {cartItems.map((item, index) => (
                        <Menu.Item key={`cart-item-${index}`}>
                            <div style={{
                                width: '300px',
                                display: 'flex',
                                padding: '10px',
                                borderBottom: '1px solid #eee',
                                cursor: 'pointer'
                            }}>
                                <img
                                    src={item.image}
                                    style={{
                                        width: '50px',
                                        height: '50px',
                                        objectFit: 'cover',
                                        marginRight: '10px'
                                    }}
                                    alt={item.title}
                                />
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontWeight: 'bold' }}>{item.title}</div>
                                    <div style={{ color: '#888' }}>Số lượng: {item.quantity}</div>
                                    <div style={{ color: '#f60' }}>giá: {item.price.toLocaleString('vi-VN')}đ</div>
                                </div>
                            </div>
                        </Menu.Item>
                    ))}
                    <Menu.Divider />
                    <Menu.Item key="view-cart">
                        <Link to="/cart">Xem giỏ hàng</Link>
                    </Menu.Item>
                </>
            ) : (
                <Menu.Item key="empty-cart">Giỏ hàng trống</Menu.Item>
            )}
        </Menu>
    );

    const items = [
        {
            label: <Link to={"/"}>Home</Link>,
            key: 'home',
            icon: <HomeOutlined />,
        },
        ...(isAdmin ? [
            {
                label: <Link to={"/users"}>Users</Link>,
                key: 'users',
                icon: <UsergroupAddOutlined />
            },
            {
                label: <Link to={"/products"}>Products</Link>, // Sửa từ /product thành /products
                key: 'products', // Sửa key từ 'product' thành 'products'
                icon: <AuditOutlined />,
            }
        ] : []),
        {
            label: (
                <Dropdown overlay={cartMenu} trigger={['hover']}>
                    <Link to={"/cart"}>
                        <span className="cart-icon">Giỏ hàng</span>
                    </Link>
                </Dropdown>
            ),
            key: 'cart',
            icon: <Badge count={cartItemCount} size="small">
                <ShoppingCartOutlined className="cart-icon" />
            </Badge>,
        },
        ...(!user.userId ? [{
            label: <Link to={"/login"}>Đăng nhập</Link>,
            key: 'login',
            icon: <LoginOutlined />,
        }] : []),
        ...(user.userId ? [{
            label: `Welcome ${user.username}`,
            key: 'setting',
            icon: <AliwangwangOutlined />,
            children: [
                {
                    label: 'Đăng xuất',
                    key: 'logout',
                    onClick: handleLogout,
                },
            ],
        }] : []),
    ];

    return (
        <Menu
            onClick={onClick}
            selectedKeys={[current]}
            mode="horizontal"
            items={items}
            style={{ display: "flex", justifyContent: "center" }}
        />
    )
}

export default Header;