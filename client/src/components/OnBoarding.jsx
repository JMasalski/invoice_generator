import React from "react";
import {Check, X} from "lucide-react";

const OnBoarding = ({progress, authUser, invoices, clients}) => {
    // Statusy dla trzech kroków
    const tasks = [
        {
            name: "Uzupełnienie danych użytkownika",
            completed: Boolean(
                authUser.address &&
                authUser.taxId &&
                authUser.companyName &&
                authUser.phone &&
                authUser.bankAccount
            ),
        },
        {
            name: "Dodanie klienta",
            completed: clients.length > 0,
        },
        {
            name: "Stworzenie pierwszej faktury",
            completed: invoices.length > 0,
        },
    ];

    return (
        <div className="p-3 md:w-1/2 mx-auto">
            <div className="p-4 bg-white shadow-md rounded-md">
                <div className="flex flex-col gap-3 my-3">
                    <h2 className="text-xl font-bold mb-3">Witaj {authUser.name.split(" ")[0]}</h2>
                    <p className="text-lg font-semibold">Bardzo nam miło że wybrałeś <span
                        className="bg-gradient-to-r from-blue-600 to-sky-500 bg-clip-text text-transparent">Billify</span></p>
                    <p>
                        Aby w pełni wykorzystać możliwości aplikacji, uzupełnij swoje dane oraz dodaj pierwszego
                        klienta.
                    </p>
                </div>

                {/* Wyświetlanie statusów zadań */}
                <div className="mt-4">
                    {tasks.map((task, index) => (
                        <div key={index} className="flex items-center mb-2">
                        <span className={`mr-2 ${task.completed ? "text-green-500" : "text-red-500"}`}>
                            {task.completed ? <Check /> : <X />}
                        </span>
                            <span>{task.name}</span>
                        </div>
                    ))}
                </div>
                {/* Pasek postępu */}
                <div className="relative w-full bg-gray-200 rounded-full h-4 my-4">
                    <div
                        className="bg-linear-to-r from-sky-300 to-sky-700 h-4 rounded-full transition-all duration-300"
                        style={{width: `${progress}%`}}
                    ></div>
                </div>

                <p className="text-sm text-gray-600 text-center">
                    {progress === 100 ? "Wszystko gotowe!" : `Postęp: ${progress.toFixed(0)}%`}
                </p>

            </div>
        </div>
    );
};

export default OnBoarding;
