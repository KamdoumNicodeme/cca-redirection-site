import {useState} from "react";
import axios from "axios";

const TransactionInfo = () => {
    const [numero,setNumero] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        const numeroCompte = numero;




        axios.get(`localhost:3000/users/${numeroCompte}`)
            .then((response) => {
                if (response.data) {
                    const user = response.data;
                    console.log(user)

                } else {
                    // Handle error
                }
            })
            .catch((error) => {
                // Handle error
            });
    };

    return(
        <div className="min-h-screen flex justify-center items-center">
            <div className="w-full md:max-w-md px-4 py-8 bg-white rounded-lg shadow-lg">
                <form onSubmit={handleSubmit}>
                    <label htmlFor="compte" className="mb-2">Quel est le numéro de compte du bénéficiaire ?</label>
                    <input
                        type="text"
                        className="rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 w-full sm:text-sm h-10"
                        placeholder="Numéro de compte du bénéficaire"
                        value={numero}
                        onChange={(e) => setNumero(e.target.value)}
                    />
                    <button type="submit"
                            className="bg-violet-500 text-white rounded-lg px-4 py-2 mt-4 w-full">Soumettre
                    </button>
                </form>
            </div>
        </div>
    );
}

export default TransactionInfo;
