import homeicon from '../../assets/icons/home.svg'
import arrowrightblack from '../../assets/icons/arrow_right_white.svg'


export default function NavBar() {
    return(
        <>
        <div className="min-w-56 w-fit h-fit  flex flex-row justify-between  mt-11">
            <img src={homeicon} alt="home" className="w-5 h-5"/>
            <img src={arrowrightblack} alt="arrow" className="w-5 h-5 mx-4"/>
            <span className='text-sm text-input font-semi-bold mr-4'>Atendimento ao cliente</span>
            <img src={arrowrightblack} alt="arrow" className="w-5 h-5"/>
        </div>
            <hr className="w-full mt-3 mb-6 h-0.5 bg-[#DDDDDD]"/>
        </>
    )
};
