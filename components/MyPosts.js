/* eslint-disable react-hooks/rules-of-hooks */
import { Card, Button } from "react-bootstrap"
import styles from "./MyPosts.module.css"
import { useState, useEffect } from "react"
import { getAllPosts } from "@lib/api"
import Link from "next/link"

export default function myPosts({ session }) {

    const [posts, setPosts] = useState([])

    useEffect(() => {

        const loadPosts = async () => {
            const response = await getAllPosts()
            setPosts(response)
        }
        loadPosts()
    }, [])


    return (
        <div>

        <div className={styles.container} >
            
            {
                posts.map(post => {
                    return (
                        <div key={post.id} >
                            {session.user?.firstName === post.user &&
                                <Link href={`/posts/${post.id}`} >
                                    <Card className={styles.card}>
                                        <Card.Img className={styles.img} src={post.img} />
                                        <Card.Header>{post.title}</Card.Header>
                                    </Card>
                                </Link>
                            }
                        </div>
                    )
                })
            }
        </div>
    </div>
    )
}