import { useState, useEffect } from 'react';
import PetContext from './PetContext';
import Tabela from './Tabela';
import Form from './Form';
import Carregando from '../../Carregando';

function Pet() {

    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [listaObjetos, setListaObjetos] = useState([]);
    const [editar, setEditar] = useState(false);
    const [objeto, setObjeto] = useState({
        // -- nome, raca, porte, dono
        codigo: "", nome: "",
        raca: "", porte: "", dono: ""
    });
    const [listaDonos, setListaDonos] = useState([]);
    const [carregando, setCarregando] = useState(true);

    const recuperar = async codigo => {
        await fetch(`${process.env.REACT_APP_ENDERECO_API}/pets/${codigo}`)
            .then(response => response.json())
            .then(data => setObjeto(data))
            .catch(err => setAlerta({ status: "error", message: err }))
    }

    const acaoCadastrar = async e => {
        e.preventDefault();
        const metodo = editar ? "PUT" : "POST";
        try {
            await fetch(`${process.env.REACT_APP_ENDERECO_API}/pets`,
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
        recuperaPets();
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setObjeto({ ...objeto, [name]: value })
    }

    const recuperaDonos = async () => {
        await fetch(`${process.env.REACT_APP_ENDERECO_API}/donos`)
            .then(response => response.json())
            .then(data => setListaDonos(data))
            .catch(err => setAlerta({ status: "error", message: err }))
    }

    const recuperaPets = async () => {
        setCarregando(true);
        await fetch(`${process.env.REACT_APP_ENDERECO_API}/pets`)
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
                    fetch(`${process.env.REACT_APP_ENDERECO_API}/pets/${objeto.codigo}`,
                        { method: "DELETE" })
                        .then(response => response.json())
                        .then(json =>
                            setAlerta({ status: json.status, message: json.message }))
                // consulto a api novamente para trazer os registros do banco atualizados
                recuperaPets();

            } catch (err) {
                console.log('Erro: ' + err)
            }
        }
    }

    useEffect(() => {
        recuperaDonos();
        recuperaPets();
    }, []);

    return (
        <PetContext.Provider value={
            {
                alerta, setAlerta,
                listaObjetos, setListaObjetos,
                recuperaDonos, remover,
                objeto, setObjeto,
                editar, setEditar,
                recuperar,
                acaoCadastrar,
                handleChange, listaDonos
            }
        }>
            {!carregando ? <Tabela /> : <Carregando />}
            <Form />
        </PetContext.Provider>
    )
}

export default Pet;