import { useEffect, useState } from 'react';
import { Button, Col, Row, Spinner, Card, Container } from 'react-bootstrap';
import { FaPlus } from "react-icons/fa";
import { AddEditTask } from '../modals/AddEditTask';
import Task from '../Task';
import { Task as TaskModel } from '../../models/taskModel';
import { Project as ProjectModel } from '../../models/projectModel'
import * as TasksApi from "../../network/api";
import styles from "../../styles/taskPage.module.css";
import stylesUtils from "../../styles/utils.module.css";
import { useParams } from 'react-router-dom';
import { formatDate } from "../../utils/formatDate";
import { MdSettings } from "react-icons/md";
import { AddEditProject } from '../modals/AddEditProject';
import { ConfirmDelete } from '../modals/ConfirmDelete';
import { useNavigate } from "react-router-dom";
import { ConfirmComplete } from '../modals/ConfirmComplete';

const TaskPageLoggedIn = () => {
    const [projectDetails, setProjectDetails] = useState<ProjectModel|null>(null)
    const [tasks, setTasks] = useState<TaskModel[]>([]);
    const [tasksLoading, setTasksLoading] = useState(true)
    const [showTasksLoadingError, setShowTasksLoadingError] = useState(false)
    const [showAddTask, setShowAddTask] = useState(false)
    const [taskToEdit, setTaskToEdit] = useState<TaskModel|null>(null)
    const [projectToEdit, setProjectToEdit] = useState<ProjectModel|null>(null)
    const [isProjectCompleted, setIsProjectCompleted] = useState(false);
    const [projectDelete, setProjectDelete] = useState<ProjectModel|null>(null)
    const [projectComplete, setProjectComplete] = useState<ProjectModel|null>(null)

    const params = useParams<{ projectId: string }>()
    const projectId = params?.projectId || '';
    
    useEffect(() => {
        async function loadTasks() {
            try {
                setShowTasksLoadingError(false)
                setTasksLoading(true)
                const { project, projectTasks } = await TasksApi.fetchTasks(projectId);
                setProjectDetails(project);
                setTasks(projectTasks);
            } catch (error){
                console.error(error)
                setShowTasksLoadingError(true)
            } finally {
                setTasksLoading(false)
            }
            }
            loadTasks();
        }, [projectId]);
    
    useEffect(() => {
            setIsProjectCompleted(tasks.every(task => task.completed === true));
        }, [tasks])
        
        async function deleteTask(task: TaskModel) {
            try {
            await TasksApi.deleteTask(task._id);
            setTasks(tasks.filter(existingTask => existingTask._id !== task._id))
            } catch (error){
            console.error(error);
            alert(error)
            }
        }
        const navigate = useNavigate();

        async function deleteProject(project: ProjectModel) {
            try {
                await TasksApi.deleteProject(project._id)
                navigate('/')
            } catch (error) {
                console.error(error);
                alert(error)
            }
        }
        
        async function completeProject(project: ProjectModel) {
            const completedProject = project
            
            try {
                completedProject.completed = true
                console.log(completedProject);
                await TasksApi.updateProject(project._id, completedProject)
                navigate('/')
            } catch (error) {
                console.error(error);
                alert(error)
            }
        }
        
        const taskGrid = 
        <Row xs={1} md={2} xl={3} className={`g-4 ${styles.taskGrid}`}>
        {tasks.map(task => (
          <Col key={task._id}>
            {task.completed ? 
              <Task 
                task={task} 
                className={styles.taskCompleted}
                onTaskClick={setTaskToEdit}
                onDeleteClick={deleteTask}
              />:
              <Task 
                task={task} 
                className={styles.task}
                onTaskClick={setTaskToEdit}
                onDeleteClick={deleteTask}
              />}
          </Col>           
        ))}
        </Row>


    return (
        projectDetails?.completed ? 
        <>
        {projectDetails ?     
        <Container>
        <Row>
            <Col md={8} className="mx-auto"> 
            <Card bg="transparent" text="light" className="mb-4"> 
                <Card.Body className="text-center"> 
                <Card.Title as="h2" className="mb-2">{projectDetails.title}</Card.Title> 
                {projectDetails.text && <Card.Text>{projectDetails.text}</Card.Text>} 
                <Card.Text className="small">
                    Required by {formatDate(projectDetails.requiredBy)}
                    <br />
                    Completed at {formatDate(projectDetails.updatedAt)}
                </Card.Text>
                </Card.Body>
            </Card>
            </Col>
        </Row>
        </Container>
        : null}
        {tasksLoading && <Spinner animation='border' variant='primary'/>}
        {showTasksLoadingError && <p>Something went wrong, please refresh the page.</p>}
        {!tasksLoading && !showTasksLoadingError &&
        <>
        {tasks.length > 0 ? taskGrid: <p>Add your first task!</p>}
        </>
        }
        </> 
        :
        <>
        {projectDetails ? 
        <Container>
        <Row>
          <Col md={8} className="mx-auto">
            <Card bg="transparent" text="light" className="mb-4">
              <Card.Body>
                <div className="d-flex align-items-center justify-content-center"> 
                  <Card.Title as="h2" className="mb-0 text-center"> 
                    {projectDetails.title}
                  </Card.Title>
                  <MdSettings
                    className="text-light ms-2"
                    onClick={(e) => {
                      setProjectToEdit(projectDetails);
                      e.stopPropagation();
                    }}
                    style={{ cursor: 'pointer', fontSize: '1.5rem' }} 
                  />
                </div>
                {projectDetails.text && <Card.Text>{projectDetails.text}</Card.Text>}
                <Card.Text className="small">
                  Required by {formatDate(projectDetails.requiredBy)}
                </Card.Text>
                <div className="d-flex justify-content-end mt-2"> 
                  <Button
                    variant="outline-danger"
                    onClick={(e) => {
                      setProjectDelete(projectDetails);
                      e.stopPropagation();
                    }}
                  >
                    Delete Project
                  </Button>
                </div>
                <div className="d-grid gap-2 mt-3"> 
                  <Button
                    variant="outline-primary"
                    className={`${stylesUtils.blockCentral} ${stylesUtils.flexCentre}`}
                    onClick={() => setShowAddTask(true)}
                  >
                    <FaPlus className="mt-1" />
                    Add new Task
                  </Button>
                </div>
                {isProjectCompleted && tasks.length > 0 && (
                  <div className="mt-3 text-center"> 
                    <Card.Text style={{ fontSize: '1.2rem' }}>Is your Project completed?</Card.Text>
                    <div className="d-grid gap-2"> 
                      <Button
                        variant='outline-success'
                        className={`${stylesUtils.blockCentral} ${stylesUtils.flexCentre}`}
                        onClick={(e) => {
                          setProjectComplete(projectDetails);
                          e.stopPropagation();
                        }}
                      >
                        Complete Project!
                      </Button>
                    </div>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
        </Container>
        : null}
        {tasksLoading && <Spinner animation='border' variant='primary'/>}
        {showTasksLoadingError && <p className='text-light'>Something went wrong, please refresh the page.</p>}
        {!tasksLoading && !showTasksLoadingError &&
        <>
        {tasks.length > 0 ? taskGrid: <p className='text-light'>Add your first task!</p>}
        </>
        }
        { showAddTask &&
            <AddEditTask 
            projectId={projectId}
            onDismiss={() => setShowAddTask(false)}
            onTaskSaved={(newTask) => {
                setTasks([...tasks, newTask]);
                setShowAddTask(false);
            }}
            />
        }
        { taskToEdit &&
            <AddEditTask 
            projectId={projectId}
            onDismiss={() => setTaskToEdit(null)}
            taskToEdit={taskToEdit}
            onTaskSaved={(updatedTask => {
                setTasks(tasks.map(existingTask => existingTask._id === updatedTask._id ? updatedTask : existingTask))
                setTaskToEdit(null);
            })}
            />
        }
        { projectToEdit &&
            <AddEditProject
            projectToEdit={projectToEdit}
            onDismiss={() => setProjectToEdit(null)}
            onProjectSaved={(updatedProject => {
                setProjectDetails(updatedProject)
                setProjectToEdit(null);
            })}
            />
        }  
        { projectDelete && 
            <ConfirmDelete
            onDismiss={() => setProjectDelete(null)}
            onDelete={()=> {
                deleteProject(projectDelete)
                setProjectDelete(null)}
            }
            />
        }
        { projectComplete && 
            <ConfirmComplete
            onDismiss={() => setProjectComplete(null)}
            onComplete={()=> {
                completeProject(projectComplete)
                setProjectComplete(null)}
            }
            />
        }
        </>     
    )
}

export default TaskPageLoggedIn