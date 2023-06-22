import Post from "@components/Post"


export default function CreatePage({session}) {


    return(
        <Post postToEdit={null} session={session}/>
    )

}