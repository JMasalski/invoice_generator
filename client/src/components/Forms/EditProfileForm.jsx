import React, {useState} from 'react'
import {LoaderCircle} from "lucide-react";
import {useAuthStore} from "../../store/useAuthStore.js";


const EditProfileForm = () => {
    const { authUser, updateProfile,deleteAcc ,loading } = useAuthStore();

    const [editData, setEditData] = useState({
        name: authUser.name || '',
        email: authUser.email || '',
        companyName: authUser.companyName || '',
        taxId: authUser.taxId || '',
        address: {
            street: authUser.address?.street || '',
            city: authUser.address?.city || '',
            postalCode: authUser.address?.postalCode || '',
            country: authUser.address?.country || ''
        },
        bankAccount: authUser.bankAccount || '',
    });
    return (
        <form className="space-y-5 mt-2 text-lg" onSubmit={(e) => {
            e.preventDefault();
            updateProfile(editData);
        }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                    <label htmlFor="name" className="block text-md font-medium">Imię i nazwisko</label>
                    <input
                        id="name"
                        type="text"
                        className="input input-bordered bg-slate-950 border-indigo-400 text-white w-full"
                        value={editData.name}
                        onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                    />
                </div>
                <div>
                    <label htmlFor="country" className="block text-md font-medium">Kraj</label>
                    <input
                        id="country"
                        className="input input-bordered bg-slate-950 border-indigo-400 text-white w-full"
                        value={editData.address.country}
                        onChange={(e) => setEditData({ ...editData, address: { ...editData.address, country: e.target.value } })}
                    />
                </div>
                <div>
                    <label htmlFor="email" className="block text-md font-medium">Adres email</label>
                    <input
                        id="email"
                        type="email"
                        className="input input-bordered bg-slate-950 border-indigo-400 text-white w-full"
                        value={editData.email}
                        onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                    />
                </div>
                <div>
                    <label htmlFor="city" className="block text-md font-medium">Miasto</label>
                    <input
                        id="city"
                        className="input input-bordered bg-slate-950 border-indigo-400 text-white w-full"
                        value={editData.address.city}
                        onChange={(e) => setEditData({ ...editData, address: { ...editData.address, city: e.target.value } })}
                    />
                </div>
                <div>
                    <label htmlFor="companyName" className="block text-md font-medium">Nazwa firmy</label>
                    <input
                        id="companyName"
                        className="input input-bordered bg-slate-950 border-indigo-400 text-white w-full"
                        value={editData.companyName}
                        onChange={(e) => setEditData({ ...editData, companyName: e.target.value })}
                    />
                </div>
                <div>
                    <label htmlFor="street" className="block text-md font-medium">Street</label>
                    <input
                        id="street"
                        className="input input-bordered bg-slate-950 border-indigo-400 text-white w-full"
                        value={editData.address.street}
                        onChange={(e) => setEditData({ ...editData, address: { ...editData.address, street: e.target.value } })}
                    />
                </div>
                <div>
                    <label htmlFor="taxId" className="block text-md font-medium">NIP</label>
                    <input
                        id="taxId"
                        className="input input-bordered bg-slate-950 border-indigo-400 text-white w-full"
                        value={editData.taxId}
                        onChange={(e) => setEditData({ ...editData, taxId: e.target.value })}
                    />
                </div>
                <div>
                    <label htmlFor="postalCode" className="block text-md font-medium">Kod pocztowy</label>
                    <input
                        id="postalCode"
                        className="input input-bordered bg-slate-950 border-indigo-400 text-white w-full"
                        value={editData.address.postalCode}
                        onChange={(e) => setEditData({ ...editData, address: { ...editData.address, postalCode: e.target.value } })}
                    />
                </div>
                <div>
                    <label htmlFor="bankAccount" className="block text-md font-medium">Numer konta bankowego</label>
                    <input
                        id="bankAccount"
                        className="input input-bordered bg-slate-950 border-indigo-400 text-white w-full"
                        value={editData.bankAccount}
                        onChange={(e) => setEditData({ ...editData, bankAccount: e.target.value })}
                    />
                </div>
                <div className="mt-[28px] ">
                    <div className="flex gap-3">
                        <button
                            type="submit"
                            disabled={loading}
                            className="input w-full px-3 py-2 text-white bg-indigo-400 rounded-md hover:bg-indigo-600 transition duration-200 flex justify-center items-center cursor-pointer">
                            {loading ? <LoaderCircle className="animate-spin" /> : <span>Zapisz zmiany</span>}
                        </button>
                        <button
                            onClick={()=> deleteAcc()}
                            className="input w-full px-3 py-2 text-white bg-red-700 rounded-md hover:bg-red-800 flex justify-center transition duration-200 items-center cursor-pointer"
                        >
                            Usuń konto
                        </button>
                    </div>
                </div>
            </div>
        </form>
    )
}
export default EditProfileForm
