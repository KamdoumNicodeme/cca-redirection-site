import { useState } from "react";

const PinSetupPage = () => {
    const [pin, setPin] = useState("");
    const [confirmedPin, setConfirmedPin] = useState("");
    const [error, setError] = useState("");
    //const [showForm, setShowForm] = useState(true); // Added showForm state

    const handlePinChange = (e) => {
        setPin(e.target.value);
    };

    const handleConfirmedPinChange = (e) => {
        setConfirmedPin(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (pin === confirmedPin) {
            // Les codes PIN correspondent, tu peux effectuer l'action souhaitée ici
            console.log("PIN set successfully:", pin);
            setError("");
        } else {
            // Les codes PIN ne correspondent pas, afficher une erreur
            setError("Les codes PIN ne correspondent pas. Veuillez réessayer.");
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center">
            <div className="w-full md:max-w-md px-4 py-8 bg-white rounded-lg shadow-lg">
                <form onSubmit={handleSubmit} className="flex flex-col">
                    <label htmlFor="pin" className="mb-2">
                        Créez votre code PIN :
                    </label>
                    <input
                        type="password"
                        className="rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 w-full sm:text-sm h-10"
                        placeholder="Entrez votre code PIN"
                        value={pin}
                        onChange={handlePinChange}
                        minLength="4"
                        maxLength="4"
                        required
                    />

                    <label htmlFor="confirmedPin" className="mt-4 mb-2">
                        Confirmez votre code PIN :
                    </label>
                    <input
                        type="password"
                        className="rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 w-full sm:text-sm h-10"
                        placeholder="Confirmez votre code PIN"
                        value={confirmedPin}
                        onChange={handleConfirmedPinChange}
                        minLength="4"
                        maxLength="4"
                        required
                    />

                    {error && <p className="text-red-500">{error}</p>}

                    <button
                        type="submit"
                        className="bg-violet-500 text-white rounded-lg px-4 py-2 mt-4 w-full"
                    >
                        Confirmer le code PIN
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PinSetupPage;

