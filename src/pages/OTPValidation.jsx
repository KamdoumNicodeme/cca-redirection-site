import { useState } from "react";
import axios from "axios";

const OTPValidation = () => {
    const [otp, setOtp] = useState("");
    const [message, setMessage] = useState("");
    const [showForm, setShowForm] = useState(true);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Vous pouvez envoyer l'OTP à votre API pour vérification
        axios
            .post("https://simu-api-service-2.onrender.com/users/verifier-otp", {
                otp: parseInt(otp),
            })
            .then((response) => {
                if (response.data && response.data.message) {
                    setMessage(response.data.message);
                    setShowForm(false);
                } else {
                    setMessage(response.data.message);
                    setShowForm(false);
                }
            })
            .catch((error) => {
                // Gérer l'erreur
                console.error(error);
            });
    };

    return (
        <div className="min-h-screen flex justify-center items-center">
            <div className="w-full md:max-w-md px-4 py-8 bg-white rounded-lg shadow-lg">
                {message && <div className="alert alert-success">{message}</div>}
                {showForm && (
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="otp" className="mb-2">
                            Entrez votre OTP
                        </label>
                        <input
                            type="text"
                            id="otp"
                            className="rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 w-full sm:text-sm h-10"
                            placeholder="Entrez votre OTP"
                            onChange={(e) => setOtp(e.target.value)}
                            value={otp}
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

export default OTPValidation;
