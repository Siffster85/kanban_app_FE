import { ConflictError, UnauthorisedError } from "../errors/http_errors";
import { Project } from "../models/projectModel";
import { Task } from "../models/taskModel";
import { User } from "../models/userModel";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL 

async function fetchData(input: RequestInfo, init?: RequestInit) {
    const response = await fetch(input, { ...init, credentials: 'include' });
    if (response.ok) {
        return response;
    } else {
        const errorBody = await response.json();
        const errorMessage = errorBody.error;
        if(response.status === 401) {
            throw new UnauthorisedError(errorMessage)
        } else if (response.status === 409) {
            throw new ConflictError(errorMessage)
        } else 
        throw Error(`Request failed with status: ${response.status}, ${errorMessage}`);
    }
}

export async function getLoggedInUser(): Promise<User> {
    const response = await fetchData(`${BACKEND_URL}api/users`, {method: "GET"});
    return response.json();
}

export interface SignUpCredentials{
    username: string,
    email: string,
    password: string,
}

export async function signUp(credentials: SignUpCredentials): Promise<User> {
    const response = await fetchData(`${BACKEND_URL}api/users/signup`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials)
    });
    return response.json();
}

export interface LoginCredentials{
    username: string,
    password: string,
}

export async function login(credentials: LoginCredentials): Promise<User> {
    const response = await fetchData(`${BACKEND_URL}api/users/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials)
    });
    return response.json();
}

export async function logout() {
    await fetchData(`${BACKEND_URL}api/users/logout`, {method: "POST"})
}

interface ReturnedProject {
    project: Project,
    projectTasks: Task[],
}

export async function fetchTasks(projectId: string): Promise<ReturnedProject> {
    const response = await fetchData(`${BACKEND_URL}api/projects/${projectId}`, {method: "GET"});
    return response.json();
}

export async function fetchProjects(): Promise<Project[]> {
    const response = await fetchData(`${BACKEND_URL}api/projects`, {method: "GET"});
    return response.json();
}

export interface TaskInput {
    projectId: string,
    title: string,
    text: string,
    completed: boolean,
}

export interface ProjectInput {
    title: string,
    text: string,
    requiredBy: string,
    completed: boolean,
}

export async function createTask(task: TaskInput): Promise<Task> {
    const response = await fetchData(`${BACKEND_URL}api/tasks`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(task)
    });
    return response.json();
}

export async function createProject(project: ProjectInput): Promise<Project> {
    const response = await fetchData(`${BACKEND_URL}api/projects`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(project)
    });
    return response.json();
}

export async function updateTask(taskId: string, task: TaskInput): Promise<Task> {
    const response = await fetchData(`${BACKEND_URL}api/tasks/${taskId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(task)
    });
    return response.json();
}

export async function updateProject(projectId: string, project: ProjectInput): Promise<Project> {
    const response = await fetchData(`${BACKEND_URL}api/projects/${projectId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(project)
    });
    return response.json();
}

export async function deleteTask(taskId:string) {
    await fetchData(`${BACKEND_URL}api/tasks/${taskId}`, { method: "DELETE" });
}

export async function deleteProject(projectId:string) {
    await fetchData(`${BACKEND_URL}api/projects/${projectId}`, { method: "DELETE" });
}
