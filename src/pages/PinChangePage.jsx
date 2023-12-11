import {useState} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";

const PinChangePage = () => {
    const [currentPin, setCurrentPin] = useState("");
    const [newPin, setNewPin] = useState("");
    const [confirmedNewPin, setConfirmedNewPin] = useState("");
    const [error, setError] = useState("");

    const {phone_number} = useParams();
    const decodedPhone = atob(phone_number);

    const handleCurrentPinChange = (e) => {
        setCurrentPin(e.target.value);
    };

    const handleNewPinChange = (e) => {
        setNewPin(e.target.value);
    };

    const handleConfirmedNewPinChange = (e) => {
        setConfirmedNewPin(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Ici, tu devrais ajouter une logique pour vérifier le code PIN actuel avant la modification
        // For the sake of simplicity, I'm assuming a fixed current PIN for the example.
        // const currentCorrectPin = "1234";


        // Le code PIN actuel est correct, vérifier et mettre à jour le nouveau code PIN
        if (newPin === confirmedNewPin) {
            axios.put(`https://c07c-129-0-182-242.ngrok-free.app/api/chatbot/customer/updatePinCode?phoneNumber=${decodedPhone}`, {
                newCode: parseInt(newPin),
                oldCode: parseInt(currentPin)
            }).then(r => console.log("PIN updated successfully:", newPin));

            setError("");
            // Réinitialiser les champs après la modification si nécessaire
            setCurrentPin("");
            setNewPin("");
            setConfirmedNewPin("");
        } else {
            setError("Les nouveaux codes PIN ne correspondent pas. Veuillez réessayer.");
        }

    };

    return (
        <div className="min-h-screen flex justify-center items-center">
            <div className="w-full md:max-w-md px-4 py-8 bg-white rounded-lg shadow-lg">
                <form onSubmit={handleSubmit} className="flex flex-col">
                    <label htmlFor="currentPin" className="mb-2">
                        Entrez votre code PIN actuel :
                    </label>
                    <input
                        type="password"
                        className="rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 w-full sm:text-sm h-10"
                        placeholder="Code PIN actuel"
                        value={currentPin}
                        onChange={handleCurrentPinChange}
                        minLength="4"
                        maxLength="4"
                        required
                    />

                    <label htmlFor="newPin" className="mt-4 mb-2">
                        Entrez votre nouveau code PIN :
                    </label>
                    <input
                        type="password"
                        className="rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 w-full sm:text-sm h-10"
                        placeholder="Nouveau code PIN"
                        value={newPin}
                        onChange={handleNewPinChange}
                        minLength="4"
                        maxLength="4"
                        required
                    />

                    <label htmlFor="confirmedNewPin" className="mt-4 mb-2">
                        Confirmez votre nouveau code PIN :
                    </label>
                    <input
                        type="password"
                        className="rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 w-full sm:text-sm h-10"
                        placeholder="Confirmez le nouveau code PIN"
                        value={confirmedNewPin}
                        onChange={handleConfirmedNewPinChange}
                        minLength="4"
                        maxLength="4"
                        required
                    />

                    {error && <p className="text-red-500">{error}</p>}

                    <button
                        type="submit"
                        className="bg-violet-500 text-white rounded-lg px-4 py-2 mt-4 w-full"
                    >
                        Modifier le code PIN
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PinChangePage;
