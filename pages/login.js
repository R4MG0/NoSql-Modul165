/* eslint-disable react-hooks/rules-of-hooks */
import styles from "./login.module.css"
import { Form, Button } from "react-bootstrap"
import { useRedirectToHome } from "@lib/session"
import { useRouter } from "next/router"
import { useState } from "react"
import { login } from "@lib/api"



const defaultModel = {
    email: "",
    password: ""}
function validateModel(userData) {
    const errors = {
        email: "",
        password: ""
    }
    let isValid = true
    if (userData.email === "") {
        errors.email = "Email can't be blank" 
        isValid = false
    }
    if (userData.password === "") {
        errors.password = "Password can't be blank"
        isValid = false
    }
    return { errors, isValid }
}

export default function loginPage({session}){

    useRedirectToHome(session)

    const router = useRouter()

    const [userData, setUser] = useState(defaultModel)
    const [errors, setErrors] = useState(defaultModel)

    const handleSubmit = async (e) => {
        e.preventDefault()

        const result = validateModel(userData)

        if (!result.isValid) {
            setErrors(result.errors)
            return
        }
        const resp = await login(userData)
        session.login(resp)
        router.push("/")
    }

    const handleChange = (e) => {
        const target = e.target
        const name = target.name
        const value = target.value
        
        setUser({ 
            ...userData,
            [name]: value
        })
    }
    return(
        <div className={styles.container}>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>E-mail</Form.Label>
                    <Form.Control placeholder="Name@name.ch" type="email" name="email" onChange={handleChange} value={userData.username}/>
                    {errors.email && <div  style={{color: 'red'}}>{errors.email}</div>}
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password" placeholder="Password" onChange={handleChange} value={userData.password}/>
                    {errors.password && <div style={{color: 'red'}}>{errors.password}</div>}
                </Form.Group>
                <Button variant="primary" type="submit">
                    Log In
                </Button>
            </Form>
        </div>
    )
}