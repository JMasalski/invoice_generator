import React, {useEffect, useState} from 'react'
import {useClientStore} from "../../store/useClientStore.js";
import {useInvoiceStore} from "../../store/useInvoiceStore.js";
import {PlusIcon, TrashIcon,FilePlus} from "lucide-react";
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
            toast.error("Wybierz klienta!");
            return;
        }
        const hasValidProducts = selectedProducts.some(product =>
            product.productName.trim() !== "" &&
            product.quantity > 0 &&
            product.price > 0
        );

        if (!hasValidProducts) {
            toast.error("Wprowadź poprawne dane produtków");
            return;
        }

        const {_id} = selectedClient;

        const invoiceData = {
            client: _id,
            products: selectedProducts,
            dueDate,
            paymentType: selectedPaymentMethod,
        }
        // console.log(invoiceData)
        addInvoice(invoiceData);
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col space-y-4 text-white"
        >
            <div className="badge badge-info mb-4 p-2 md:p-5 ">
                <h2 className="text-xl  font-semibold flex items-center gap-x-4"><FilePlus /> Stwórz fakturę</h2>
            </div>
            <div className="flex flex-wrap gap-4">
                <div className="flex flex-col">
                    <label htmlFor="clientPick" className="text-sm font-medium">
                        Wybierz klienta
                    </label>
                    <select
                        onChange={handleClientChange}
                        className="select bg-slate-950  border-indigo-400 text-white"
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
                    <label htmlFor="dueDate" className="text-sm font-medium ">
                        Data płatności
                    </label>
                    <input
                        name="dueDate"
                        id="dueDate"
                        type="date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        className="input input-bordered bg-slate-950 border-indigo-400 text-white"
                    />
                </div>

                <div className="flex flex-col ">
                    <label htmlFor="paymentMethod" className="block text-sm font-medium ">
                        Metoda płatności
                    </label>
                    <select
                        id="paymentMethod"
                        value={selectedPaymentMethod}
                        onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                        className="select bg-slate-950  border-indigo-400 text-white"
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

            <div className="relative">
                <div className="border border-gray-200 p-2 md:p-4 lg:p-6 rounded-lg  overflow-x-auto">
                    <h3 className="font-semibold text-lg">
                        Dodaj produkty
                    </h3>
                    <div className="min-w-[1000px]"> {/* Minimalna szerokość dla zawartości */}
                        <div className="grid grid-cols-8 gap-2 my-2">
                            <div className="text-sm font-medium">Nazwa produktu</div>
                            <div className="text-sm font-medium">Ilość</div>
                            <div className="text-sm font-medium">Jednostka miary</div>
                            <div className="text-sm font-medium">Cena netto</div>
                            <div className="text-sm font-medium">VAT %</div>
                            <div className="text-sm font-medium">Wartość netto</div>
                            <div className="text-sm font-medium">Wartość brutto</div>
                        </div>

                        {selectedProducts.map((product, index) => (
                            <div key={index} className="grid grid-cols-8 gap-2 items-center mb-2">
                                <input
                                    type="text"
                                    placeholder="Nazwa produktu"
                                    value={product.productName}
                                    onChange={(e) => handleProductChange(index, "productName", e.target.value)}
                                    className="input input-bordered bg-slate-950 border-indigo-400 text-white w-full"
                                />
                                <input
                                    type="number"
                                    placeholder="Ilość"
                                    value={product.quantity || ''}
                                    onChange={(e) => handleProductChange(index, "quantity", e.target.value ? Number(e.target.value) : '')}
                                    className="input input-bordered bg-slate-950 border-indigo-400 text-white w-full"
                                />
                                <select
                                    value={product.unit}
                                    onChange={(e) => handleProductChange(index, "unit", e.target.value)}
                                    className="select bg-slate-950 border-indigo-400 text-white w-full"
                                >
                                    <option value="-">Brak</option>
                                    {/* Options go here */}
                                </select>

                                <input
                                    type="number"
                                    placeholder="Cena netto"
                                    value={product.price || ''}
                                    onChange={(e) => handleProductChange(index, "price", e.target.value ? Number(e.target.value) : '')}
                                    className="input input-bordered bg-slate-950 border-indigo-400 text-white w-full"
                                />
                                <input
                                    type="number"
                                    placeholder="VAT %"
                                    value={product.taxRate || ''}
                                    onChange={(e) => handleProductChange(index, "taxRate", e.target.value ? Number(e.target.value) : '')}
                                    className="input input-bordered bg-slate-950 border-indigo-400 text-white w-full"
                                />

                                <input
                                    type="number"
                                    placeholder="Wartość netto"
                                    value={calculateValue(index)}
                                    readOnly
                                    className="input input-bordered bg-slate-950 border-indigo-400 text-white w-full"
                                />
                                <input
                                    type="number"
                                    placeholder="Wartość brutto"
                                    value={(calculateValue(index) * (1 + product.taxRate / 100)).toFixed(2)}
                                    readOnly
                                    className="input input-bordered bg-slate-950 border-indigo-400 text-white w-full"
                                />
                                <button
                                    onClick={() => removeProductField(index)}
                                    aria-label="Usuń produkt"
                                    className="size-8 flex justify-center items-center rounded-full  bg-radial from-pink-400 to-pink-700 hover:bg-radial hover:from-pink-700 hover:to-pink-400 transition duration:200">
                                    <TrashIcon size={18}/>
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
                <button
                    type="button"
                    aria-label="Dodaj produkt"
                    onClick={addProductField}
                    className="bg-radial from-cyan-800 to-teal-400 size-6 md:size-8 hover:bg-radial hover:from-teal-400 hover:to-cyan-800 transition duration-200
                    rounded-full flex justify-center items-center absolute top-full right-full translate-x-12 translate-y-[-50%]">
                    <PlusIcon size={18}/>
                </button>
            </div>


            {/*Podsumowanie finansowe*/}
            <div className="flex flex-col text-sm md:text-md ml-auto space-y-5 w-full max-w-[200px] md:max-w-[300px]">
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


            <button type="submit"
                    className="bg-slate-800 rounded-md w-full flex items-center justify-center p-2 cursor-pointer hover:bg-slate-700 transition duration-200">
                Utwórz fakture
            </button>

        </form>
    )
}


export default InvoiceForm
