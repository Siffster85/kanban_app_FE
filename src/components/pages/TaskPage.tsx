import { Container } from "react-bootstrap"
import TaskPageLoggedIn from "../AuthedViews/TaskPageLoggedIn"
import LoggedOut from "../AuthedViews/LoggedOut"
import styles from "../../styles/taskPage.module.css";
import { User } from "../../models/userModel";

interface PageProps {
    loggedInUser: User | null,
}

const TaskPage = ({loggedInUser}: PageProps) => {
    return (
        <Container className={styles.taskPage}>
        <>
        {loggedInUser 
        ? <TaskPageLoggedIn />
        : <LoggedOut />
        }
        </>
    </Container>
    )
}

export default TaskPage