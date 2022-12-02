import React, { useState, useEffect } from 'react';
import DonoContext from './DonoContext';
import Tabela from './Tabela';
import Form from './Form';
import Carregando from '../../Carregando';

import WithAuth from "../../seg/WithAuth";
import Autenticacao from "../../seg/Autenticacao";
import { useNavigate } from "react-router-dom";

function Dono() {

    let navigate = useNavigate();

    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [listaObjetos, setListaObjetos] = useState([]);
    const [editar, setEditar] = useState(false);
    const [objeto, setObjeto] = useState({
        // -- nome, endereco, telefone
        codigo: "", nome: "",
        endereco: "", telefone: ""
    });
    const [carregando, setCarregando] = useState(true);

    const recuperar = async codigo => {        
        await fetch(`${process.env.REACT_APP_ENDERECO_API}/donos/${codigo}`)
            .then(response => response.json())
            .then(data => setObjeto(data))
            .catch(err => setAlerta({ status: "error", message: err }))        
    }

    const acaoCadastrar = async e => {
        e.preventDefault();
        const metodo = editar ? "PUT" : "POST";
        try {
            await fetch(`${process.env.REACT_APP_ENDERECO_API}/donos`,
                {
                    method: metodo,
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(objeto)
                }).then(response => response.json())
                .then(json => {
                    setAlerta({ status: json.status, message: json.message });
                    setObjeto(json.objeto);
                    if (!editar) {
                        setEditar(true);
                    }
                })
        } catch (err) {
            console.log(err.message);
        }
        recuperaDonos();
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setObjeto({ ...objeto, [name]: value })
    }

    const recuperaDonos = async () => {
        setCarregando(true);
        await fetch(`${process.env.REACT_APP_ENDERECO_API}/donos`)
            .then(response => response.json())
            .then(data => setListaObjetos(data))
            .catch(err => setAlerta({ status: "error", message: err }));
        setCarregando(false);
        
    }

    const remover = async objeto => {
        if (window.confirm('Deseja remover este objeto?')) {
            try {
                // chamada ao método de remover da api
                await
                    fetch(`${process.env.REACT_APP_ENDERECO_API}/donos/${objeto.codigo}`,
                        { method: "DELETE" })
                        .then(response => response.json())
                        .then(json =>
                            setAlerta({ status: json.status, message: json.message }))
                // consulto a api novamente para trazer os registros do banco atualizados
                recuperaDonos();

            } catch (err) {
                console.log('Erro: ' + err)
            }
        }
    }

    useEffect(() => {
        recuperaDonos()
    }, []);

    return (

        <DonoContext.Provider value={
            {
                alerta, setAlerta,
                listaObjetos, setListaObjetos,
                recuperaDonos, remover,
                objeto, setObjeto,
                editar, setEditar,
                recuperar,
                acaoCadastrar,
                handleChange
            }
        }>
            { !carregando ? <Tabela /> : <Carregando/> }
            <Form />

        </DonoContext.Provider>

    )
}

export default Dono;