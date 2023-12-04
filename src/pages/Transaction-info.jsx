import { useState, useEffect } from "react";
import axios from "axios";

const TransactionInfo = () => {
    const [numero, setNumero] = useState("");
    const [selectedAgence, setSelectedAgence] = useState("");
    const [agences, setAgences] = useState([]);

    useEffect(() => {
        // Charger la liste des agences depuis l'API
        axios.get("https://simu-api-service-2.onrender.com/agence/all")
            .then((response) => {
                if (response.data && Array.isArray(response.data.agences)) {

                    setAgences(response.data.agences);
                } else {
                    // Gérer l'erreur
                }
            })
            .catch((error) => {
                // Gérer l'erreur
            });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const numeroCompte = numero;

        axios.get(`https://simu-api-service-2.onrender.com/users/${numeroCompte}`)
            .then((response) => {
                if (response.data) {
                    const user = response.data;
                    console.log(user);
                } else {
                    // Gérer l'erreur
                }
            })
            .catch((error) => {
                // Gérer l'erreur
            });
    };

    return (
        <div className="min-h-screen flex justify-center items-center">
            <div className="w-full md:max-w-md px-4 py-8 bg-white rounded-lg shadow-lg">
                <form onSubmit={handleSubmit} className="flex flex-col">
                    {/* Liste déroulante pour l'agence */}
                    <label htmlFor="agence" className="mb-2">
                        Sélectionnez l'agence :
                    </label>
                    <select
                        value={selectedAgence}
                        onChange={(e) => setSelectedAgence(e.target.value)}
                        className="rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 w-full sm:text-sm h-10"
                    >
                        <option value="" disabled>
                            Choisissez une agence
                        </option>
                        {agences.map((agence) => (
                            <option key={agence.code_agence} value={agence.code_agence}>
                                {agence.nom_agence}
                            </option>
                        ))}
                    </select>

                    {/* Input pour le numéro de compte */}
                    <label htmlFor="compte" className="mt-4 mb-2">
                        Quel est le numéro de compte du bénéficiaire ?
                    </label>
                    <input
                        type="text"
                        className="rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 w-full sm:text-sm h-10"
                        placeholder="Numéro de compte du bénéficiaire"
                        value={numero}
                        onChange={(e) => setNumero(e.target.value)}
                    />

                    <button
                        type="submit"
                        className="bg-violet-500 text-white rounded-lg px-4 py-2 mt-4 w-full"
                    >
                        Soumettre
                    </button>
                </form>
            </div>
        </div>
    );
};

export default TransactionInfo;
