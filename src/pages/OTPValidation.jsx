import { useState } from "react";
import axios from "axios";
import {useParams} from "react-router-dom";
import {BASE_URL} from "../utils/util";

const OTPValidation = () => {
    const [otp, setOtp] = useState("");
    const [message, setMessage] = useState("");
    const [showForm, setShowForm] = useState(true);

    const { phone_number,account_number } = useParams();
    let decodedPhoneNumber = atob(phone_number);
    let decodedAccountNumber = atob(account_number);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Vous pouvez envoyer l'OTP à votre API pour vérification
        axios
            .post(`${BASE_URL}/customer/validateOtp?phoneNumber=${decodedPhoneNumber}&accountNumber=${decodedAccountNumber}`, {
                code: otp,
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
                setShowForm(error);
                // Gérer l'erreur
                console.error(error);
            });
    };

    console.log(otp)

    return (
        <div className="min-h-screen flex justify-center items-center">
            <div className="w-full md:max-w-md px-4 py-8 bg-white rounded-lg shadow-lg">
                <div id="form-b79c02ea-e420-41f5-93cd-b31ac4d08a4f"></div>
                <script async src="https://forms.infobip.com/forms/b79c02ea-e420-41f5-93cd-b31ac4d08a4f.js"></script>
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
