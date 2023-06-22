import { useRedirectToLogin } from "@lib/session"
import {useState, useEffect} from "react"
import { Button } from "react-bootstrap"
import {updateUser, getAllPosts} from "@lib/api"
import {Form} from "react-bootstrap"
import { useRouter } from "next/router"
import Link from "next/link"
import MyPosts from "@components/MyPosts"
import styles from "./index.module.css"


const profile = "https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"
export default function ProfilePage({session}) {
    useRedirectToLogin(session)


    const [user, setUser] = useState()

    useEffect(() => {
        setUser(session.user)
    },[session.user])


    return user && (
        <div>
            <div>
                <h1>ProfilePage</h1>
                <div>
                    <div className={styles.profile}>
                        <div className={styles.containerImg}>
                            <div className={styles.img}>
                                <Link href="/profile/settings" passHref> 
                                    {user.img ? <img src={user.img} /> : <img alt="hello" src={profile}/>}
                                </Link>
                            </div>
                        </div>
                    <h2 style={{marginLeft:'100px'}}>{user.firstName} {user.lastName}</h2>
                    </div>
                    <Link href="/profile/settings">
                        <Button variant="primary">Settings</Button>
                    </Link>
                </div>
            </div>
            <h1>Your Posts</h1>
            <MyPosts session={session}/>
        </div>
    )
}