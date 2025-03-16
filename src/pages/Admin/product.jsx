import ProductForm from "../../components/products/product.form";
import ProductTable from "../../components/products/product.table";
import { useEffect, useState } from 'react';
import { fetchAllProductsAPI } from '../../services/api.service';

const ProductPage = () => {
    const [dataProducts, setDataProducts] = useState([]);

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        const res = await fetchAllProductsAPI();
        if (res.data) {
            setDataProducts(res.data.products);
            console.log(">>> Products:", res.data.products); // Debug log
        }
    }

    return (
        <div style={{ padding: "20px" }}>
            <ProductForm loadProducts={loadProducts} />
            <ProductTable
                loadProducts={loadProducts}
                dataProducts={dataProducts}
            />
        </div>
    )
}

export default ProductPage;