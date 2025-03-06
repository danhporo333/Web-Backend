import { useState, useEffect } from "react";
import { Input, notification, Modal, Select } from "antd";
import { updateUserAPI, fetchAllRoleAPI } from "../../services/api.service";

const UpdateUserModal = (props) => {
    const [id, setId] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [phone, setPhone] = useState("");
    const [role, setRole] = useState("");
    const [dataRoles, setDataRoles] = useState([]); // Thêm state để lưu danh sách vai trò
    const { isModalUpdateOpen, setIsModalUpdateOpen, dataUpdate, setDataUpdate, loadUser } = props;

    useEffect(() => {
        if (dataUpdate) {
            setId(dataUpdate.id);
            setEmail(dataUpdate.email);
            setUsername(dataUpdate.username);
            setPhone(dataUpdate.phone);
            setRole(dataUpdate.role); // Cập nhật giá trị vai trò
        }
    }, [dataUpdate]);

    useEffect(() => {
        loadRoles();
    }, []);

    const loadRoles = async () => {
        const res = await fetchAllRoleAPI();
        setDataRoles(res.data.roles);
    };

    const handleSubmitBtn = async () => {
        const res = await updateUserAPI(id, username, email, phone, role);
        if (res.data) {
            notification.success({
                message: "Update user",
                description: "Cập nhật user thành công"
            });
            resetAndCloseModal();
            await loadUser();
        } else {
            notification.error({
                message: "Error update user",
                description: JSON.stringify(res.message)
            });
        }
    };

    const resetAndCloseModal = () => {
        setIsModalUpdateOpen(false);
        setId("");
        setUsername("");
        setEmail("");
        setPhone("");
        setRole("");
        setDataUpdate(null);
    };

    return (
        <Modal
            title="Update a User"
            open={isModalUpdateOpen}
            onOk={() => handleSubmitBtn()}
            onCancel={() => resetAndCloseModal()}
            maskClosable={false}
            okText={"SAVE"}
        >
            <div style={{ display: "flex", gap: "15px", flexDirection: "column" }}>
                <div>
                    <span>Id</span>
                    <Input
                        value={id}
                        disabled
                    />
                </div>
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
                    <span>Phone number</span>
                    <Input
                        value={phone}
                        onChange={(event) => { setPhone(event.target.value) }}
                    />
                </div>
                <div>
                    <span>Vai trò</span>
                    <Select
                        value={role}
                        onChange={(value) => setRole(value)}
                        style={{ width: '100%' }}
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
    );
};

export default UpdateUserModal;