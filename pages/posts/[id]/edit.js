/* eslint-disable react-hooks/rules-of-hooks */
import {getPostById} from "@lib/api"
import {useState, useEffect} from "react"
import {useRouter} from "next/router"
import Post from "@components/Post"


const URL = "http://localhost:3001/posts"

export default function edit({session}){
    const router = useRouter()
    const {id} = router.query
    const [post, setPost] = useState(null)


    useEffect(() => {
        const load = async () => {
            const data = await getPostById(id);
            setPost(data);
        }
        load();
    }, [id])

    return(
        <div>
            <Post session={session} postToEdit={post}/>
        </div>
    )
}