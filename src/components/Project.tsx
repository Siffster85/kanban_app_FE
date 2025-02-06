import { Card } from "react-bootstrap";
import { Project as ProjectModel } from "../models/projectModel";
import styles from "../styles/project.module.css";
import styleUtils from "../styles/utils.module.css"
import { formatDate } from "../utils/formatDate";
import { useNavigate } from "react-router-dom";

interface ProjectProps {
    project: ProjectModel,
    className?: string,
    onDeleteClick: (project: ProjectModel) => void,
}

const Project = ({ project, className, }: ProjectProps) => {

    const {
        title,
        text,
        createdAt,
        updatedAt,
        completed,
        requiredBy,
    } = project;

    let createdUpdatedText: string;
    if (completed){
        createdUpdatedText = "Completed at " + formatDate(updatedAt)
    } else if (updatedAt > createdAt) {
        createdUpdatedText = "Updated at " + formatDate(updatedAt)
    } else {
        createdUpdatedText = "Created at " + formatDate(createdAt)
    }

    const required = "Required by " + formatDate(requiredBy)

    const navigate = useNavigate();

    return (
        completed ?
        <Card className={`${styles.completedProjectCard} ${className}`} onClick={() => navigate(`/${project._id}`)}>
        <Card.Body className={styles.completedCardBody}>
            <Card.Title className={styleUtils.flexCentre}>
                {title}
            </Card.Title>
            <Card.Text className={styles.completedCardText}>
                {text}
            </Card.Text>
        </Card.Body>
            <Card.Footer className="text-muted">
                {createdUpdatedText}
                <br />
                {required}
            </Card.Footer>
        </Card>
        :
        <Card className={`${styles.projectCard} ${className}`} onClick={() => navigate(`/${project._id}`)}>
            <Card.Body className={styles.cardBody}>
                <Card.Title className={styleUtils.flexCentre}>
                    {title}
                </Card.Title>
                <Card.Text className={styles.cardText}>
                    {text}
                </Card.Text>
            </Card.Body>
                <Card.Footer className="text-muted">
                    {createdUpdatedText}
                    <br />
                    {required}
                </Card.Footer>
        </Card>
    )

}

export default Project