import { Container } from "react-bootstrap"
import LoggedOut from "../AuthedViews/LoggedOut"
import styles from "../../styles/taskPage.module.css";
import { User } from "../../models/userModel";
import ProjectsPageLoggedIn from "../AuthedViews/ProjectsPageLoggedIn";

interface PageProps {
    loggedInUser: User | null,
}

const ProjectsPage = ({loggedInUser}: PageProps) => {
    return (
        <Container className={styles.taskPage}>
        <>
        {loggedInUser 
        ? <ProjectsPageLoggedIn />
        : <LoggedOut />
        }
        </>
    </Container>
    )
}

export default ProjectsPage