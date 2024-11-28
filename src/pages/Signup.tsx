import { useRef } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import axios from "axios";
import { BACKEND_URL } from "../components/config";
import { useNavigate } from "react-router-dom";


export default function Signup() {
    const usernameRef = useRef<HTMLInputElement>();
    const passwordRef = useRef<HTMLInputElement>();
    const navigate = useNavigate()

    async function signup(){
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;
        await axios.post(`${BACKEND_URL}/api/v1/signup` , {
            username,
            password        
    })
    navigate("/dashboard");
    alert("You have signed up!!!")     
}
  return (
    <div className="h-screen w-screen bg-gray-300 flex justify-center items-center ">
      <div className="bg-white rounded-xl min-w-48 p-8 border-2 space-y-3">
        <Input placeholder="Username" reference={usernameRef} />
        <Input placeholder="Password" reference={passwordRef} />
        <div className="flex justify-center pt-4">
          <Button
            onClick={signup}
            title="Signup"
            variant="primary"
            fullWidth={true}
            size="md"
          />
        </div>
      </div>
    </div>
  );
}
