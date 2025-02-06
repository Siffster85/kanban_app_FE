import { Container, Nav, Navbar } from "react-bootstrap"
import { User } from "../models/userModel"
import NavBarLoggedIn from "./NavBarViews/NavBarLoggedIn"
import NavBarLoggedOut from "./NavBarViews/NavBarLoggedOut"
import { Link } from "react-router-dom"
import { MdAddTask } from "react-icons/md";
import styles from "../styles/app.module.css"


interface NavBarProps{
    loggedInUser: User | null,
    onSignUpClicked: () => void,
    onLoginClicked: () => void,
    onLogoutSuccessful: () => void,
}

const NavBar = ({loggedInUser, onSignUpClicked, onLoginClicked, onLogoutSuccessful}: NavBarProps) => {
    return (
        <Navbar variant="dark" expand="sm" sticky="top" className={styles.navbarCustom}>
            <Container>
                <Navbar.Brand as={Link} to="/">
                <MdAddTask /> YLS Kanban
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="main-navbar" />
                <Navbar.Collapse id="main-navbar">
                    <Nav>
                    </Nav>
                    <Nav className="ms-auto">
                        {loggedInUser 
                        ? <NavBarLoggedIn user={loggedInUser} onLogoutSuccessful={onLogoutSuccessful} /> 
                        : <NavBarLoggedOut onLoginClicked={onLoginClicked} onSignUpClicked={onSignUpClicked}/>}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavBar