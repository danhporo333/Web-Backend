import { Link, useNavigate } from 'react-router-dom';
import { Menu, Badge } from 'antd';
import { UsergroupAddOutlined, HomeOutlined, AuditOutlined, LoginOutlined, AliwangwangOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { useContext } from 'react';
import { AuthContext } from '../../context/auth.context';

const Header = ({ current, setCurrent }) => {
    const { user, setUser } = useContext(AuthContext);
    const navigate = useNavigate();

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
        localStorage.removeItem("cartItems");
        navigate('/');
        setCurrent('home');
    };

    const isAdmin = user?.roles?.includes('Admin');

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
                label: <Link to={"/books"}>Books</Link>,
                key: 'books',
                icon: <AuditOutlined />,
            }
        ] : []),
        {
            label: <Link to={"/cart"}>
                <Badge count={0} size="small">
                    <span className="cart-icon">Giỏ hàng</span>
                </Badge>
            </Link>,
            key: 'cart',
            icon: <ShoppingCartOutlined className="cart-icon" />,
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