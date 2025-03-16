import { Table, Button, Popconfirm, notification, Image } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useState } from 'react';
import UpdateProduct from './update.product';
import { deleteProductAPI } from '../../services/api.service';

const ProductTable = ({ dataProducts, loadProducts }) => {
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const handleDelete = async (id) => {
        try {
            const res = await deleteProductAPI(id);
            if (res.data) {
                notification.success({
                    message: "Thành công",
                    description: "Xóa sản phẩm thành công"
                });
                await loadProducts();
            }
        } catch (error) {
            notification.error({
                message: "Có lỗi xảy ra",
                description: error.message
            });
        }
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Tên sản phẩm',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Hình ảnh',
            dataIndex: 'image',
            key: 'image',
            render: (image) => (
                <Image
                    width={50}
                    src={image.startsWith('http') ? image : `${import.meta.env.VITE_BACKEND_URL}/image/products/${image}`}
                />
            ),
        },
        {
            title: 'Giá',
            dataIndex: 'price',
            key: 'price',
            render: (price) => `${price.toLocaleString('vi-VN')}đ`,
        },
        {
            title: 'Số lượng',
            dataIndex: 'stock',
            key: 'stock',
        },
        {
            title: 'Danh mục ID',
            dataIndex: 'categoryId',
            key: 'categoryId',
        },
        {
            title: 'Thao tác',
            key: 'action',
            render: (_, record) => (
                <div style={{ display: 'flex', gap: 10 }}>
                    <Button
                        type="primary"
                        icon={<EditOutlined />}
                        onClick={() => {
                            setSelectedProduct(record);
                            setIsUpdateModalOpen(true);
                        }}
                    />
                    <Popconfirm
                        title="Xóa sản phẩm"
                        description="Bạn có chắc chắn muốn xóa sản phẩm này?"
                        onConfirm={() => handleDelete(record.id)}
                        okText="Có"
                        cancelText="Không"
                    >
                        <Button danger icon={<DeleteOutlined />} />
                    </Popconfirm>
                </div>
            ),
        },
    ];

    return (
        <>
            <Table
                columns={columns}
                dataSource={dataProducts}
                rowKey="id"
            />
            <UpdateProduct
                open={isUpdateModalOpen}
                onCancel={() => {
                    setIsUpdateModalOpen(false);
                    setSelectedProduct(null);
                }}
                product={selectedProduct}
                loadProducts={loadProducts}
            />
        </>
    );
};

export default ProductTable;
