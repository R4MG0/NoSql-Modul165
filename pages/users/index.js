import { useRedirectToLogin } from "@lib/session";
import {Form, FormControl, Button, Card} from "react-bootstrap"
import { useState, useEffect } from "react";
import {getAllUsers} from "@lib/api"
import styles from "./index.module.css"
import Link from "next/link"
import SearchBar from "@components/search/SearchBar";


const profile = "https://banner2.cleanpng.com/20180525/fbc/kisspng-computer-icons-user-symbol-company-profile-5b084df3719b03.2755377715272708994653.jpg"

export default function Users({session}){
    useRedirectToLogin(session);

    const [allUsers, setAllUser] = useState()

    useEffect(() => {

        const loadUsers = async () => {
            const response = await getAllUsers()
            setAllUser(response)
        }
        loadUsers()
    },[])

    return allUsers &&(
        <div>
            <h1>Users</h1>
            <SearchBar users={allUsers} session={session}/>
           
        </div>
    )
}