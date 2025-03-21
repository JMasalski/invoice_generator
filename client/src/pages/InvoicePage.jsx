import React, { useState, useEffect } from 'react';
import {useClientStore} from "../store/useClientStore.js";
import {useProductStore} from "../store/useProductStore.js";


const InvoicePage = () => {
    const { clients, fetchClient } = useClientStore();
    const { products, getProducts } = useProductStore();

    const [selectedClient, setSelectedClient] = useState(null);
    const [selectedProducts, setSelectedProducts] = useState([{ id: '', quantity: 1 }]);

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
        // Zmiana: bezpośrednio przypisujemy wartość z inputa, a domyślną wartość 1 tylko gdy pole jest puste
        const value = e.target.value;
        updatedProducts[index].quantity = value === '' ? '' : parseInt(value) || 0;
        setSelectedProducts(updatedProducts);
    };

    const addProductField = () => {
        setSelectedProducts([...selectedProducts, { id: '', quantity: 1 }]);
    };

    const removeProductField = (index) => {
        const updatedProducts = [...selectedProducts];
        updatedProducts.splice(index, 1);
        setSelectedProducts(updatedProducts);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const invoiceData = {
            client: selectedClient, // Cały obiekt klienta
            products: selectedProducts
                .filter((p) => p.id) // Filtrujemy tylko wybrane produkty
                .map((p) => {
                    const product = products.find((prod) => prod._id === p.id);
                    return {
                        ...product,
                        quantity: p.quantity || 1, // Zapewniamy, że quantity będzie zawsze prawidłowe
                    };
                }),
        };

        console.log("Invoice Data:", invoiceData);
        //generatePDF(invoiceData);
    };

    return (
        <form onSubmit={handleSubmit} className="p-4">
            <h2 className="text-2xl mb-4">Create Invoice</h2>

            {/* Wybór klienta */}
            <label>Client:</label>
            <select
                onChange={handleClientChange}
                className="border p-2 mb-2 rounded w-full"
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
                        className="border p-2 rounded w-full"
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

export default InvoicePage;