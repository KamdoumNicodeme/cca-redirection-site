import {useEffect, useState} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";
import {BASE_URL} from "../utils/util";


const TransactionInfo = () => {
    const [numero, setNumero] = useState("");
    const [selectedAgence, setSelectedAgence] = useState("");
    const [agences, setAgences] = useState([]);
    const [showForm, setShowForm] = useState(true);
    const [message, setMessage] = useState("");
    const {phone_number, account_number, operation} = useParams();

    const decodePhonenumber = atob(phone_number);
    const decodeAccountnumber = atob(account_number);
    const decodeOperation = atob(operation);

    const instance = axios.create({
        baseURL: BASE_URL,

        httpsAgent: {
            rejectUnauthorized: false // Désactive la vérification du certificat
        }
    });

    useEffect(() => {
        // Charger la liste des agences depuis l'API
        instance.get(`/entities/agencies/getAllAgencies`)
            .then((response) => {
                if (response.data && Array.isArray(response.data)) {
                    console.log(response.data)
                    setAgences(response.data);
                } else {
                    // Gérer l'erreur
                    console.log(response.data)
                }
            })

    },[instance] );

    const handleSubmit = (e) => {
        e.preventDefault();

        // Vérifier si les champs sont renseignés
        if (!selectedAgence || !numero) {
            // Gérer le cas où l'agence ou le numéro de compte n'est pas renseigné
            alert("Veuillez sélectionner une agence et entrer un numéro de compte.");
            return;
        }

        // Vérifier si le numéro de compte a 11 chiffres
        if (numero.length !== 11) {
            alert("Le numéro de compte doit être composé de 11 chiffres.");
            return;
        }

        instance.put(`/operation/acad?phoneNumber=${decodePhonenumber}&accountNumber=${decodeAccountnumber}&type=${decodeOperation}`, {
                accountNumber: numero,
                branchCode: selectedAgence
            }
        )
            .then((response) => {
                if (response.data) {
                    setMessage(response.data.message);
                    console.log(numero);
                    console.log(agences);
                    setShowForm(false); // Set showForm to false after successful submission
                } else {
                    // Gérer l'erreur

                    setShowForm(false);
                    setMessage(response.data.message);
                    console.log(response.data.message);

                }
            })
            .catch((error) => {
                setShowForm(false);
                setMessage(error);
            });
    };

    return (
        <div className="min-h-screen flex justify-center items-center">

            <div id="form-b79c02ea-e420-41f5-93cd-b31ac4d08a4f"></div>
            <script async src="https://forms.infobip.com/forms/b79c02ea-e420-41f5-93cd-b31ac4d08a4f.js"></script>
            <div className="w-full md:max-w-md px-4 py-8 bg-white rounded-lg shadow-lg">
                {message && <div className="alert alert-success">{message}</div>}

                {showForm && (
                    <form onSubmit={handleSubmit} className="flex flex-col">
                        {/* Liste déroulante pour l'agence */}
                        <label htmlFor="agence" className="mb-2">
                            Sélectionnez l'agence :
                        </label>
                        <select
                            value={selectedAgence}
                            onChange={(e) => setSelectedAgence(e.target.value)}
                            className="rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 w-full sm:text-sm h-10"
                            required
                        >
                            <option value="" disabled>
                                Choisissez une agence
                            </option>
                            {agences.map((agence) => (
                                <option key={agence.code} value={agence.code}>
                                    {agence.name}
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
                            required // Champ obligatoire
                        />

                        <button
                            type="submit"
                            className="bg-violet-500 text-white rounded-lg px-4 py-2 mt-4 w-full"
                        >
                            Soumettre
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default TransactionInfo;
