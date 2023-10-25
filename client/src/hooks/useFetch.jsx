import axios from "axios";
import { useState, useEffect } from "react";

export default function useFetch(url) {
    const [error, setError] = useState(null)
    const [data, setData] = useState([]);

    useEffect(() => {
        apiCall();
    }, [])


    async function apiCall() {
        axios.get(url)
            .then(response => setData(response.data))
            .catch(err => { setError(err) })
    }
    return [data, error]
}