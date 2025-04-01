import React, {useEffect, useState} from 'react'
import {useClientStore} from "../../store/useClientStore.js";
import {useInvoiceStore} from "../../store/useInvoiceStore.js";
import {PlusIcon, TrashIcon} from "lucide-react";
import toast from "react-hot-toast";


const InvoiceForm = () => {
    const {fetchClients, clients, setSelectedClient, selectedClient} = useClientStore();
    const {addInvoice} = useInvoiceStore();

    const [selectedProducts, setSelectedProducts] = useState([{
        productName: "",
        quantity: "",
        price: "",
        taxRate: "",
        unit: ""
    }])
    const [dueDate, setDueDate] = useState("");
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("")
    useEffect(() => {
        fetchClients()
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
            dueDate,
            paymentType:selectedPaymentMethod,
        }
        // console.log(invoiceData)
        addInvoice(invoiceData);
    }
    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col space-y-4 mt-4"
        >
            <h2 className="text-xl mb-4 font-semibold">Stwórz fakturę</h2>
            <div className="flex space-x-2">
                <div className="flex flex-col">
                    <label htmlFor="clientPick" className="text-sm font-medium text-gray-700">
                        Wybierz klienta
                    </label>
                    <select
                        onChange={handleClientChange}
                        className="border border-gray-400 px-2 py-1 rounded h-10"
                        name="clientPick"
                        id="clientPick"
                    >
                        <option value={null}>Wybierz klienta</option>
                        {clients.map((client) => (
                            <option key={client._id} value={client._id}>
                                {client.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="flex flex-col ">
                    <label htmlFor="dueDate" className="text-sm font-medium text-gray-700">
                        Data płatności
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
                <div className="flex flex-col ">
                    <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700">
                        Metoda płatności
                    </label>
                    <select
                        id="paymentMethod"
                        value={selectedPaymentMethod}
                        onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                        className="border border-gray-400 px-2 py-1 rounded h-10"
                    >
                        <option value="gotówka">Gotówka</option>
                        <option value="karta">Karta płatnicza</option>
                        <option value="przelew_bankowy">Przelew bankowy</option>
                        <option value="blik">BLIK</option>
                        <option value="paypal">PayPal</option>
                        <option value="google_pay">Google Pay</option>
                        <option value="apple_pay">Apple Pay</option>
                        <option value="kryptowaluty">Kryptowaluty</option>
                        <option value="czek">Czek</option>
                        <option value="polecenie_zapłaty">Polecenie zapłaty</option>
                    </select>
                </div>
            </div>


            <div className="border border-gray-200  p-2 md:p-4 lg:p-6 rounded-lg relative">
                <h3 className="font-semibold text-lg">
                    Dodaj produkty
                </h3>
                <div className="grid grid-cols-8 gap-2 my-2">
                    <div className="text-sm font-medium text-gray-700">Nazwa produktu</div>
                    <div className="text-sm font-medium text-gray-700">Ilość</div>
                    <div className="text-sm font-medium text-gray-700">Jednostka miary</div>
                    <div className="text-sm font-medium text-gray-700">Cena netto</div>
                    <div className="text-sm font-medium text-gray-700">VAT %</div>
                    <div className="text-sm font-medium text-gray-700">Wartość netto</div>
                    <div className="text-sm font-medium text-gray-700">Wartość brutto</div>

                </div>

                {selectedProducts.map((product, index) => (
                    <div key={index} className="grid grid-cols-8 gap-2 items-center mb-2">
                        <input
                            type="text"
                            placeholder="Nazwa produktu"
                            value={product.productName}
                            onChange={(e) => handleProductChange(index, "productName", e.target.value)}
                            className="border px-2 py-1 rounded w-full"
                        />
                        <input
                            type="number"
                            placeholder="Ilość"
                            value={product.quantity || ''}
                            onChange={(e) => handleProductChange(index, "quantity", e.target.value ? Number(e.target.value) : '')}
                            className="border px-2 py-1 rounded w-full"
                        />
                        <select
                            value={product.unit}
                            onChange={(e) => handleProductChange(index, "unit", e.target.value)}
                            className="border p-2 py-1 rounded w-full"
                        >
                            <option value="-">Brak</option>
                            <optgroup label="Waga">
                                <option value="kg">Kilogram (kg)</option>
                                <option value="g">Gram (g)</option>
                                <option value="lb">Funt (lb)</option>
                                <option value="oz">Uncja (oz)</option>
                                <option value="t">Tona (t)</option>
                            </optgroup>
                            <optgroup label="Długość">
                                <option value="m">Metr (m)</option>
                                <option value="cm">Centymetr (cm)</option>
                                <option value="mm">Milimetr (mm)</option>
                                <option value="km">Kilometr (km)</option>
                                <option value="in">Cal (in)</option>
                                <option value="ft">Stopa (ft)</option>
                            </optgroup>
                            <optgroup label="Objętość">
                                <option value="l">Litr (L)</option>
                                <option value="ml">Mililitr (mL)</option>
                                <option value="m3">Metr sześcienny (m³)</option>
                                <option value="gal">Galon (gal)</option>
                                <option value="qt">Kwarta (qt)</option>
                            </optgroup>
                            <optgroup label="Czas">
                                <option value="h">Godzina (h)</option>
                                <option value="min">Minuta (min)</option>
                                <option value="s">Sekunda (s)</option>
                                <option value="day">Dzień</option>
                                <option value="week">Tydzień</option>
                            </optgroup>
                            <optgroup label="Sztuki">
                                <option value="szt">Sztuka (szt.)</option>
                                <option value="doz">Tuzin (doz.)</option>
                                <option value="zestaw">Zestaw</option>
                                <option value="para">Para</option>
                            </optgroup>
                        </select>

                        <input
                            type="number"
                            placeholder="Cena netto"
                            value={product.price || ''}
                            onChange={(e) => handleProductChange(index, "price", e.target.value ? Number(e.target.value) : '')}
                            className="border px-2 py-1 rounded w-full"
                        />
                        <input
                            type="number"
                            placeholder="VAT %"
                            value={product.taxRate || ''}
                            onChange={(e) => handleProductChange(index, "taxRate", e.target.value ? Number(e.target.value) : '')}
                            className="border px-2 py-1 rounded w-full"
                        />

                        <input
                            type="number"
                            placeholder="Wartość netto"
                            value={calculateValue(index)}
                            readOnly
                            className="border px-2 py-1 rounded w-full"
                        />
                        <input
                            type="number"
                            placeholder="Wartość brutto"
                            value={(calculateValue(index) * (1 + product.taxRate / 100)).toFixed(2)}
                            readOnly
                            className="border px-2 py-1 rounded w-full"
                        />
                        <button
                            onClick={() => removeProductField(index)}
                            aria-label="Usuń produkt"
                            className="size-8 flex justify-center items-center rounded-full text-white bg-[radial-gradient(circle,var(--tw-gradient-stops))] from-red-500 to-red-700">
                            <TrashIcon size={18}/>
                        </button>
                    </div>
                ))}
                <button
                    type="button"
                    aria-label="Dodaj produkt"
                    onClick={addProductField}
                    className="bg-[radial-gradient(circle,var(--tw-gradient-stops))] from-green-500 to-green-700 text-white size-8  rounded-full mt-2 flex justify-center items-center absolute">
                    <PlusIcon size={18}/>
                </button>
            </div>

            {/*Podsumowanie finansowe*/}
            <div className="flex flex-col ml-auto space-y-5 w-full max-w-[300px]">
                <div className="flex justify-between w-full border-b border-gray-400 pb-1">
                    <p>Suma netto</p>
                    <p>{selectedProducts.reduce((sum, product) => sum + product.price * product.quantity, 0).toFixed(2)} PLN</p>
                </div>
                <div className="flex justify-between w-full border-b border-gray-400 pb-1">
                    <p>Suma VAT</p>
                    <p>{(selectedProducts.reduce((sum, product) => sum + product.price * product.quantity * product.taxRate / 100, 0)).toFixed(2)} PLN</p>
                </div>
                <div className="flex justify-between w-full border-b border-gray-400 pb-1">
                    <p>Suma brutto</p>
                    <p>{selectedProducts.reduce((sum, product) => sum + product.price * product.quantity * (1 + product.taxRate / 100), 0).toFixed(2)} PLN</p>
                </div>
            </div>


            <button type="submit" className="bg-blue-500 ">Submit</button>

        </form>
    )
}


export default InvoiceForm
