import React from 'react'
import Base64toBlob from 'Base64toBlob'
import ContractService from '../services/contract-service'

function Contract(){
    const[contract, setContract] = React.useState([]);
    let blob = null;
    let url = null;

    React.useEffect(() => {
        ContractService.getAll().then((response) => {
            setContract(response.data);
        })
    }, [])

    contract.forEach(cont => {
        blob = Base64toBlob(cont.bestand);
        url = URL.createObjectURL(blob);
    });
    
    return(
        <></>
    )
    
}