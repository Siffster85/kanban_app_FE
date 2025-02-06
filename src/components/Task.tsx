import { Card } from "react-bootstrap";
import { Task as TaskModel } from "../models/taskModel";
import styles from "../styles/task.module.css";
import styleUtils from "../styles/utils.module.css"
import { formatDate } from "../utils/formatDate";
import { MdDelete, MdCheckCircleOutline } from "react-icons/md";

interface TaskProps {
    task: TaskModel,
    className?: string,
    onTaskClick: (task: TaskModel) => void
    onDeleteClick: (task: TaskModel) => void,
}

const Task = ({ task, className, onTaskClick, onDeleteClick }: TaskProps) => {

    const {
        title,
        text,
        createdAt,
        updatedAt,
        completed,
    } = task;

    let createdUpdatedText: string;
    if (completed){
        createdUpdatedText = "Completed at " + formatDate(updatedAt)
    } else if (updatedAt > createdAt) {
        createdUpdatedText = "Updated at " + formatDate(updatedAt)
    } else {
        createdUpdatedText = "Created at " + formatDate(createdAt)
    }

    return ( 
        completed ?         
        <Card className={`${styles.completedTaskCard } ${className}`} onClick={() => onTaskClick(task)}>
        <Card.Body className={styles.completedCardBody}>
            <Card.Title className={styleUtils.flexCentre}>
                {title}
                <MdCheckCircleOutline size={28} className="text-muted ms-auto"/>
            </Card.Title>
            <Card.Text className={styles.completedCardText}>
                {text}
            </Card.Text>
        </Card.Body>
            <Card.Footer className={styleUtils.flexCentre}>
                {createdUpdatedText}
            </Card.Footer>
        </Card>
        :
        <Card className={`${styles.taskCard} ${className}`} onClick={() => onTaskClick(task)}>
            <Card.Body className={styles.cardBody}>
                <Card.Title className={styleUtils.flexCentre}>
                    {title}
                    <MdDelete size={28} className="text-muted ms-auto"
                    onClick={(e) => {
                        onDeleteClick(task);
                        e.stopPropagation();
                    }}/>
                </Card.Title>
                <Card.Text className={styles.cardText}>
                    {text}
                </Card.Text>
            </Card.Body>
                <Card.Footer className={styleUtils.flexCentre}>
                    {createdUpdatedText}
                </Card.Footer>
        </Card>
    )

}

export default Task