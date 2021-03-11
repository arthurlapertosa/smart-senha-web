import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Establishments.css'

const BASE_URL = 'http://localhost:3000/api'

function Establishments() {
    const [establishments, setEstablishments] = useState([]);
    const navigate = useNavigate();

    const getEstablishments = async () => {
        try {
            const result = await axios.get(`${BASE_URL}/establishment`);
            setEstablishments(result.data);
        }
        catch (err) {
            console.error(err);
            return establishments;
        }
    }

    const goToPasswords = async (establishmentId) => {
        console.log(`going to passwords of establishment ${establishmentId}`);
        navigate(`/passwords/${establishmentId}`);
    }

    useEffect(() => {
        getEstablishments();
    })

    return (
        <div>
            <table>
                <tr>
                    <th>Nome do estabelecimento</th>
                    <th>Endereço</th>
                    <th>Fila</th>
                </tr>
                {establishments.map((establishment, index) => {
                    return (
                        <tr key={index}>
                            <td>
                                {establishment.name}
                            </td>
                            <td>
                                {establishment.address}
                            </td>
                            <td>
                                <button onClick={() => goToPasswords(establishment.id)}> Ir para a fila </button>
                            </td>
                        </tr>
                    );
                })
                }
            </table>
        </div>
    )
}

export default Establishments;
