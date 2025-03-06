import { Button, Input, notification, Modal, Select } from "antd";
import { useState, useEffect } from "react";
import { createUserAPI, fetchAllRoleAPI } from "../../services/api.service";

const UserForm = (props) => {
    const { loadUser } = props;
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [role, setRole] = useState(""); // Thay đổi từ mảng sang chuỗi
    const [dataRoles, setDataRoles] = useState([]);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSubmitBtn = async () => {
        const res = await createUserAPI(email, username, password, phone, role);
        if (res.data) {
            notification.success({
                message: "Create user",
                description: "Tạo user thành công"
            })
            restAndCloseModal();
            await loadUser();
        } else {
            notification.error({
                message: "Error create user",
                description: JSON.stringify(res.message)
            })
        }
    }

    useEffect(() => {
        loadRole();
    }, [])

    const loadRole = async () => {
        const res = await fetchAllRoleAPI();
        setDataRoles(res.data.roles);
    }

    const restAndCloseModal = () => {
        setEmail("");
        setUsername("");
        setPassword("");
        setPhone("");
        setRole(""); // Đặt lại vai trò thành chuỗi rỗng
        setIsModalOpen(false);
    }

    return (
        <div className="user-form" style={{ margin: "20px 0" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h3>Table User</h3>
                <Button
                    onClick={() => setIsModalOpen(true)}
                    type="primary"> Create User </Button>
            </div>
            <Modal title="Basic Modal"
                open={isModalOpen}
                onOk={() => handleSubmitBtn()}
                onCancel={() => restAndCloseModal()}
                maskClosable={false}
                okText={"Create"}
            >
                <div style={{ display: "flex", gap: "15px", flexDirection: "column" }}>
                    <div>
                        <span>Email</span>
                        <Input
                            value={email}
                            onChange={(event) => { setEmail(event.target.value) }}
                        />
                    </div>
                    <div>
                        <span>Username</span>
                        <Input
                            value={username}
                            onChange={(event) => { setUsername(event.target.value) }}
                        />
                    </div>
                    <div>
                        <span>Password</span>
                        <Input.Password
                            value={password}
                            onChange={(event) => { setPassword(event.target.value) }}
                        />
                    </div>
                    <div>
                        <span>Phone number</span>
                        <Input
                            value={phone}
                            onChange={(event) => { setPhone(event.target.value) }}
                        />
                    </div>
                    <div>
                        <span>Vai trò</span>
                        <Select
                            style={{ width: '100%' }}
                            onChange={(value) => setRole(value)} // Cập nhật vai trò được chọn
                        >
                            {dataRoles.map(role => (
                                <Select.Option key={role.name} value={role.name}>
                                    {role.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default UserForm;