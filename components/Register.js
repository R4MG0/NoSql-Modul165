import { Form, Button } from "react-bootstrap"
import Link from "next/link"
import {useState, useEffect} from "react"
import { useRouter } from "next/router"
import { register } from "@lib/api"


const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
})

const defaultModel = {
    email: "",
    img: "",
    firstName: "",
    lastName: "",
    role: "",
    password: ""
}

function validateModel(user){
    const errors = {
        email: "",
        img: "",
        firstName: "",
        lastName: "",
        role: "",
        password: ""
    }
    let isValid = true

    if (user.email === "" || user.email === null) {
        errors.email = "Please enter a title"
        isValid = false;
    }

    if (user.firstName === "" || user.firstName === null) {
        errors.firstName = "please enter a first name"
        isValid = false;
    }

    if (user.lastName === "" || user.firstName === null){
        errors.lastName = "please enter a last name"
        isValid = false
    }

    if(user.role === "" || user.role === null){
        errors.role = "pls select a Role"
        isValid = false
    }

    if(user.password === "" || user.password === null){
        errors.password = "pls enter a password"
        isValid = false
    }

    return { errors, isValid }
}

export default function Register({session}){
    
    const [user, setUser] = useState(defaultModel)
    const router = useRouter()
    const [errors, setErrors] = useState(defaultModel)

    const [base64Image, setBase64Image] = useState("")
    const [imagePath, setImagePath] = useState("")

    const handleChange = (e) => {
        const target = e.target
        const name = target.name
        const value = target.value

        setUser({
            ...user,
            [name]: value
        })
    }

    const submit = async (e) => {
        e.preventDefault()

        setErrors(defaultModel)

        user.img = imagePath

        const result = validateModel(user)

        if (!result.isValid) {
            setErrors(result.errors)
            return
        }

        const newUser = await register(user.email, user.password, user.firstName, user.lastName, user.role, user.img)
        router.push(`/`)
    }

    const onFileInputChange = async (e) => {
        const file = e.target.files[0]
        if (!file) return
        const base64 = await toBase64(file)
        setBase64Image(base64)
    }

    useEffect(() => {
        if (!base64Image) return

        const uploadImage = async () => {
            const response = await fetch("/api/upload", {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    base64Image
                })
            })

            const data = await response.json()
            setImagePath(data.filePath)
        }

        uploadImage()
    }, [base64Image])

    return(
        <div>
            <h1>Register a new Person</h1>

            <Form onSubmit={submit}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>E-Mail</Form.Label>
                    <Form.Control type="email" name="email" onChange={handleChange}/>
                    {errors.email && <div style={{ color: 'red' }}>{errors.email}</div>}
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Password</Form.Label> 
                    <Form.Control type="password" name="password" onChange={handleChange} />
                    {errors.password && <div style={{ color: 'red' }}>{errors.password}</div>}
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control name="firstName" onChange={handleChange} />
                    {errors.firstName && <div style={{ color: 'red' }}>{errors.firstName}</div>}
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control name="lastName" onChange={handleChange} />
                    {errors.lastName && <div style={{ color: 'red' }}>{errors.lastName}</div>}
                </Form.Group>
                <Form.Group>
                    <Form.Label>Select a role</Form.Label>
                    <Form.Select name="role" onChange={handleChange}>
                        <option>-</option>
                        <option>user</option>
                        <option>admin</option>
                    </Form.Select>
                    {errors.role && <div style={{color:'red'}}>{errors.role}</div>}
                </Form.Group>
                <Form.Group controlId="formFileMultiple" className="mb-3">
                    <Form.Label >Profile pic</Form.Label>
                    <Form.Control type="file" onChange={onFileInputChange} name="img" />
                </Form.Group>
                <Button variant="primary" type="submit">Save</Button>
                <Button onClick={() => router.push('/')}>Back</Button>
            </Form>
        </div>
    )
}