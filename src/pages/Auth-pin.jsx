import {useState} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";

const AuthPin = () => {
    const [pin, setPin] = useState("");
    const [message, setMessage] = useState("");
    const [showForm, setShowForm] = useState(true);
    const {operation} = useParams(); // Récupération du paramètre de la route

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            let response;

            switch (operation) {
                case "validate-transaction":
                    response = await axios.post("URL_ENDPOINT_TRANSACTION", {codePin: parseInt(pin)});
                    break;

                case "consulter-solde":
                    response = await axios.post("https://simu-api-service-2.onrender.com/users/verifier-solde", {
                        codePin: parseInt(pin),
                    });
                    break;

                case "releve-compte":

                    response = await axios.post("https://simu-api-service-2.onrender.com/users/mini-releve", {
                        codePin: parseInt(pin),
                    });
                    break;

                default:
                    console.error("Type d'opération non géré.");
                    return;
            }

            if (response.data && response.data.message) {
                setMessage(response.data.message);
                setShowForm(false);
            } else {
                setMessage("Une erreur s'est produite.");
                setShowForm(false);
            }
        } catch (error) {
            console.error(error);
            setMessage("Une erreur s'est produite lors de la requête.");
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center">
            <div id="form-b79c02ea-e420-41f5-93cd-b31ac4d08a4f"></div>
            <script async src="https://forms.infobip.com/forms/b79c02ea-e420-41f5-93cd-b31ac4d08a4f.js"></script>

            <div className="w-full md:max-w-md px-4 py-8 bg-white rounded-lg shadow-lg">
                {message && <div className="alert alert-success">{message}</div>}
                {showForm && (
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="pin" className="mb-2">
                            Entrer votre code PIN
                        </label>
                        <input
                            type="text"
                            id="pin"
                            className="rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 w-full sm:text-sm h-10"
                            placeholder="Entrez votre code PIN"
                            onChange={(e) => setPin(e.target.value)}
                            value={pin}
                        />
                        <button type="submit" className="bg-violet-500 text-white rounded-lg px-4 py-2 mt-4 w-full">
                            Valider
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default AuthPin;
