import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api'

function Passwords() {
    const [passwords, setPasswords] = useState([]);
    const params = useParams();
    const navigate = useNavigate();

    const getPasswords = async () => {
        try {
            const { id } = params;
            const result = await axios.get(`${BASE_URL}/password/byEstablishment/${id}`);
            return result;
        }
        catch (err) {
            console.error(err);
            return passwords;
        }
    }

    const updatePasswords = async () => {
        const passwords = await getPasswords();
        setPasswords(passwords.data)
    }

    const setAsAttended = async (id) => {
        try {
            await axios.put(`${BASE_URL}/password/complete/${id}`);
            updatePasswords();
        }
        catch (err) {
            console.error(err);
        }
    }

    const deletePassword = async (id) => {
        try {
            await axios.delete(BASE_URL + '/password/' + id);
            updatePasswords();
        }
        catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        updatePasswords();
    })

    return (
        <div>
            <table>
                <tr>
                    <th>Senha</th>
                    <th>Nome</th>
                    <th>Atendido?</th>
                    <th>Marcar como atendido</th>
                    <th>Excluir</th>
                </tr>
                {passwords.map((password, index) => {
                    return (
                        <tr key={index}>
                            <td>
                                {password.id}
                            </td>
                            <td>
                                {password.username}
                            </td>
                            <td style={{
                                backgroundColor: password.already_attended ? 'green' : 'red',
                                color: 'white'
                            }}>
                                {password.already_attended ? 'Sim' : 'Não'}
                            </td>
                            <td>
                                <button onClick={() => setAsAttended(password.id)}>Marcar como atendido</button>
                            </td>
                            <td>
                                <button onClick={() => deletePassword(password.id)}>Excluir</button>
                            </td>
                        </tr>
                    );
                })
                }
            </table>
            <button onClick={() => navigate(-1)}>
                Voltar
            </button>
        </div>
    )
}

export default Passwords;
