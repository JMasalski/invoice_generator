import React from "react";

const OnBoarding = ({ progress, authUser, invoices, clients }) => {
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
        <div className="p-4 bg-white shadow-md rounded-md">
            <h2 className="text-lg font-semibold mb-3">Witaj w procesie onboardingu!</h2>

            {/* Pasek postępu */}
            <div className="relative w-full bg-gray-200 rounded-full h-4 mb-4">
                <div
                    className="bg-blue-500 h-4 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                ></div>
            </div>

            <p className="text-sm text-gray-600">
                {progress === 100 ? "Wszystko gotowe!" : `Postęp: ${progress.toFixed(0)}%`}
            </p>

            {/* Wyświetlanie statusów zadań */}
            <div className="mt-4">
                {tasks.map((task, index) => (
                    <div key={index} className="flex items-center mb-2">
                        <span className={`mr-2 ${task.completed ? "text-green-500" : "text-red-500"}`}>
                            {task.completed ? "✔" : "✘"}
                        </span>
                        <span>{task.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OnBoarding;
