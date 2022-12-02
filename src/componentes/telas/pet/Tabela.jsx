import { useContext } from 'react';
import PetContext from './PetContext';
import Alerta from '../../Alerta';

 // -- nome, raca, porte, dono

function Tabela() {

    // pegando as variáveis e métodos do contexto
    const { setObjeto, alerta, setAlerta,
        listaObjetos, remover, setEditar, recuperar } = useContext(PetContext);

    return (
        <div style={{ padding: '20px' }}>
            <h1>Pets</h1>
            <Alerta alerta={alerta} />
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalEdicao"
                onClick={() => {
                    setObjeto({
                        codigo: 0,
                        nome: "",
                        raca: "",
                        porte: "", 
                        dono : ""
                    });
                    setEditar(false);
                    setAlerta({ status: "", message: "" });
                }}>
                Novo <i className="bi bi-file-earmark-plus"></i>
            </button>
            {listaObjetos.length === 0 &&
                <h1>Nenhuma Pet encontrada</h1>}
            {listaObjetos.length > 0 && (
                <div className="table-responsive">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col"
                                    style={{ textAlign: 'center' }}>Ações</th>
                                <th scope="col">Código</th>
                                <th scope="col">Nome</th>
                                <th scope="col">Raca</th>
                                <th scope="col">Porte</th>
                                <th scope="col">Dono</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listaObjetos.map(objeto => (
                                <tr key={objeto.codigo}>
                                    <td align="center">
                                        <button className="btn btn-info" type="button"
                                            data-bs-toggle="modal"
                                            data-bs-target="#modalEdicao"
                                            onClick={() => {
                                                recuperar(objeto.codigo);
                                                setEditar(true);
                                                setAlerta({ status: "", message: "" });
                                            }}>
                                            <i className="bi bi-pencil-square"></i>
                                        </button>
                                        <button className="btn btn-danger" title="Remover"
                                            onClick={() => { remover(objeto); }}>
                                            <i className="bi bi-trash"></i>
                                        </button>
                                    </td>
                                    <th scope="row">{objeto.codigo}</th>
                                    <td>{objeto.nome}</td>
                                    <td>{objeto.raca}</td>
                                    <td>{objeto.porte}</td>
                                    <td>{objeto.nomedono}</td>
                                </tr>
                            ))}



                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}

export default Tabela;