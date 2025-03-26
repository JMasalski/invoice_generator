import React, {useEffect, useState} from 'react'
import {useClientStore} from "../../store/useClientStore.js";

import {useInvoiceStore} from "../../store/useInvoiceStore.js";
import {PlusIcon, TrashIcon} from "lucide-react";
import toast from "react-hot-toast";

const InvoiceForm = () => {
    const {fetchClient, clients, setSelectedClient, selectedClient} = useClientStore();
    const {addInvoice} = useInvoiceStore();

    const [selectedProducts, setSelectedProducts] = useState([{
        productName: "",
        quantity: "",
        price: "",
        taxRate: "",
        unit: ""
    }])
    const [dueDate, setDueDate] = useState("");

    useEffect(() => {
        fetchClient()
    }, [])

    const handleClientChange = (e) => {
        const client = clients.find(client => client._id === e.target.value)
        setSelectedClient(client)
    }
    const handleProductChange = (index, field, value) => {
        const updatedProducts = [...selectedProducts];
        updatedProducts[index][field] = value;
        setSelectedProducts(updatedProducts);
    };
    const addProductField = () => {
        setSelectedProducts([...selectedProducts, {productName: "", quantity: "", price: "", taxRate: "", unit: ""}])
    }
    const removeProductField = (index) => {
        const updatedProducts = [...selectedProducts];
        updatedProducts.splice(index, 1);
        setSelectedProducts(updatedProducts);
    }
    const calculateValue = (index) => {
        const product = selectedProducts[index];
        if (product.price) {
            return (product.price * product.quantity).toFixed(2)
        }
        return ""
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!selectedClient) {
            toast.error("Select client");
            return;
        }
        const hasValidProducts = selectedProducts.some(product =>
            product.productName.trim() !== "" &&
            product.quantity > 0 &&
            product.price > 0
        );

        if (!hasValidProducts) {
            toast.error("Please add a valid product with a name, quantity, and price");
            return;
        }

        const {_id} = selectedClient;

        const invoiceData = {
            client: _id,
            products: selectedProducts,
            dueDate
        }
        console.log(invoiceData)
        addInvoice(invoiceData);
    }
    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col space-y-4 mt-4"
        >
            <h2 className="text-lg mb-4">Create Invoice</h2>
            <div className="flex space-x-2">
                <div className="flex flex-col">
                    <label htmlFor="clientPick" className="text-sm font-medium text-gray-700">
                        Pick a client
                    </label>
                    <select
                        onChange={handleClientChange}
                        className="border border-gray-400 px-2 py-1 rounded h-10"
                        name="clientPick"
                        id="clientPick"
                    >
                        <option value={null}>Select Client</option>
                        {clients.map((client) => (
                            <option key={client._id} value={client._id}>
                                {client.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="flex flex-col ">
                    <label htmlFor="dueDate" className="text-sm font-medium text-gray-700">
                        Due date
                    </label>
                    <input
                        name="dueDate"
                        id="dueDate"
                        type="date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        className="border border-gray-400 px-2 py-1  rounded h-10"
                    />
                </div>
            </div>


            <div className="border border-gray-200  p-2 md:p-4 lg:p-6 rounded-lg relative">
                <h3 className="font-semibold text-lg">
                    Add products
                </h3>
                <div className="grid grid-cols-8 gap-2 my-2">
                    <div className="text-sm font-medium text-gray-700">Product Name</div>
                    <div className="text-sm font-medium text-gray-700">Quantity</div>
                    <div className="text-sm font-medium text-gray-700">Unit</div>
                    <div className="text-sm font-medium text-gray-700">Net price</div>
                    <div className="text-sm font-medium text-gray-700">Tax Rate %</div>
                    <div className="text-sm font-medium text-gray-700">Net value</div>
                    <div className="text-sm font-medium text-gray-700">Gross value</div>

                </div>

                {selectedProducts.map((product, index) => (
                    <div key={index} className="grid grid-cols-8 gap-2 items-center mb-2">
                        <input
                            type="text"
                            placeholder="Product Name"
                            value={product.productName}
                            onChange={(e) => handleProductChange(index, "productName", e.target.value)}
                            className="border px-2 py-1 rounded w-full"
                        />
                        <input
                            type="number"
                            placeholder="Quantity"
                            value={product.quantity}
                            onChange={(e) => handleProductChange(index, "quantity", Number(e.target.value))}
                            className="border px-2 py-1 rounded w-full"
                        />
                        <select
                            value={product.unit}
                            onChange={(e) => handleProductChange(index, "unit", e.target.value)}
                            className="border p-2 py-1 rounded w-full"
                        >
                            <option value="">Select Unit</option>
                            <optgroup label="Weight">
                                <option value="kg">Kilogram (kg)</option>
                                <option value="g">Gram (g)</option>
                                <option value="lb">Pound (lb)</option>
                                <option value="oz">Ounce (oz)</option>
                                <option value="t">Ton (t)</option>
                            </optgroup>
                            <optgroup label="Length">
                                <option value="m">Meter (m)</option>
                                <option value="cm">Centimeter (cm)</option>
                                <option value="mm">Millimeter (mm)</option>
                                <option value="km">Kilometer (km)</option>
                                <option value="in">Inch (in)</option>
                                <option value="ft">Foot (ft)</option>
                            </optgroup>
                            <optgroup label="Volume">
                                <option value="l">Liter (L)</option>
                                <option value="ml">Milliliter (mL)</option>
                                <option value="m3">Cubic meter (m³)</option>
                                <option value="gal">Gallon (gal)</option>
                                <option value="qt">Quart (qt)</option>
                            </optgroup>
                            <optgroup label="Time">
                                <option value="h">Hour (h)</option>
                                <option value="min">Minute (min)</option>
                                <option value="s">Second (s)</option>
                                <option value="day">Day</option>
                                <option value="week">Week</option>
                            </optgroup>
                            <optgroup label="Count">
                                <option value="pcs">Piece (pcs)</option>
                                <option value="doz">Dozen (doz)</option>
                                <option value="set">Set</option>
                                <option value="pair">Pair</option>
                            </optgroup>
                        </select>
                        <input
                            type="number"
                            placeholder="Net price"
                            value={product.price}
                            onChange={(e) => handleProductChange(index, "price", Number(e.target.value))}
                            className="border px-2 py-1 rounded w-full"
                        />
                        <input
                            type="number"
                            placeholder="Tax Rate %"
                            value={product.taxRate}
                            onChange={(e) => handleProductChange(index, "taxRate", Number(e.target.value))}
                            className="border px-2 py-1 rounded w-full"
                        />
                        <input
                            type="number"
                            placeholder="Net value"
                            value={calculateValue(index)}
                            readOnly
                            className="border px-2 py-1 rounded w-full"
                        />
                        <input
                            type="number"
                            placeholder="Gross value"
                            value={(calculateValue(index) * (1 + product.taxRate / 100)).toFixed(2)}
                            readOnly
                            className="border px-2 py-1 rounded w-full"
                        />
                        <button
                            onClick={() => removeProductField(index)}
                            className="size-8 flex justify-center items-center rounded-md text-white bg-red-500">
                            <TrashIcon size={18}/>
                        </button>
                    </div>
                ))}
                <button
                    type="button"
                    onClick={addProductField}
                    className="bg-[radial-gradient(circle,var(--tw-gradient-stops))] from-green-500 to-green-700 text-white size-8  rounded-full mt-2 flex justify-center items-center absolute">
                    <PlusIcon size={18}/>
                </button>
            </div>


            <button type="submit" className="bg-blue-500 ">Submit</button>
        </form>
    )
}


export default InvoiceForm
