import React, {useState} from 'react'
import {useProductStore} from "../../store/useProductStore.js";
import {LoaderCircle, Plus} from "lucide-react";

const ProductForm = ({addProduct}) => {
    const [productData, setProductData] = useState({
        name: "",
        price: "",
        taxRate: ""
    })
    //TODO Add pagination
    // Add search
    const {productLoading}=useProductStore()
    return (
        <form className="mt-5"
              onSubmit={(e) => {
                  e.preventDefault();
                  addProduct(productData);
                  setProductData({
                          name: "",
                          price: "",
                          taxRate: ""
                      }
                  )
              }}
        >
            <div className="w-[50%]">
                <div className="flex flex-col mb-3  ">
                    <label htmlFor='name' className=" text-md fond-medium text-gray-800">Name</label>
                    <input
                        id="name"
                        type="text"
                        value={productData.name}
                        onChange={(e) => setProductData({...productData, name: e.target.value})}
                        className="border-b-2 border-gray-400 focus:border-gray-700 focus:outline-none"
                    />
                </div>
                <div className="flex flex-col mb-3 gap-2 ">
                    <label htmlFor='price' className=" text-md fond-medium text-gray-800 ">
                        Net price
                    </label>
                    <input
                        id="price"
                        type="number"
                        value={productData.price}
                        onChange={(e) => setProductData({...productData, price: e.target.value})}
                        className="border-b-2 border-gray-400 focus:border-gray-700 focus:outline-none"

                    />
                </div>
                <div className="flex flex-col mb-3 gap-2 ">
                    <label htmlFor='taxRate' className=" text-md fond-medium text-gray-800">Tax rate</label>
                    <input
                        id="taxRate"
                        type="number"
                        value={productData.taxRate}
                        onChange={(e) => setProductData({...productData, taxRate: e.target.value})}
                        className="border-b-2 border-gray-400 focus:border-gray-700 focus:outline-none"
                        placeholder="eg. 5 is 5%"
                        max="100"
                    />
                </div>
                <button
                    type="submit"
                    disabled={productLoading}
                    className="bg-blue-200 text-blue-700 rounded-md w-full flex items-center justify-center p-2"
                >
                    {productLoading ? <LoaderCircle className="animate-spin"/> : <Plus/>}
                </button>
            </div>
        </form>
    )
}
export default ProductForm
