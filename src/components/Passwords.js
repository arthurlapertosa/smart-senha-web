import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL;

function Passwords() {
    const [passwords, setPasswords] = useState([]);
    const params = useParams();
    const navigate = useNavigate();

    const getPasswords = async () => {
        const { id } = params;
        const result = await axios.get(`${BASE_URL}/password/byEstablishment/${id}`);
        return result;
    }

    const updatePasswords = async () => {
        try {
            const passwords = await getPasswords();
            setPasswords(passwords.data)
        }
        catch (err) {
            console.error(err);
        }
    }

    const callPassword = async (id) => {
        try {
            await axios.put(`${BASE_URL}/password/calling/${id}`);
            updatePasswords();
        }
        catch (err) {
            console.error(err);
        }
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

    const setAsCanceled = async (id) => {
        try {
            await axios.put(`${BASE_URL}/password/cancel/${id}`);
            updatePasswords();
        }
        catch (err) {
            console.error(err);
        }
    }

    const deletePassword = async (id) => {
        try {
            await axios.delete(`${BASE_URL}/password/${id}`);
            updatePasswords();
        }
        catch (err) {
            console.error(err);
        }
    }

    const isPasswordCurrentlyBeingCalled = (password) => {
        return password.currently_calling && !password.already_attended;
    }

    useEffect(() => {
        updatePasswords();
        const interval = setInterval(() => updatePasswords(), 5000)
        return () => {
            clearInterval(interval);
        }
    }, [])

    return (
        <div>
            <table>
                <tr>
                    <th>Senha</th>
                    <th>Nome</th>
                    <th>Chamar senha</th>
                    <th>Atendido?</th>
                    <th>Marcar como atendido</th>
                    <th>Cancelar</th>
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
                                backgroundColor: isPasswordCurrentlyBeingCalled(password) ? 'green' : '',
                                color: isPasswordCurrentlyBeingCalled(password) ? 'white' : ''
                            }}>
                                {isPasswordCurrentlyBeingCalled(password) ?
                                    'Senha chamada!'
                                    :
                                    <button
                                        disabled={password.already_attended || password.canceled}
                                        onClick={() => callPassword(password.id)}>Chamar senha</button>
                                }
                            </td>
                            {password.canceled ?
                                <td style={{
                                    backgroundColor: 'black',
                                    color: 'white'
                                }}>
                                    Senha cancelada!
                                </td>
                                :
                                <td style={{
                                    backgroundColor: password.already_attended ? 'green' : 'red',
                                    color: 'white'
                                }}>
                                    {password.already_attended ? 'Sim' : 'Não'}
                                </td>
                            }
                            <td>
                                <button disabled={password.already_attended || password.canceled} onClick={() => setAsAttended(password.id)}>Marcar como atendido</button>
                            </td>
                            <td>
                                <button disabled={password.canceled} onClick={() => setAsCanceled(password.id)}>Cancelar</button>
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
