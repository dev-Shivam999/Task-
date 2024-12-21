import React, { useState } from "react";
// import "./App.css";

type PaymentDetails = {
    payer: string;
    email: string;
    amount: number;
    method: "Credit Card" | "Debit Card" | "UPI" | "Net Banking";
};

function Payment() {
    const [payment, setPayment] = useState<PaymentDetails>({
        payer: "",
        email: "",
        amount: 0,
        method: "Credit Card",
    });

    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setPayment((prev) => ({
            ...prev,
            [name]: name === "amount" ? Number(value) : value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <div className="min-h-screen bg-zinc-800 text-white p-6">
            <h1 className="text-2xl font-bold text-center mb-6">Payment Page</h1>
            {!submitted ? (
                <form
                    onSubmit={handleSubmit}
                    className="max-w-md mx-auto bg-zinc-500 p-6 rounded shadow"
                >
                    <div className="mb-4">
                        <label className="block font-medium mb-2" htmlFor="payer">
                            Payer Name
                        </label>
                        <input 
                            type="text"
                            id="payer"
                            name="payer"
                            value={payment.payer}
                            onChange={handleChange}
                            className="w-full text-black border border-gray-300 p-2 rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block font-medium mb-2" htmlFor="email">
                            Email Address
                        </label>
                        <input 
                            type="email"
                            id="email"
                            name="email"
                            value={payment.email}
                            onChange={handleChange}
                            className="w-full text-black border border-gray-300 p-2 rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block font-medium mb-2" htmlFor="amount">
                            Payment Amount
                        </label>
                        <input 
                            type="number"
                            id="amount"
                            name="amount"
                            value={payment.amount}
                            onChange={handleChange}
                            className="w-full text-black border border-gray-300 p-2 rounded"
                            min={1}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block font-medium mb-2" htmlFor="method">
                            Payment Method
                        </label>
                        <select
                            id="method"
                            name="method"
                            value={payment.method}
                            onChange={handleChange}
                            className="w-full border border-gray-300 p-2 rounded"
                        >
                            <option>Credit Card</option>
                            <option>Debit Card</option>
                            <option>UPI</option>
                            <option>Net Banking</option>
                        </select>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                    >
                        Submit Payment
                    </button>
                </form>
            ) : (
                <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
                    <h2 className="text-lg font-bold mb-4">Payment Summary</h2>
                    <p className="mb-2">
                        <strong>Payer Name:</strong> {payment.payer}
                    </p>
                    <p className="mb-2">
                        <strong>Email:</strong> {payment.email}
                    </p>
                    <p className="mb-2">
                        <strong>Amount:</strong> ${payment.amount}
                    </p>
                    <p className="mb-4">
                        <strong>Method:</strong> {payment.method}
                    </p>
                    <button
                        className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
                        onClick={() => alert("Payment Confirmed!")}
                    >
                        Confirm Payment
                    </button>
                </div>
            )}
        </div>
    );
}

export default Payment;
