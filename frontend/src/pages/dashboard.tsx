/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useMemo, useState } from "react"
import { getrole } from "../api/services/authService";
import Header from "../components/header/header";
import NavBar from "../components/nav/nav";
import add from '../assets/icons/plus.svg'
import search from '../assets/icons/search.svg'
import { getStatus, getReasons, getVeichles, getTickets, getFilteredTickets } from "../api/services/ticketService";
import list from '../assets/icons/list_view.svg'
import gridview from '../assets/icons/block_view.svg'
import compactview from '../assets/icons/compact_view.svg'
import kambanview from '../assets/icons/kanbam_view.svg'


export default function Dashboard() {

    const [roleToken, setRoleToken] = useState<string>('');
    const [showmodal, setShowmodal] = useState<boolean>(false);
    const [status, setStatus] = useState<any>([]);
    const [reasons, setReasons] = useState<any>([]);
    const [veichles, setVeichles] = useState<any>([]);
    const [tickets, setTickets] = useState<any>([]);

    const [statusFilter, setStatusFilter] = useState<any>([]);
    const [reasonFilter, setReasonFilter] = useState<any>([]);
    const [veichleFilter, setVeichleFilter] = useState<any>([]);
    const [periodFilter, setPeriodFilter] = useState<any>([]);
    const [orderFilter, setOrderFilter] = useState<any>([]);


    const timeOptions = ['Hoje', 'Ontem', 'Últimos 7 dias', 'Últimos 30 dias', 'Este mês', 'Mês passado', 'Este ano', 'Ano passado', 'Personalizado'];

    const orderOptions = ['Mais recentes', 'Mais antigos', 'Status'];



    useMemo(async () => {
        const response = await getrole();
        const status = await getStatus();
        const reasons = await getReasons();
        const veichles = await getVeichles();
        const FetchTickets = await getTickets();
        setTickets(FetchTickets);
        setVeichles(veichles);
        setReasons(reasons);
        setStatus(status);
        setRoleToken(response.role);
    }, []);


    useEffect(() => {
        const filters = {
            status: statusFilter,
            reason: reasonFilter,
            veichle: veichleFilter,
            period: periodFilter,
            order: orderFilter
        }
        const fetchFilteredTickets = async (options: { status: any; reason: any; veichle: any; period: any; order: any; }) => {
            const response = await getFilteredTickets(options);
            setTickets(response);
        }
        fetchFilteredTickets(filters);
        console.log(periodFilter)
    }, [statusFilter, reasonFilter, veichleFilter, periodFilter, orderFilter]);



    const handlestatus = (event: any) => {
        event.preventDefault();
        const filteoption = (event.target as HTMLFormElement).value;
        setStatusFilter((prevFilters: any) => {
            const updatedFilters = [...prevFilters, filteoption];
            if (updatedFilters.length > 1) {
                updatedFilters.shift();
            }
            return updatedFilters;
        });
    }
    const handlereason = (event: any) => {
        event.preventDefault();
        const filteoption = (event.target as HTMLFormElement).value;
        setReasonFilter((prevFilters: any) => {
            const updatedFilters = [...prevFilters, filteoption];
            if (updatedFilters.length > 1) {
                updatedFilters.shift();
            }
            return updatedFilters;
        });
    }
    const handleveichle = (event: any) => {
        event.preventDefault();
        const filteoption = (event.target as HTMLFormElement).value;
        setVeichleFilter((prevFilters: any) => {
            const updatedFilters = [...prevFilters, filteoption];
            if (updatedFilters.length > 1) {
                updatedFilters.shift();
            }
            return updatedFilters;
        });
    }
    const handlechange = (event: any) => {
        event.preventDefault();
        const filteoption = (event.target as HTMLFormElement).value;
        console.log(filteoption)
        setPeriodFilter((prevFilters: any) => {
            const updatedFilters = [...prevFilters, filteoption];
            if (updatedFilters.length > 1) {
                updatedFilters.shift();
            }
            return updatedFilters;
        });
    }
    const handleorder = (event: any) => {
        event.preventDefault();
        const filteoption = (event.target as HTMLFormElement).value;
        setOrderFilter((prevFilters: any) => {
            const updatedFilters = [...prevFilters, filteoption];
            if (updatedFilters.length > 1) {
                updatedFilters.shift();
            }
            return updatedFilters;
        });
    }

    const resetfilters = () => {
        setStatusFilter([]);
        setReasonFilter([]);
        setVeichleFilter([]);
        setPeriodFilter([]);
        setOrderFilter([]);
    }

    const mockupTickets = [
        {
            id: 1,
            title: 'Ticket 1',
            status: 'Aberto',
            reason: 'Manutenção',
            veichle: 'Caminhão',
            created_at: '2021-09-06',
            updated_at: '2021-09-06',
            user: 'João da Silva',
            description: 'Descrição do ticket'
        },
        {
            id: 2,
            title: 'Ticket 2',
            status: 'Fechado',
            reason: 'Manutenção',
            veichle: 'Caminhão',
            created_at: '2021-09-06',
            updated_at: '2021-09-06',
            user: 'João da Silva',
            description: 'Descrição do ticket'
        },
        {
            id: 3,
            title: 'Ticket 3',
            status: 'Aberto',
            reason: 'Manutenção',
            veichle: 'Caminhão',
            created_at: '2021-09-06',
            updated_at: '2021-09-06',
            user: 'João da Silva',
            description: 'Descrição do ticket'
        },
        {
            id: 4,
            title: 'Ticket 4',
            status: 'Fechado',
            reason: 'Manutenção',
            veichle: 'Caminhão',
            created_at: '2021-09-06',
            updated_at: '2021-09-06',
        }
    ]


    return (
        <main className="relative">
            <Header />
            <div className="max-w-[95%] m-auto">
                <NavBar />
                <nav className="flex flex-row justify-evenly">
                    <div className="max-h-10 h-full flex mr-6">
                        <button onClick={() => setShowmodal(true)} className="bg-secondary hover:bg-primary text-white flex justify-center  flex-row rounded-md h-10 w-32">
                            <span className="my-auto mx-0">Abrir Ticket</span>
                            <img src={add} alt="" className="my-auto ml-3" />
                        </button>
                    </div>
                    <div className="relative">
                        <input type="text" placeholder="Pesquisar" id="search" name="search" className="text-input h-full w-52 border border-input rounded-md px-4 pb-1"></input>
                        <img src={search} alt="pesquisar" className="absolute right-2 top-3 z-50 bg-white w-6 h-5 pl-1" />
                    </div>
                    <div className=" w-fit flex flex-row" style={{ color: periodFilter.length > 0 ? 'blue' : 'black' }}>
                        <label className="ml-2 h-fit my-auto">Periodo:</label>
                        <select
                            className="border border-input rounded-md h-full text-center w-32  p-1 border-none "
                            name="period"
                            id="period"

                            onChange={handlechange}
                        >
                            {timeOptions && timeOptions.map((option) => {

                                return (
                                    <option
                                        key={option}
                                        value={option}
                                        className=" text-black"
                                    >
                                        {option}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                    <div className=" w-fit flex flex-row" style={{ color: orderFilter.length > 0 ? 'blue' : 'black' }}>
                        <label className="ml-2 h-fit my-auto">Ordenar por:</label>
                        <select
                            className="border border-input rounded-md h-full text-center  w-fit p-1 border-none "
                            name="period"
                            id="period"

                            onChange={handleorder}
                        >
                            {orderOptions && orderOptions.map((option) => {

                                return (
                                    <option
                                        key={option}
                                        value={option}
                                        className="text-black"
                                    >
                                        {option}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                    <div className=" w-fit flex flex-row" style={{ color: statusFilter.length > 0 ? 'blue' : 'black' }}>
                        <label className="ml-2 h-fit my-auto">Status:</label>
                        <select
                            className="border border-input rounded-md h-full text-center  w-fit p-1 border-none "
                            name="period"
                            id="period"

                            onChange={handlestatus}
                        >
                            {status.length > 0 && status.map((status: any) => {

                                return (
                                    <option
                                        key={status.id}
                                        value={status.id}
                                        className="text-black"
                                    >
                                        {status.name}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                    <div className=" w-fit flex flex-row" style={{ color: reasonFilter.length > 0 ? 'blue' : 'black' }}>
                        <label className="ml-2 h-fit my-auto">Motivo:</label>
                        <select
                            className="border border-input rounded-md h-full text-center  w-fit p-1 border-none "
                            name="period"
                            id="period"

                            onChange={handlereason}
                        >
                            {reasons.length > 0 && reasons.map((reason: any) => {

                                return (
                                    <option
                                        key={reason.id}
                                        value={reason.id}
                                        className="text-black"
                                    >
                                        {reason.name}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                    <div className=" w-fit flex flex-row " style={{ color: veichleFilter.length > 0 ? 'blue' : 'black' }}>
                        <label className="ml-2 h-fit my-auto" >Veiculo:</label>
                        <select
                            className="border border-input rounded-md h-full text-center  w-fit p-1 border-none "
                            name="period"
                            id="period"
                            onChange={handleveichle}
                        >
                            {veichles.length > 0 && veichles.map((veichle: any) => {

                                return (
                                    <option
                                        key={veichle.id}
                                        value={veichle.id}
                                        className="text-black"
                                    >
                                        {veichle.name}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                    <div className=' w-[1px] bg-[#D9D9D9] p-[0.5px] mx-4 mr-2'></div>
                    <button className=" hover:bg-gray-300 text-black flex justify-center  flex-row rounded-md h-10 w-32" onClick={resetfilters}>
                        <span className="my-auto mx-0">Remover Filtros</span>
                    </button>
                    <div className="flex justify-end w-fit mr-0 ">
                        <img src={list} alt="list" className="w-5 h-5 mx-2 my-auto" />
                        <img src={gridview} alt="grid" className="w-5 h-5 mx-2 my-auto" />
                        <img src={compactview} alt="compact" className="w-5 h-5 mx-2 my-auto" />
                        <img src={kambanview} alt="kamban" className="w-5 h-5 mx-2 my-auto" />
                    </div>
                </nav>
                <div>
                    Listagem
                </div>
            </div>
        </main>
    )

};
