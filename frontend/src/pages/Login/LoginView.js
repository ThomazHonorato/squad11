import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Input from '../../components/Input/Input';
import { Container, FormContainer } from './StyledLoginView';
import Logo from '../../assets/icons/Logo.svg';
import api from '../../services/api';

import { ButtonStyle1 } from '../../components/partials/buttonStyle1/buttonStyle1';

export default function Login() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const history = useHistory();

    const handleEmail = (a) => {
        setEmail(a.target.value);
    };

    const handleSenha = (a) => {
        setSenha(a.target.value);
    };

    const logar = async () => {
        const data = {
            email,
            senha,
        };

        await api.post('/login', data).then((response) => {
            const { nome, token } = response.data;
            localStorage.setItem('nome', nome);
            localStorage.setItem('token', token);
            history.push('/home');
        });
    };
    return (
        <Container>
            <img src={Logo} alt="Logo" />
            <Input
                label="Email"
                placeHolder="Digite seu email"
                input={0}
                func={handleEmail}
                className="inputs"
            />
            <div className="space" />
            <Input
                label="Senha"
                placeHolder="Digite sua senha"
                type="password"
                input={1}
                func={handleSenha}
                className="inputs"
            />

            <br />
            <Link className="passForgot" to="/">
                Esqueci a Senha
            </Link>
            <div className="btn">
                <ButtonStyle1
                    className="botao"
                    primary
                    active
                    texto="Entrar"
                    func={logar}
                />
            </div>
        </Container>
    );
}
