import { useContext } from 'react';
import Alerta from '../../Alerta';
import PetContext from './PetContext';

// -- nome, raca, porte, dono

function Form() {

    // Example starter JavaScript for disabling form submissions if there are invalid fields
    (function () {
        'use strict'

        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.querySelectorAll('.needs-validation')

        // Loop over them and prevent submission
        Array.prototype.slice.call(forms)
            .forEach(function (form) {
                form.addEventListener('submit', function (event) {
                    if (!form.checkValidity()) {
                        event.preventDefault()
                        event.stopPropagation()
                    }

                    form.classList.add('was-validated')
                }, false)
            })
    })()

    const { objeto, handleChange, acaoCadastrar, alerta, listaDonos }
        = useContext(PetContext);
    return (
        <div className="modal fade" id="modalEdicao" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Pet</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form id="formulario" onSubmit={acaoCadastrar}
                        className="needs-validation" noValidate>
                        <div className="modal-body">
                            <Alerta alerta={alerta} />
                            <div className="form-group">
                                <label htmlFor="txtCodido"
                                    className="form-label">
                                    Código
                                </label>
                                <input
                                    type="text"
                                    readOnly
                                    className="form-control"
                                    id="txtCodido"
                                    name="codigo"
                                    value={objeto.codigo}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="txtNome" className="form-label">
                                    Nome
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="txtNome"
                                    name="nome"
                                    value={objeto.nome}
                                    onChange={handleChange}
                                    required
                                />
                                <div className="valid-feedback">
                                    Campo OK!
                                </div>
                                <div className="invalid-feedback">
                                    Informe o campo número!
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="txtRaca" className="form-label">
                                    Raça
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="txtRaca"
                                    name="raca"
                                    value={objeto.raca}
                                    onChange={handleChange}
                                    required
                                />
                                <div className="valid-feedback">
                                    Campo OK!
                                </div>
                                <div className="invalid-feedback">
                                    Informe o campo raça!
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="txtPorte" className="form-label">
                                    Porte
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="txtPorte"
                                    name="porte"
                                    value={objeto.porte}
                                    onChange={handleChange}
                                    required
                                />
                                <div className="valid-feedback">
                                    Campo OK!
                                </div>
                                <div className="invalid-feedback">
                                    Informe o campo porte!
                                </div>
                            </div>
                            {/* <div className="form-group">
                                <label htmlFor="txtCapacidade" className="form-label">
                                    Capacidade
                                </label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="txtCapacidade"
                                    maxLength="4"
                                    name="capacidade"
                                    value={objeto.capacidade}
                                    onChange={handleChange}
                                    required
                                />
                                <div className="valid-feedback">
                                    Campo OK!
                                </div>
                                <div className="invalid-feedback">
                                    Informe o campo capacidade!
                                </div>
                            </div> */}
                            <div className="form-group">
                                <label htmlFor="selectDono" className="form-label">
                                    Dono
                                </label>
                                <select
                                    className="form-control"
                                    id="selectDono"
                                    name="dono"
                                    value={objeto.dono}
                                    onChange={handleChange}
                                    required>
                                    <option disabled="true" value="">
                                        (Selecione o dono)
                                    </option>
                                    {listaDonos.map((dono) => (
                                        <option key={dono.codigo}
                                            value={dono.codigo}>
                                            {dono.nome}
                                        </option>
                                    ))}
                                </select>
                                <div className="valid-feedback">
                                    Campo OK!
                                </div>
                                <div className="invalid-feedback">
                                    Informe o campo dono!
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                            <button type="submit"
                                className="btn btn-success">
                                Salvar
                                <i className="bi bi-save"></i>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Form;