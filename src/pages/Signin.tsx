import { useRef } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { BACKEND_URL } from "../components/config";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export default function Signin() {

    const usernameRef = useRef<HTMLInputElement>();
    const passwordRef = useRef<HTMLInputElement>();
    const navigate = useNavigate();

    async function signin() {
      try {
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;
        const response = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
          username,
          password,
        });
        const jwt = response.data.token;
        localStorage.setItem("token", jwt);
        alert("Signin successful!");
        navigate("/dashboard")
      } catch (error: any) {
        console.error("Signin error:", error);
        alert("Failed to sign in. Please check your network connection.");
      }
    }

  return (
    <div className="h-screen w-screen bg-gray-300 flex justify-center items-center ">
      <div className="bg-white rounded-xl min-w-48 p-8 border-2 space-y-3">
        <Input reference={usernameRef} placeholder="Username" />
        <Input reference={passwordRef} placeholder="Password" />
        <div className="flex justify-center pt-4">
          <Button onClick={signin} title="Signin" variant="primary" fullWidth={true} size="md" />
        </div>
      </div>
    </div>
  );
}
