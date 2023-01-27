import axios from "axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom'
import "../FormulariodeCadastro/FormulariodeCadastro.css";

export function FormEdit() {
  const {
    register,
    handleSubmit,
    formState: { erros }, reset
  } = useForm();

  let history = useNavigate()
  const { id } = useParams()

  useEffect(() => {
    axios.get(`https://exportapi.onrender.com/cadastro/${id}`).then((response) => { reset(response.data) })
  })

  const editFicha = data => axios.put(`https://exportapi.onrender.com/cadastro/${id}`, data).then(() => {
    console.log("Deu tudo certo")
    history.push("/")
  }).catch(() => {
    console.log("DEU ERRADO")
  })

  const reset2 = () => {
    let inputs = document.querySelectorAll(".input-form")
    for (let i in inputs) {
      inputs[i].value = ""
    }
  }

  return (
    <div className="container-formulario">
      <Link to="/login/adm">
        <button className="voltar-bt">Voltar</button>
      </Link>
      <h1 className="texto-ficha">EDIT</h1>
      <form action="#" className="form-cad" onSubmit={handleSubmit(editFicha)}>
        <div className="part-form">
          <label>
            Numero de matricula: <br />
            <input type="text" name="matricula" className="input-form" {...register("matricula")} />
          </label>
          <label>
            Idade: <br />
            <input type="number" name="idade" className="input-form" {...register("idade")} />
          </label>
          <label>
            Nome: <br />
            <input type="text" name="nome" className="input-form" {...register("nome")} />
          </label>
        </div>
        <div className="part-form">
          <label>
            Endereço: <br />
            <input type="text" name="endereco" className="input-form" {...register("endereco")} />
          </label>
          <label>
            Email: <br />
            <input type="email" name="email" className="input-form" {...register("email")} />
          </label>
          <label>
            Telefone: <br />
            <input type="text" name="telefone" className="input-form" {...register("telefone")} />
          </label>
        </div>
        <div className="part-form">
          <label>
            Pagamento: <br />
            <input type="text" name="pagamento" className="input-form" {...register("status")} />
          </label>
          <label>
            Turno: <br />
            <input type="text" name="turno" className="input-form" {...register("turno")} />
          </label>
          <label>
            Plano: <br />
            <input type="text" name="plano" className="input-form" {...register("plano")} />
          </label>
        </div>
        <button className="bt-editar-ficha aa" onClick={reset2}>ENVIAR</button>
      </form>
    </div>
  );
}
