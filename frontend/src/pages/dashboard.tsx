/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo,useState } from "react"
import { getrole } from "../api/services/authService";
import Header from "../components/header/header";
import NavBar from "../components/nav/nav";
import add from '../assets/icons/plus.svg'
import search from '../assets/icons/search.svg'


export default function Dashboard() {

    const [roleToken, setRoleToken] = useState<string>('');
    const [showmodal, setShowmodal] = useState<boolean>(false);
    const [currentfilters, setCurrentfilters] = useState<any>([]);
    

    useMemo(async () => {
        const response = await getrole();
        setRoleToken(response.role);
    }, []);
    
    return(
        <main>
            <Header />
            <div className="max-w-[95%] m-auto">
                <NavBar/>
                <nav className="flex flex-row">
                <div className="max-h-10 h-full flex mr-6">
                    <button onClick={() => setShowmodal(true)} className="bg-secondary hover:bg-primary text-white flex justify-center  flex-row rounded-md h-10 w-32">
                        <span className="my-auto mx-0">Abrir Ticket</span>
                        <img src={add} alt="" className="my-auto ml-3" />
                        </button>
                </div>
                <div className="relative">
                    <input type="text" placeholder="Pesquisar" id="search" name="search"  className="text-input h-full w-72 border border-input rounded-md px-4 pb-1"></input>
                    <img src={search} alt="pesquisar" className="absolute right-2 top-3 z-50 bg-white w-6 h-5 pl-1" />
                </div>
                
                </nav>
            </div>
        </main>
    )

};
