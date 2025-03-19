import React from 'react'
import {useClientStore} from '../../store/useClientStore'
const ClientForm = () => {
    const {addClient} = useClientStore();
    return (
        <div>ClientForm</div>
    )
}
export default ClientForm
