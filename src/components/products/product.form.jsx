import { Button, Input, InputNumber, Modal, Upload, notification, Select } from 'antd';
import { useState, useEffect } from 'react';
import { createProductAPI, handleUploadFile, fetchAllCategoryAPI } from '../../services/api.service';
import { UploadOutlined } from '@ant-design/icons';

const ProductForm = (props) => {
    const { loadProducts } = props;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [stock, setStock] = useState(0);
    const [image, setImage] = useState(null);
    const [categoryId, setCategoryId] = useState("");
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        loadCategories();
    }, []);

    const loadCategories = async () => {
        try {
            const res = await fetchAllCategoryAPI();
            setCategories(res.data.categories);
        } catch (error) {
            notification.error({
                message: "Lỗi",
                description: "Không thể tải danh mục sản phẩm"
            });
        }
    };

    const handleSubmit = async () => {
        try {
            setLoading(true);

            if (!name || !price || !stock || !categoryId || !image) {
                notification.error({
                    message: "Thiếu thông tin",
                    description: "Vui lòng điền đầy đủ thông tin sản phẩm"
                });
                return;
            }

            const resUpload = await handleUploadFile(image, "products");
            console.log(">>> add result:", resUpload);
            if (resUpload.data) {
                //success
                const newThumbnail = resUpload.data.name;
                const resProduct = await createProductAPI(name, description, price, stock, categoryId, newThumbnail);

                if (resProduct.data) {
                    notification.success({
                        message: "Thành công",
                        description: "Thêm sản phẩm mới thành công"
                    });
                    resetForm();
                    loadProducts();
                } else {
                    notification.error({
                        message: "Lỗi",
                        description: "Thêm sản phẩm thất bại"
                    });
                }
            } else {
                notification.error({
                    message: "Lỗi",
                    description: "Upload hình ảnh thất bại"
                });
            }

        } catch (error) {
            console.error("Error:", error);
            notification.error({
                message: "Lỗi",
                description: error.message || "Thêm sản phẩm thất bại"
            });
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setName("");
        setPrice(0);
        setDescription("");
        setStock(0);
        setImage(null);
        setCategoryId("");
        setIsModalOpen(false);
    };

    return (
        <div>
            <Button type="primary" onClick={() => setIsModalOpen(true)}>
                Thêm sản phẩm mới
            </Button>

            <Modal
                title="Thêm sản phẩm mới"
                open={isModalOpen}
                onOk={handleSubmit}
                onCancel={resetForm}
                confirmLoading={loading}
            >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div>
                        <label>Tên sản phẩm:</label>
                        <Input
                            value={name}
                            onChange={e => setName(e.target.value)}
                            placeholder="Nhập tên sản phẩm"
                        />
                    </div>

                    <div>
                        <label>Giá:</label>
                        <InputNumber
                            style={{ width: '100%' }}
                            value={price}
                            onChange={value => setPrice(value)}
                            min={0}
                            placeholder="Nhập giá sản phẩm"
                        />
                    </div>

                    <div>
                        <label>Mô tả:</label>
                        <Input.TextArea
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            placeholder="Nhập mô tả sản phẩm"
                        />
                    </div>

                    <div>
                        <label>Số lượng:</label>
                        <InputNumber
                            style={{ width: '100%' }}
                            value={stock}
                            onChange={value => setStock(value)}
                            min={0}
                            placeholder="Nhập số lượng"
                        />
                    </div>

                    <div>
                        <label>Danh mục:</label>
                        <Select
                            style={{ width: '100%' }}
                            value={categoryId}
                            onChange={value => setCategoryId(value)}
                            placeholder="Chọn danh mục"
                        >
                            {categories.map(category => (
                                <Select.Option key={category.id} value={category.id}>
                                    {category.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </div>

                    <div>
                        <label>Hình ảnh:</label>
                        <Upload
                            accept="image/*"
                            maxCount={1}
                            beforeUpload={() => false}
                            onChange={({ file }) => {
                                if (file.status !== 'removed') {
                                    setImage(file);
                                }
                            }}
                        >
                            <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
                        </Upload>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default ProductForm;