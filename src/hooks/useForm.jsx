import { useState } from 'react'

const useForm = (initialState) => {

    const [value, setvalue] = useState(initialState);

    function onChange(e) {
        setvalue({
            ...value,
            [e.target.name]: e.target.value
        });
    }

    function clear() {
        setvalue(initialState);
    }

    return {
        value,
        onChange,
        clear
    }
}

export default useForm