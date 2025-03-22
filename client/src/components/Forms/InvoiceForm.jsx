import React, {useEffect, useState} from 'react';
import {useClientStore} from '../../store/useClientStore.js';
import {useProductStore} from '../../store/useProductStore.js';
import {useAuthStore} from '../../store/useAuthStore.js';

const InvoiceForm = () => {
    const {clients, fetchClient} = useClientStore();
    const {products, getProducts} = useProductStore();
    const {authUser} = useAuthStore();

    const [selectedClient, setSelectedClient] = useState(null);
    const [selectedProducts, setSelectedProducts] = useState([{id: '', quantity: 1, unit: ''}]);

    // Pobranie klientów i produktów przy załadowaniu komponentu
    useEffect(() => {
        fetchClient();
        getProducts();
    }, []);

    const handleClientChange = (e) => {
        const clientId = e.target.value;
        const client = clients.find((c) => c._id === clientId);
        setSelectedClient(client);
    };

    const handleProductChange = (index, e) => {
        const updatedProducts = [...selectedProducts];
        updatedProducts[index].id = e.target.value;
        setSelectedProducts(updatedProducts);
    };

    const handleQuantityChange = (index, e) => {
        const updatedProducts = [...selectedProducts];
        const value = e.target.value;
        updatedProducts[index].quantity = value === '' ? '' : parseInt(value) || 0;
        setSelectedProducts(updatedProducts);
    };

    const handleUnitChange = (index, e) => {
        const updatedProducts = [...selectedProducts];
        updatedProducts[index].unit = e.target.value;
        setSelectedProducts(updatedProducts);
    };

    const addProductField = () => {
        setSelectedProducts([...selectedProducts, {id: '', quantity: 1, unit: ''}]);
    };

    const removeProductField = (index) => {
        const updatedProducts = [...selectedProducts];
        updatedProducts.splice(index, 1);
        setSelectedProducts(updatedProducts);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const invoiceData = {
            authUser,
            client: selectedClient,
            products: selectedProducts
                .filter((p) => p.id)
                .map((p) => {
                    const product = products.find((prod) => prod._id === p.id);
                    return {
                        ...product,
                        quantity: p.quantity || 1,
                        unit: p.unit || 'pcs',
                    };
                }),
        };

        console.log('Invoice Data:', invoiceData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2 className="text-lg mb-4">Create Invoice</h2>

            {/* Wybór klienta */}
            <select
                onChange={handleClientChange}
                className="border p-2 mb-2 rounded w-1/2"
                value={selectedClient ? selectedClient._id : ''}
            >
                <option value="">Select Client</option>
                {clients.map((client) => (
                    <option key={client._id} value={client._id}>
                        {client.name}
                    </option>
                ))}
            </select>

            {/* Produkty */}
            {selectedProducts.map((product, index) => (
                <div key={index} className="flex items-center gap-2 mb-2">
                    <select
                        value={product.id}
                        onChange={(e) => handleProductChange(index, e)}
                        className="border p-2 rounded w-60"
                    >
                        <option value="">Select Product</option>
                        {products.map((prod) => (
                            <option key={prod._id} value={prod._id}>
                                {prod.name} - {prod.price} PLN
                            </option>
                        ))}
                    </select>

                    <input
                        type="number"
                        min="0"
                        value={product.quantity}
                        onChange={(e) => handleQuantityChange(index, e)}
                        className="border p-2 rounded w-20"
                        placeholder="Qty"
                    />

                    {/* Wybór jednostki miary */}
                    <select
                        value={product.unit}
                        onChange={(e) => handleUnitChange(index, e)}
                        className="border p-2 rounded w-40"
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
                    <button
                        type="button"
                        onClick={() => removeProductField(index)}
                        className="bg-red-500 text-white px-2 py-1 rounded"
                    >
                        Remove
                    </button>
                </div>
            ))}

            <button
                type="button"
                onClick={addProductField}
                className="bg-green-500 text-white px-4 py-2 rounded mt-2"
            >
                Add Product
            </button>

            <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
            >
                Generate PDF
            </button>
        </form>
    );
};

export default InvoiceForm;
