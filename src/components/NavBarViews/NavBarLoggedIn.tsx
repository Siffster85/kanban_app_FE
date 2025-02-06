import { Button, Navbar } from "react-bootstrap";
import { User } from "../../models/userModel"
import * as TaskApi from "../../network/api"

interface NavBarLoggedInViewProps {
    user: User,
    onLogoutSuccessful: () => void,
}

const NavBarLoggedIn = ({user, onLogoutSuccessful}: NavBarLoggedInViewProps) => {

    async function logout() {
        try {
            await TaskApi.logout();
            onLogoutSuccessful();
        } catch (error) {
            console.error(error);
            alert(error);           
        }
    }
    return (
        <>
            <Navbar.Text className="me-2">
                Signed in as: {user.username}
            </Navbar.Text>
            <Button variant="outline-light" onClick={logout}>
                Log Out
            </Button>
        </>
    )
}

export default NavBarLoggedIn