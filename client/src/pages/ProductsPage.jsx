import React, { useEffect, useState } from 'react';
import { useProductStore } from "../store/useProductStore.js";
import { FileX, Loader, Pencil } from "lucide-react";
import ProductForm from "../components/Forms/ProductForm.jsx";

const ProductsPage = () => {
    const { getProducts, products, loading, deleteProduct,editProduct } = useProductStore();
    const [editData, setEditData] = useState(null);

    useEffect(() => {
        getProducts();
    }, [getProducts]);

    const openEditModal = (product) => {
        setEditData(product);
    };

    const closeEditModal = () => {
        setEditData(null);
    };
    const handleDeleteProduct = (pid) => {
        deleteProduct(pid)
    }

    const handleEditProduct= () => {
        editProduct(editData);
        console.log('Zaktualizowano produkt:', editData);
        closeEditModal();
    };

    return (
        <div className="flex flex-col md:flex-row gap-5 pt-1 md:pt-2 lg:pt-4">
            {/* Left side */}
            <div className="flex-1 gap-5">
                <h1 className="text-3xl leading-tight">Add New Product</h1>
                <ProductForm  />
            </div>

            {/* Right side */}
            <div className="flex-1">
                <h1 className="text-3xl leading-tight">Your Products</h1>
                <div className="flex gap-5">
                    <div className="mt-4 overflow-auto">
                        {loading && (
                            <div className="absolute inset-0 flex items-center justify-center bg-gray-50 bg-opacity-70 z-50">
                                <Loader className="animate-spin text-blue-500" size={48} />
                            </div>
                        )}
                        <table className="table-auto border-separate border-spacing-y-2">
                            <thead>
                            <tr>
                                <th className="px-4 py-2 border-b-2">Name</th>
                                <th className="px-4 py-2 border-b-2">Net Price</th>
                                <th className="px-4 py-2 border-b-2">Tax rate</th>
                                <th className="px-4 py-2 border-b-2">Gross Price</th>
                                <th className="px-4 py-2 border-b-2">Created At</th>
                                <th className="px-4 py-2 border-b-2">Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {products.map((product) => (
                                <tr key={product._id}>
                                    <td className="px-4 py-2">{product.name}</td>
                                    <td className="px-4 py-2">{product.price.toFixed(2)} PLN</td>
                                    <td className="px-4 py-2">{product.taxRate}%</td>
                                    <td className="px-4 py-2">
                                        {(product.price * (1 + product.taxRate / 100)).toFixed(2)} PLN
                                    </td>
                                    <td className="px-4 py-2">{product.createdAt.split("T")[0]}</td>
                                    <td className="px-4 py-2 flex space-x-3">
                                        <button
                                            className="bg-blue-500 p-2 text-white rounded-md"
                                            onClick={() => openEditModal(product)}
                                        >
                                            <Pencil size={15} />
                                        </button>
                                        <button
                                            className="bg-red-500 p-2 text-white rounded-md"
                                            onClick={() =>handleDeleteProduct(product._id)}
                                        >
                                            <FileX size={15} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Edit Modal */}
            {editData && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg w-96">
                        <h3 className="text-xl font-semibold mb-4">Edit Product</h3>
                        <div className="space-y-3">
                            <label className="block">Name</label>
                            <input
                                type="text"
                                name="name"
                                className="w-full p-2 border rounded"
                                value={editData.name}
                                onChange={(e) =>setEditData({ ...editData, name: e.target.value })}
                            />
                            <label className="block">Net Price</label>
                            <input
                                type="number"
                                name="price"
                                className="w-full p-2 border rounded"
                                value={editData.price}
                                onChange={(e) =>setEditData({ ...editData, price: e.target.value })}
                            />
                            <label className="block">Tax Rate</label>
                            <input
                                type="number"
                                name="taxRate"
                                className="w-full p-2 border rounded"
                                value={editData.taxRate}
                                onChange={(e) =>setEditData({ ...editData, taxRate: e.target.value })}
                            />
                        </div>
                        <div className="mt-4 flex justify-end space-x-2">
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded"
                                onClick={handleEditProduct}
                            >
                                Save
                            </button>
                            <button
                                className="bg-gray-500 text-white px-4 py-2 rounded"
                                onClick={closeEditModal}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductsPage;
