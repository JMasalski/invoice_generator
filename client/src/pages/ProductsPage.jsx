import React, {useEffect} from 'react'
import {useProductStore} from "../store/useProductStore.js";
import {FileX, Loader, Pencil} from "lucide-react";
import ProductForm from "../components/ProductForm.jsx";

const ProductsPage = () => {
    const {getProducts, products, loading, deleteProduct,addProduct} = useProductStore()
    useEffect(() => {
        getProducts()
    }, [getProducts])

    return (
        <div className="flex flex-col md:flex-row gap-5 pt-1 md:pt-2 lg:pt-4 ">
            {/* Left side*/}
            <div className="flex-1 gap-5">
                <h1 className="text-3xl leading-tight">
                    Add New Product
                </h1>
                <ProductForm addProduct={addProduct}/>
            </div>
            {/* Right side*/}
            <div className="flex-1">
                <h1 className="text-3xl leading-tight">
                    Your Products
                </h1>
                <div className="flex gap-5">
                    <div className="mt-4 overflow-auto">
                        {loading && (
                            <div
                                className="absolute inset-0 flex items-center justify-center bg-gray-50 bg-opacity-70 z-50">
                                <Loader className="animate-spin text-blue-500" size={48}/>
                            </div>
                        )}
                        <table className="table-auto border-separate border-spacing-y-2">
                            <thead>
                            <tr className="">
                                <th className="px-4 py-2 border-b-2">Name</th>
                                <th className="px-4 py-2 border-b-2">Net Price</th>
                                <th className="px-4 py-2 border-b-2">Tax rate</th>
                                <th className="px-4 py-2 border-b-2">Gross Price</th>
                                <th className="px-4 py-2 border-b-2">Created At</th>
                                <th className="px-4 py-2 border-b-2">Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {products.map(product => (
                                <tr key={product._id}>
                                    <td className="px-4 py-2">{product.name}</td>
                                    <td className="px-4 py-2">{product.price.toFixed(2)} PLN</td>
                                    <td className="px-4 py-2">{product.taxRate}%</td>
                                    <td className="px-4 py-2">{(product.price * (1 + (product.taxRate / 100))).toFixed(2)} PLN</td>
                                    <td className="px-4 py-2">{product.createdAt.split("T")[0]}</td>
                                    <td className="px-4 py-2 flex space-x-3">
                                        <button className="bg-blue-500 p-2 text-white rounded-md">
                                            <Pencil size={15}/>
                                        </button>
                                        <button className="bg-red-500 p-2 text-white rounded-md"
                                                onClick={() => deleteProduct(product._id)}>
                                            <FileX size={15}/>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </div>

    )
}
export default ProductsPage
