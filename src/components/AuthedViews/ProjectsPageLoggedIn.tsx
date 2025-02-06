import { useEffect, useState } from 'react';
import { Button, Col, Row, Spinner } from 'react-bootstrap';
import { FaPlus } from "react-icons/fa";
import { AddEditProject } from '../modals/AddEditProject';
import Project from '../Project';
import { Project as ProjectModel } from '../../models/projectModel';
import * as ProjectsApi from "../../network/api";
import styles from "../../styles/projectPage.module.css";
import stylesUtils from "../../styles/utils.module.css";

const ProjectsPageLoggedIn = () => {

    const [projects, setProjects] = useState<ProjectModel[]>([]);
    const [projectsLoading, setProjectsLoading] = useState(true)
    const [showProjectsLoadingError, setShowProjectsLoadingError] = useState(false)
    const [showAddProject, setShowAddProject] = useState(false)
    
    useEffect(() => {
        async function loadProjects() {
            try {
                setShowProjectsLoadingError(false)
                setProjectsLoading(true)
                const receivedProjects = await ProjectsApi.fetchProjects();
                setProjects(receivedProjects)
            } catch (error){
                console.error(error)
                setShowProjectsLoadingError(true)
            } finally {
                setProjectsLoading(false)
            }
            }
            loadProjects();
        }, []);
        
        async function deleteProject(project: ProjectModel) {
            try {
            await ProjectsApi.deleteProject(project._id);
            setProjects(projects.filter(existingProject => existingProject._id !== project._id))
            } catch (error){
            console.error(error);
            alert(error)
            }
        }
        
        const projectGrid = 
        <Row xs={1} md={2} xl={3} className={`g-4 ${styles.projectGrid}`}>
        {projects.map(project => (
            <Col key={project._id}>
            <Project 
            project={project} 
            className={styles.project}
            onDeleteClick={deleteProject}/>
            </Col>
        ))}
        </Row>

    return (
        <>
        <Button 
        variant='outline-primary'
        className={`mb-4 ${stylesUtils.blockCentral} ${stylesUtils.flexCentre}`}
        onClick={() => setShowAddProject(true)}>
            <FaPlus className='mt-1'/> 
            Add New Project
        </Button>
        {projectsLoading && <Spinner animation='border' variant='primary'/>}
        {showProjectsLoadingError && <p>Something went wrong, please refresh the page.</p>}
        {!projectsLoading && !showProjectsLoadingError &&
        <>
        {projects.length > 0 ? projectGrid: <p>Add your first Project!</p>}
        </>
        }
        { showAddProject &&
            <AddEditProject 
            onDismiss={() => setShowAddProject(false)}
            onProjectSaved={(newProject) => {
                setProjects([...projects, newProject])
                setShowAddProject(false)}}
            />
        }
        </>
    )
}

export default ProjectsPageLoggedIn