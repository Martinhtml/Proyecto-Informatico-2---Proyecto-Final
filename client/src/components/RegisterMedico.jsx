import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

import "./Register.css"

function RegisterMedico(){
    const navigate = useNavigate()

    const [name, setName] = useState("")
    const [apellido, setApellido] = useState("")
    const [dni, setDni] = useState("")
    const [email, setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [mensaje, setMensaje] = useState("")  
}
