import LoginForm from "../components/forms/loginForm"
import loginimage from '../assets/static/loginBackground.svg'
import { useEffect } from "react";

export default function Login() {
    useEffect(() => {
        document.title = "Acesse a sua conta";
    }, []);


    return (
        <>
            <div className="flex lg:flex-row flex-col-reverse w-screen h-screen max-w-1080 justify-center mx-auto">
                <div className="lg:w-1/2 w-full lg:h-full h-full flex flex-col justify-center bg-primary-light">
                    <LoginForm />
                </div>
                <div className="lg:w-1/2 w-full lg:h-full h-fit flex  justify-center bg-secondary ">
                    <img src={loginimage} alt="login" className="h-full w-[30rem] lg:flex hidden" />
                    <span className="md:flex sm:flex lg:hidden text-white font-semi-bold text-lg ml-2 justify-start my-2 py-2 w-full ">Login</span>
                </div>
            </div>
        </>
    )
};
