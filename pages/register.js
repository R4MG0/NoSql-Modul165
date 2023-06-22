import { useRedirectToLogin } from "@lib/session"
import Register from "@components/Register"

export default function registerPage({ session }) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useRedirectToLogin(session)
    
    return ( 
        <div>
            <Register session={session}/>
        </div> 
        )
    }