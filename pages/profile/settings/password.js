import { useState, useEffect } from "react"
import { useRedirectToLogin } from "@lib/session"
import { useRouter } from "next/router"
import {updateUser} from "@lib/api"
import {Form, Button} from "react-bootstrap"
import Link from 'next/link'

const defaultModel = {
    password:""
}

function validatePassword(password) {
    let error = {
        password:""
    }
    let isValid = true
    alert(password)
    if(password.trim() === "") {
        error.password = "The password can't be empty"
        isValid = false
    }

    return{error, isValid}
}

export default function Password({ session }) {

    useRedirectToLogin(session)

    const [user, setUser] = useState(defaultModel)
    const [error, setError] = useState(defaultModel)
    const [password, setPassword] = useState(defaultModel)
    const router = useRouter()

    useEffect(() => {
        setUser(session.user)
    }, [session.user])


    const handleChange = (e) => {

        const target = e.target
        const name = target.name
        const value = target.value

        setPassword({
            ...password,
            [name]: value
        })
    }


    const handleSubmit = async (e) => {
        e.preventDefault()

        user.password = password.password
        
        const validate = validatePassword(user.password)
        
        if(!validate.isValid) {
            setError(validate.error)
            return
        }

        const resp = await updateUser(user, session.accessToken)

        router.push('/profile')
        // session.logout()
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <div>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password" onChange={handleChange}/>
                    {/* <Form.Label style={{marginTop: "1rem"}}>Retype password</Form.Label> */}
                    {error.password && <div style={{color:'red'}}>{error.password}</div>}
                    {/* <Form.Control  type="password" name="password" onChange={handleChange}/> */}
                    <div style={{marginTop:'1.5rem'}}>
                        <Button variant="primary" type="submit">Change</Button>
                        <Button onClick={() => router.push('/profile/settings')}>Back</Button>
                    </div>
                </div>
            </Form.Group>
        </Form>
    )
}