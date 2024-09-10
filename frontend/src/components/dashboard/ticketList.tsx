// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useState,useMemo } from "react";
export default function TicketsList(tickets : any) {


    const currentTickets = useMemo(() => {
        if (!tickets) {
            return "Nenhuma ticket encontrado";
        }
        return tickets;
    }, [tickets]);


    console.log(currentTickets.tickets)

    return (
        <div className="w-full mt-6">
            <table className="w-full">
                <thead>
                    <tr className="font-semi-bold text-[#292929] text-sm">
                        <th>Id</th>
                        <th>Tipo</th>
                        <th>Motivo</th>
                        <th>Descrição</th>
                        <th>Tipo</th>
                        <th>Veiculo</th>
                        <th>Data da abertura</th>
                        <th>Prazo</th>
                        <th>Status</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {currentTickets.tickets.map((ticket: any) => (
                        <tr key={ticket.id} className="text-sm">
                            <td>
                                <button className="text-[#292929] bg-[#F2F2F2] px-4 py-1 rounded-md">Editar</button>
                                <button className="text-[#292929] bg-[#F2F2F2] px-4 py-1 rounded-md">Excluir</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
