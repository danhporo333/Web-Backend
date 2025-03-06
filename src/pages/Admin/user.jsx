import UserForm from "../../components/user/user.form";
import UserTable from "../../components/user/user.table";
import { useEffect, useState } from 'react';
import { fetchAllUserAPI } from '../../services/api.service';

const UserPage = () => {

    const [dataUsers, setDataUsers] = useState([]);
    // console.log(">>> dataUsers", dataUsers)
    //empty array => run once
    useEffect(() => {
        console.log(">>> run useEffect 111")
        loadUser();
    }, []);

    const loadUser = async () => {
        const res = await fetchAllUserAPI();
        // Xử lý dữ liệu vai trò
        const usersWithRoles = res.data.users.map(user => ({
            ...user,
            role: user.Roles.map(role => role.name).join(', ')
        }));
        setDataUsers(usersWithRoles);
        console.log(">>> usersWithRoles", usersWithRoles);
    }
    return (
        <div style={{ padding: "20px" }}>
            <UserForm loadUser={loadUser} />
            <UserTable
                loadUser={loadUser}
                dataUsers={dataUsers} />
        </div>
    )
}

export default UserPage;