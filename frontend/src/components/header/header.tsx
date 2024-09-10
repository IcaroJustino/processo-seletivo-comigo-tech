import logo from '../../assets/static/logo.svg'
import refresh from '../../assets/icons/reset.svg'
import company from '../../assets/icons/company.svg'
import moon from '../../assets/icons/darkmode.svg'
import usericon from '../../assets/icons/user.svg'
import { useState } from 'react'

export default function Header() {

    const [showmenu, setShowmenu] = useState<boolean>(false);


    const logout = () => {
        sessionStorage.removeItem('access_token');
        window.location.href = '/login';
    }

    const navicons = [
        {
            icon: company,
            alt: 'company',
            title: 'Empresa'
        },
        {
            icon: moon,
            alt: 'moon',
            title: 'Modo Escuro'
        }
    ]


    return (
        <header className='flex flex-row justify-between w-screen min-h-17 bg-secondary'>
            <img src={logo} alt='logo' className=' h-[31px] my-auto ml-5' />
            <span className='text-white font-semi-bold text-sm my-auto text-center w-fit'>Atendimento Online</span>
            <nav className=' flex flex-row h-fit my-auto mr-8'>
                <div className='flex'>
                    <img src={refresh} alt={"Atualizar"} className='w-5 h-5' />
                    <div className=' w-[1px] bg-[#D9D9D9] p-[0.5px] mx-4 mr-2'></div>,
                </div>
                <ul className='flex flex-row  '>
                    {
                        navicons.map((icon, index) => {
                            return (
                                <li key={index}>
                                    <img src={icon.icon} alt={icon.alt} className='w-5 h-5 mx-2 ' />
                                </li>
                            )
                        })
                    }
                    <div className='ml-2'>
                        <img src={usericon} alt="user" className="w-5 h-5 cursor-pointer" onClick={() => setShowmenu(!showmenu)} />
                        {showmenu && (
                            <ul className="absolute right-0 mt-2 bg-white border border-gray-600 rounded shadow m-2">
                                <li className="px-4 py-2 hover:bg-gray-300 cursor-pointer">Configurações</li>
                                <li className="px-4 py-2 hover:bg-gray-300 cursor-pointer">Editar Perfil</li>
                                <li className="px-4 py-2 hover:bg-gray-300 cursor-pointer" onClick={logout}>Sair</li>
                            </ul>
                        )}
                    </div>
                </ul>
            </nav>
        </header>
    )
};
