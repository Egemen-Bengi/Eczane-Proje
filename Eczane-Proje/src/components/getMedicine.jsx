import {useEffect, useState} from "react";
import BengiEczane from "./BengiEczane";

const Get = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
        method: "get",
        headers: myHeaders,
        redirect: "follow",
        
    };

    return fetch("https://v1.nocodeapi.com/bengi/google_sheets/CNbzVtWjswSphVic?tabId=Sayfa1", requestOptions)
        .then(response => response.json())
        .then(result => {
            return result
        })
        .catch(error => {
            throw error;
        });
}

const GetMedicine = () => {
    const [medicines, setMedicines] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try{
                const response = await Get();
                setMedicines(response.data || []);
            } catch (error){
                console.log(error)
            }
        }
        fetchData();
    }, []);

    return <BengiEczane medicinesData={medicines}></BengiEczane>
};

export default GetMedicine;