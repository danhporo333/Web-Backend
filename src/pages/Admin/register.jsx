import { Button, Input, Form, notification, Divider } from "antd";
import { register } from "../../services/api.service";
import { Link, useNavigate } from "react-router-dom";
import { UserOutlined, LockOutlined, PhoneOutlined, MailOutlined } from '@ant-design/icons';

const RegisterPage = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const onFinish = async (values) => {
        //call api
        const res = await register(
            values.email,
            values.username,
            values.password,
            values.phone);

        if (res.data) {
            notification.success({
                message: "Register user",
                description: "Đăng ký user thành công"
            });
            navigate("/login");
        } else {
            notification.error({
                message: "Register user error",
                description: JSON.stringify(res.message)
            })
        }
    }

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            background: '#f0f2f5'
        }}>
            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                style={{
                    padding: '2rem',
                    background: 'white',
                    borderRadius: '8px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    width: '100%',
                    maxWidth: '400px'
                }}
            >
                <h2 style={{
                    textAlign: "center",
                    marginBottom: '2rem',
                    color: '#1890ff'
                }}>Đăng ký tài khoản</h2>

                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        {
                            required: true,
                            type: 'email',
                            message: 'Vui lòng nhập email hợp lệ!',
                        },
                    ]}
                >
                    <Input prefix={<MailOutlined />} placeholder="Nhập email" />
                </Form.Item>

                <Form.Item
                    label="Tên người dùng"
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập tên người dùng!',
                        },
                    ]}
                >
                    <Input prefix={<UserOutlined />} placeholder="Nhập tên người dùng" />
                </Form.Item>

                <Form.Item
                    label="Mật khẩu"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập mật khẩu!',
                        },
                        {
                            min: 6,
                            message: 'Mật khẩu phải có ít nhất 6 ký tự!',
                        }
                    ]}
                >
                    <Input.Password prefix={<LockOutlined />} placeholder="Nhập mật khẩu" />
                </Form.Item>

                <Form.Item
                    label="Số điện thoại"
                    name="phone"
                    rules={[
                        {
                            required: true,
                            pattern: new RegExp(/^[0-9]{10}$/),
                            message: "Vui lòng nhập số điện thoại hợp lệ!"
                        }
                    ]}
                >
                    <Input prefix={<PhoneOutlined />} placeholder="Nhập số điện thoại" />
                </Form.Item>

                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        style={{ width: '100%' }}
                    >
                        Đăng ký
                    </Button>
                </Form.Item>

                <Divider plain>Hoặc</Divider>

                <div style={{ textAlign: 'center' }}>
                    Đã có tài khoản? <Link to="/login">Đăng nhập ngay</Link>
                </div>
            </Form>
        </div>
    )
}

export default RegisterPage;