import React from 'react'
import { apiServiceSuscription } from '../api/apiServiceSuscription'


const useSuscription = () => {

    async function getAll() {
        try {
            const response = await apiServiceSuscription.get(`/suscription`);
            const data = response.data;
            if (!data.ok) {
                console.log(data);
                return [];
            }
            return data.data;
        } catch (error) {
            console.log(`useSuscription getAll: ${error}`);
            return [];
        }
    }

    return {
        getAll
    }

}

export default useSuscription