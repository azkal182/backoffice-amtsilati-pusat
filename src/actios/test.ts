"use server"

import axios from "axios";
const dummy = {
    nis: "1234",
    orderId:"ourtr6566",
    noRek: "1234",
    nama: "AZKAL",
    status: "PENDING",
    nominal: "50000",
    keterangan:"testing"
}

export const testCreate = async () => {
    try {
        const res = await axios.post('https://devo.finnet.co.id/pg/payment/card/initiate',{
            "customer": {
                id:dummy.nis.toString(),
                email: "azkal@gmail.com",
                "firstName": "Azkal",
                "lastName": "Azkal",
                "mobilePhone": "+6281286288844"
            },
            "order": {
                "id": dummy.orderId,
                "amount": "300000",
                "description": "Testing"
            },
            "url": {
                "successUrl": "https://6e9e-2400-9800-7c0-317b-b45c-4a09-f65f-387.ngrok-free.app/api/transactions/webhook",
                "failUrl": "https://6e9e-2400-9800-7c0-317b-b45c-4a09-f65f-387.ngrok-free.app/api/transactions/webhook",
                "callbackUrl": "https://6e9e-2400-9800-7c0-317b-b45c-4a09-f65f-387.ngrok-free.app/api/transactions/webhook"
            }
        }, {
            headers:{
                Authorization: "Basic U0VTQTE4OTp1SWtHbHI4T3ZEQ2hieHFIM1FObUJSWmpTWDFUYzRKTA=="
            }
        })
        if (res) {
            console.log(res)
            const insert = await axios.post('https://6e9e-2400-9800-7c0-317b-b45c-4a09-f65f-387.ngrok-free.app/api/transactions', dummy)
            console.log({insert})
        }

    } catch (e) {
        console.log(e)
    }
}