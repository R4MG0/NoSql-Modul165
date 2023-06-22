import { Navbar, Container, Nav } from "react-bootstrap"
import Link from "next/link"

export default function Navigation({ session }) {

    return (
        <Navbar collapseOnSelect expand="lg" bg="light" variant="light" style={{ zIndex: 1000}}>
            <Container>
                {session.user && <Link  href={"/"} passHref><Navbar.Brand style={{textDecoration:"none"}}>Posts</Navbar.Brand></Link>}
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                    { session.user && <Link href="/posts/create" passHref ><Nav.Link style={{textDecoration:"none"}}>Create</Nav.Link></Link>}
                    { session.user && <Link href="/profile" passHref><Nav.Link style={{textDecoration:"none"}}>{session.user.firstName}</Nav.Link></Link>}
                    { session.user && <Link href="/users" passHref><Nav.Link style={{textDecoration:"none"}}>Users</Nav.Link></Link>}
                    </Nav>
                    <Navbar.Collapse className="justify-content-end">
                        <Nav>  
                            {session.user?.role === "admin" && <Link href="/register" passHref><Nav.Link style={{textDecoration:"none"}}>Register</Nav.Link></Link>}
                            {session.user && <Link href="/login" passHref><Nav.Link style={{textDecoration:"none"}} onClick={session.logout}>logout</Nav.Link></Link>}                            
                        </Nav>
                    </Navbar.Collapse>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}