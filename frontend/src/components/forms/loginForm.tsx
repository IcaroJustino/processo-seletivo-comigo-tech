
import { useState } from "react";
import { loginService } from "../../api/services/authService";
import Loader from "../loader/loader";

export default function LoginForm() {

    const [error, setError] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [errormsg, setErrormsg] = useState<string>('');

    const handlesubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const email = (event.target as HTMLFormElement).email.value;
        const password = (event.target as HTMLFormElement).password.value;


        if (!email || !password) {
            setError(true);
            setErrormsg('Preencha todos os campos');
            return;
        }
        const response = await loginService(email, password);
        setLoading(true);
        if (response.status === 400) {
            setError(true);
            setErrormsg('Email ou senha inválidos');
            setTimeout(() => {
                setLoading(false);
            }, 3000);
        }
        setTimeout(() => {
            setLoading(false);
            setError(false);
            window.location.href = '/';
        }, 3000);
        console.log(email, password);
    }



    return (
        <form onSubmit={handlesubmit} className="lg:min-w-[28rem] lg:min-h-[24rem] lg:h-fit h-full w-fit flex flex-col p-3 m-auto ">
            <h1 className="text-3xl font-semi-bold text-primary">Entre na sua conta</h1>
            <span className="mt-4 mb-10 text-subtext font-normal text-medium">Boas-vindas! Por favor, insira suas credenciais para acessar os sistemas da Comigo.</span>
            {
                error && error ? <div className="bg-red-200 p-2 text-red-500 text-sm mb-4">{errormsg}</div> : ''
            }
            <input type="text" placeholder="Email" name="email" id="email" className="p-2 border-input border-2 text-input mb-6 rounded-md" required />
            <input type="password" placeholder="Senha" name="password" id="password" className="p-2 border-input border-2 text-input rounded-md" required />
            <div className="flex flex-row justify-between mt-6 mb-8">
                <div>
                    <input type="checkbox" name="remember-me" id="remember-me" className="mr-2 rounded-sm" />
                    <label htmlFor="remember-me" className="font-normal text-sm text-checkbox">Mantenha-me conectado.</label>
                </div>
                <a href="#" className="text-hyperlink">Esqueci minha senha</a>
            </div>
            {
                loading && loading ? <div className="flex justify-center items-center h-12 w-full rounded-md bg-primary "><Loader /></div> :
                    <button type="submit" className="  text-white tex-center text-medium font-semi-bold bg-primary h-12 w-full rounded-md ">Entrar</button>
            }

        </form>
    )
};
