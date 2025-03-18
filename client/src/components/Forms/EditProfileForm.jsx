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
        phone: authUser.phone || ''
    });
    return (
        <form className="space-y-5 mt-5 text-lg" onSubmit={(e) => {
            e.preventDefault();
            updateProfile(editData);
        }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                    <label htmlFor="name" className="block text-md font-medium text-gray-800">Full name</label>
                    <input
                        id="name"
                        type="text"
                        className="w-full px-3 py-2 text-blue-700 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-700 focus:outline-none"
                        value={editData.name}
                        onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                    />
                </div>
                <div>
                    <label htmlFor="country" className="block text-md font-medium text-gray-800">Country</label>
                    <input
                        id="country"
                        className="w-full px-3 py-2 text-blue-700 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-700 focus:outline-none"
                        value={editData.address.country}
                        onChange={(e) => setEditData({ ...editData, address: { ...editData.address, country: e.target.value } })}
                    />
                </div>
                <div>
                    <label htmlFor="email" className="block text-md font-medium text-gray-800">Email address</label>
                    <input
                        id="email"
                        type="email"
                        className="w-full px-3 py-2 text-blue-700 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-700 focus:outline-none"
                        value={editData.email}
                        onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                    />
                </div>
                <div>
                    <label htmlFor="city" className="block text-md font-medium text-gray-800">City</label>
                    <input
                        id="city"
                        className="w-full px-3 py-2 text-blue-700 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-700 focus:outline-none"
                        value={editData.address.city}
                        onChange={(e) => setEditData({ ...editData, address: { ...editData.address, city: e.target.value } })}
                    />
                </div>
                <div>
                    <label htmlFor="companyName" className="block text-md font-medium text-gray-800">Company name</label>
                    <input
                        id="companyName"
                        className="w-full px-3 py-2 text-blue-700 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-700 focus:outline-none"
                        value={editData.companyName}
                        onChange={(e) => setEditData({ ...editData, companyName: e.target.value })}
                    />
                </div>
                <div>
                    <label htmlFor="street" className="block text-md font-medium text-gray-800">Street</label>
                    <input
                        id="street"
                        className="w-full px-3 py-2 text-blue-700 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-700 focus:outline-none"
                        value={editData.address.street}
                        onChange={(e) => setEditData({ ...editData, address: { ...editData.address, street: e.target.value } })}
                    />
                </div>
                <div>
                    <label htmlFor="taxId" className="block text-md font-medium text-gray-800">Tax ID</label>
                    <input
                        id="taxId"
                        className="w-full px-3 py-2 text-blue-700 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-700 focus:outline-none"
                        value={editData.taxId}
                        onChange={(e) => setEditData({ ...editData, taxId: e.target.value })}
                    />
                </div>
                <div>
                    <label htmlFor="postalCode" className="block text-md font-medium text-gray-800">Postal Code</label>
                    <input
                        id="postalCode"
                        className="w-full px-3 py-2 text-blue-700 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-700 focus:outline-none"
                        value={editData.address.postalCode}
                        onChange={(e) => setEditData({ ...editData, address: { ...editData.address, postalCode: e.target.value } })}
                    />
                </div>
                <div>
                    <label htmlFor="bankAccount" className="block text-md font-medium text-gray-800">Bank account</label>
                    <input
                        id="bankAccount"
                        className="w-full px-3 py-2 text-blue-700 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-700 focus:outline-none"
                        value={editData.bankAccount}
                        onChange={(e) => setEditData({ ...editData, bankAccount: e.target.value })}
                    />
                </div>
                <div>
                    <label htmlFor="phone" className="block text-md font-medium text-gray-800">Phone number</label>
                    <input
                        id="phone"
                        className="w-full px-3 py-2 text-blue-700 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-700 focus:outline-none"
                        value={editData.phone}
                        onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                    />
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full px-3 py-2 text-white bg-blue-700 rounded-md hover:bg-blue-800 flex justify-center items-center">
                    {loading ? <LoaderCircle className="animate-spin" /> : <span>Save changes</span>}
                </button>
                <button
                    onClick={()=> deleteAcc()}
                    className="w-full px-3 py-2 text-white bg-red-700 rounded-md hover:bg-red-800 flex justify-center items-center"
                >
                    Delete account
                </button>
            </div>
        </form>
    )
}
export default EditProfileForm
