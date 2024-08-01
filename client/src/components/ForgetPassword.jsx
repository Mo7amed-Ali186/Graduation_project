import { useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config";
import toast from "react-hot-toast";
export const ForgetPassword = () => {
    const [email, setEmail] = useState("");
    async function sendResetPasswordCode(email) {
        try {
            debugger;
            const { data } = await axios.patch(
                `${API_BASE_URL}/auth/sendCode`,
                {
                    email,
                }
            );

            if (data.message) {
                toast.success(data.message);
            }
        } catch (e) {
            console.log(e);
            toast.error(e.response.data.globalMessage);
        }
    }

    return (
        <>
            <div
                className="row bg-primary text-center"
                style={{ height: "50vh" }}
            >
                <div style={{}}>
                    <h6 className="section-heading fs-2">Forget Password</h6>
                    <input
                        placeholder="email"
                        className="form-control w-25"
                        type="text"
                        required
                        name="email"
                        id=""
                        style={{
                            margin: "0 auto",
                        }}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <button
                        onClick={() => sendResetPasswordCode(email)}
                        className="btn btn-danger mt-3"
                    >
                        Send Code
                    </button>
                </div>
            </div>
        </>
    );
};
