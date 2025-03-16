import { Modal, Input, InputNumber, Upload, Button, notification, Select } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { updateProductAPI, handleUploadFile, fetchAllCategoryAPI } from '../../services/api.service';

const UpdateProduct = ({ open, onCancel, product, loadProducts }) => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState('');
    const [stock, setStock] = useState(0);
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [categoryId, setCategoryId] = useState('');
    const [categories, setCategories] = useState([]);


    useEffect(() => {
        loadCategories();
    }, []);

    useEffect(() => {
        if (product) {
            setName(product.name);
            setPrice(product.price);
            setDescription(product.description);
            setStock(product.stock);
            setCategoryId(product.categoryId);
            setImage(null);
        }
    }, [product]);


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

    const handleUpdate = async () => {
        try {
            setLoading(true);

            if (
                name === product.name &&
                price === product.price &&
                description === product.description &&
                stock === product.stock &&
                categoryId === product.categoryId &&
                !image
            ) {
                notification.info({
                    message: "Thông báo",
                    description: "Không có thay đổi nào để cập nhật"
                });
                onCancel();
                return;
            }

            if (!name || !price || !stock || !categoryId) {
                notification.error({
                    message: "Thiếu thông tin",
                    description: "Vui lòng điền đầy đủ thông tin sản phẩm"
                });
                return;
            }

            let avatarName = product.image; // Giữ nguyên ảnh cũ
            // Chỉ upload và cập nhật ảnh mới nếu có file được chọn
            if (image) {
                const resUpload = await handleUploadFile(image, "products");
                if (resUpload.data) {
                    avatarName = resUpload.data.name;
                } else {
                    notification.error({
                        message: "Lỗi",
                        description: "Upload hình ảnh thất bại"
                    });
                    return;
                }
            }

            const resUpdateProduct = await updateProductAPI(
                product.id, name, description, price, stock, categoryId, avatarName
            );

            if (resUpdateProduct.data) {
                notification.success({
                    message: "Thành công",
                    description: "Cập nhật sản phẩm thành công"
                });
                loadProducts();
                onCancel();
            } else {
                notification.error({
                    message: "Lỗi",
                    description: "Cập nhật sản phẩm thất bại"
                });
            }
        } catch (error) {
            console.error("Error during update:", error);
            notification.error({
                message: "Có lỗi xảy ra",
                description: error.message || "Lỗi không xác định"
            });
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        setImage(null); // Reset image state
        onCancel(); // Call the original onCancel prop
    };

    return (
        <Modal
            title="Cập nhật sản phẩm"
            open={open}
            onOk={handleUpdate}
            onCancel={handleCancel}
            okText="Cập nhật"
            cancelText="Hủy"
            confirmLoading={loading}
        >
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <div>
                    <label>Tên sản phẩm:</label>
                    <Input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Nhập tên sản phẩm"
                    />
                </div>

                <div>
                    <label>Giá:</label>
                    <InputNumber
                        style={{ width: "100%" }}
                        value={price}
                        onChange={(value) => setPrice(value)}
                        min={0}
                        placeholder="Nhập giá sản phẩm"
                    />
                </div>

                <div>
                    <label>Mô tả:</label>
                    <Input.TextArea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Nhập mô tả sản phẩm"
                    />
                </div>

                <div>
                    <label>Số lượng:</label>
                    <InputNumber
                        style={{ width: "100%" }}
                        value={stock}
                        onChange={(value) => setStock(value)}
                        min={0}
                        placeholder="Nhập số lượng"
                    />
                </div>

                <div>
                    <label>Danh mục:</label>
                    <Select
                        style={{ width: "100%" }}
                        value={categoryId}
                        onChange={(value) => setCategoryId(value)}
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
                    <Upload
                        accept="image/*"
                        maxCount={1}
                        beforeUpload={() => false}
                        onChange={({ file }) => {
                            if (file && file.type.startsWith("image/")) {
                                setImage(file);
                            } else {
                                notification.error({
                                    message: "Lỗi",
                                    description: "Vui lòng chọn tệp hình ảnh hợp lệ",
                                });
                            }
                        }}
                        fileList={image ? [image] : []} // Control the fileList to show/hide uploaded file
                    >
                        <Button icon={<UploadOutlined />}>Thay đổi ảnh</Button>
                    </Upload>
                </div>
            </div>
        </Modal>
    );
};

export default UpdateProduct;