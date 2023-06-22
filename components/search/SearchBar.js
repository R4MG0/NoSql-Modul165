import { useEffect, useState } from "react";
import {Form, FormControl, Card} from "react-bootstrap"
import Link from 'next/link'
import styles from './SearchBar.module.css'
import { Button } from "react-bootstrap";
import { deleteUser } from "@lib/api";
import { useRouter } from "next/router"


const profile = "https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"

export default function FilterableList({session, users}) {

    const [newFilteredUser, setNewFilteredUser] = useState([])
    const [beforeSearch, setBeforeSearch] = useState()
    const router = useRouter()

    useEffect(() =>{
        setBeforeSearch(users)
        setNewFilteredUser(users)
    },[])

    const handleChange = (e) => {
        const inputValue = e.target.value
        
        let someValue = []

        someValue = beforeSearch.map(user => {
            
            if(user.firstName.toLowerCase().includes(inputValue.toLowerCase())) return user      
            if(user.lastName.toLowerCase().includes(inputValue.toLowerCase())) return user
            
        })
        setNewFilteredUser(someValue)
    }

    async function kill(id){
        if(id === session.user.id){ 
            const resp = await deleteUser(id, session.accessToken)
            session.logout()
        }else{
            const resp = await deleteUser(id, session.accessToken)
            router.reload()
        }
    }

    return (
        <div>
            <Form className="d-flex" >
                <FormControl
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                onChange={handleChange}

                />
            </Form>

             {
                session.user && 
                newFilteredUser.map((user) => {
                        return(
                            
                            <div className={styles.user} key={user?.id}>
                                { 
                                user?.id &&    
                                
                                    <Card style={{ width: '30rem', marginTop: '2rem' }} className={styles.card}>      
                                        <Link href={`/users/${user.id}`} passHref>
                                            <Card.Body>
                                                <div className={styles.profile}>
                                                    <div className={styles.img}>
                                                    {user.img ? <img src={user?.img}/> : <img src={profile}/>}
                                                    </div>
                                                    <div>
                                                    <Card.Title className={styles.name}>{`${user.firstName} ${user.lastName}`} <br/> <Card.Subtitle style={{marginTop:'0.5rem'}}>{user.role}</Card.Subtitle></Card.Title>
                                                    
                                                    </div>
                                                </div>  
                                            </Card.Body>
                                        </Link>
                                        <div className={styles.buttonContainer}>
                                        { session.user.role === 'admin' && <Button className={styles.button} style={{width:'8vw' , marginLeft:'8px', marginBottom:'1.5rem'}} variant="danger" onClick={(e) => kill(user.id)}>Delete</Button>}
                                        </div>
                                    </Card>
                         }
                         </div>
                        
                        )
                    })
            }
                                    
        </div>
    );
}
