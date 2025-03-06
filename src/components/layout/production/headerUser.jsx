import { Link } from 'react-router-dom';
import { Menu, Button } from 'antd';
import { UsergroupAddOutlined, HomeOutlined, AuditOutlined } from '@ant-design/icons';
import { useState } from 'react';

const HeaderUserNew = () => {
    const [current, setCurrent] = useState('');
    const onClick = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
    };
    const items = [
        {
            label: <Link to={"/"}>Home</Link>,
            key: 'home',
            icon: <HomeOutlined />,
        },
        {
            label: <Link to={"/users"}>Users</Link>,
            key: 'users',
            icon: <UsergroupAddOutlined />
        },
        {
            label: <Link to={"/books"}>Books</Link>,
            key: 'books',
            icon: <AuditOutlined />,

        },
        {
            label: <Link to={"/new"}>New</Link>,
            key: 'new',
            icon: <AuditOutlined />,
        },

    ];
    return (
        // <ul>
        //     <li><NavLink to="/">Home</NavLink></li>
        //     <li><NavLink to="/users">Users</NavLink></li>
        //     <li><NavLink to="/books">Books</NavLink></li>
        // </ul>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Menu
                onClick={onClick}
                selectedKeys={[current]}
                mode="horizontal"
                items={items}
            />
            <Button type="primary">Register</Button>
        </div>
    )
}

export default HeaderUserNew;