import { useContext } from 'react';
import Alerta from '../../Alerta';
import DonoContext from './DonoContext';

// -- nome, endereco, telefone

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

    const { objeto, handleChange, acaoCadastrar, alerta }
        = useContext(DonoContext);
    return (
        <div className="modal fade" id="modalEdicao" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Dono</h5>
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
                                    Informe o campo nome!
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="txtEndereco" className="form-label">
                                    Endereço
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="txtEndereco"
                                    name="endereco"
                                    value={objeto.endereco}
                                    onChange={handleChange}
                                    required
                                />
                                <div className="valid-feedback">
                                    Campo OK!
                                </div>
                                <div className="invalid-feedback">
                                    Informe o campo descrição!
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="txtTelefone" className="form-label">
                                    Telefone
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="txtTelefone"
                                    maxLength="11"
                                    name="telefone"
                                    value={objeto.telefone}
                                    onChange={handleChange}
                                    required
                                />
                                <div className="valid-feedback">
                                    Campo OK!
                                </div>
                                <div className="invalid-feedback">
                                    Informe o campo telefone!
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