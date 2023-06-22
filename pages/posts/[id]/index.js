import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { getPostById} from "@lib/api"
import { deletePost } from "@lib/api"
import {useRedirectToLogin} from "@lib/session"
import {Button, Accordion} from "react-bootstrap"
import Link from "next/link"
import styles from "./index.module.css"
import Comment from "@components/Comment"

export default function IdIndexPage({session}){

    useRedirectToLogin(session)
    
    const router = useRouter()
    const { id } = router.query
    const [post, setPost] = useState(null)

    useEffect(() => {
        if(!id) return
    
        const loadPost = async () => {
            const response = await getPostById(id)
            setPost(response)
        }
        loadPost()
    }, [id])

    async function kill(){
        const resp = await deletePost(id, session.accessToken)
        router.push("/")
    }


    return post &&(
        <div className={styles.singlePost}>
            <div key={post.id}>
                <h1 className={styles.title}>{post.title}</h1>
                <img className={styles.image} src={post.img}/>
                <div>
                    <p className={styles.text}>{post.description}</p>
                    <p className={styles.dateTime}>{`${post.date} ${post.time}`}</p>
                </div>
                <div className={styles.btn}>
                    <Button onClick={() => router.push('/')}>Back</Button>
                </div>
                <div>
                    {
                    session.user?.firstName === post.user && 
                    <div> 
                        <Link href={`/posts/${post.id}/edit`}>
                            <Button>edit</Button>
                        </Link> 
                        <Button variant="danger" onClick={kill}>delete</Button> 
                       {/* <Button style={{ background:'none', border:'none'}} variant="primary" onClick={comment}>💬</Button> */}
                    </div>
                    } 
                </div>
            </div>
            <Comment session={session} post={post}/>
        </div>
    )
}