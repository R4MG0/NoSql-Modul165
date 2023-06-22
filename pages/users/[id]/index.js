import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { getUserById} from "@lib/api"
import {useRedirectToLogin} from "@lib/session"
import UserPosts from "@components/UserPosts"
import Link from "next/link"
import styles from "./index.module.css"


const profile = "https://banner2.cleanpng.com/20180525/fbc/kisspng-computer-icons-user-symbol-company-profile-5b084df3719b03.2755377715272708994653.jpg"

export default function IdIndexPage({session}){
    useRedirectToLogin(session)

    const router = useRouter()
    const { id } = router.query
    const [user, setUser] = useState(null)

    useEffect(() => {
        if(!id) return
        const loadUser = async () => {
            const response = await getUserById(id)
            setUser(response)
        }
        loadUser()
    }, [id])



    return user && (
        <div>
            <div>
                <h1>ProfilePage</h1>
                <div>
                    <div className={styles.profile}>
                        <div className={styles.img}>
                            <Link href="/profile/settings" passHref> 
                                {user.img ? <img src={user.img} /> : <img alt="hello" src={profile}/>}
                            </Link>
                        </div>
                    <h2 style={{marginLeft:'100px'}}>{user.firstName} {user.lastName}</h2>
                    </div>
                </div>
            </div>
            <h1>Posts</h1>
            <UserPosts session={session} user={user}/>
        </div>
    )
}