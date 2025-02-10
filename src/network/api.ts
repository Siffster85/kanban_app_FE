import axios from 'axios';
import { ConflictError, UnauthorisedError } from "../errors/http_errors";
import { Project } from "../models/projectModel";
import { Task } from "../models/taskModel";
import { User } from "../models/userModel";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

async function fetchData(input: string, init?: any) { 
    try {
      const response = await axios(input, { ...init, withCredentials: true });
      return response.data;
    } catch (error: any) { 
        if (axios.isAxiosError(error)) { 
            const errorMessage = error.response?.data?.error || error.message; 
            if (error.response?.status === 401) {
                throw new UnauthorisedError(errorMessage);
            } else if (error.response?.status === 409) {
                throw new ConflictError(errorMessage);
            } else {
                throw Error(`Request failed with status: ${error.response?.status}, ${errorMessage}`);
            }
        } else {
            throw Error(`An unexpected error occurred: ${error.message}`);
        }
    }
}


export async function getLoggedInUser(): Promise<User> {
    return fetchData(`${BACKEND_URL}api/users`, { method: "GET" });
}

export interface SignUpCredentials {
    username: string,
    email: string,
    password: string,
}

export async function signUp(credentials: SignUpCredentials): Promise<User> {
    return fetchData(`${BACKEND_URL}api/users/signup`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        data: credentials
    });
}

export interface LoginCredentials {
    username: string,
    password: string,
}

export async function login(credentials: LoginCredentials): Promise<User> {
    return fetchData(`${BACKEND_URL}api/users/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        data: credentials
    });
}

export async function logout() {
    await fetchData(`${BACKEND_URL}api/users/logout`, { method: "POST" });
}

interface ReturnedProject {
    project: Project,
    projectTasks: Task[],
}

export async function fetchTasks(projectId: string): Promise<ReturnedProject> {
    return fetchData(`${BACKEND_URL}api/projects/${projectId}`, { method: "GET" });
}

export async function fetchProjects(): Promise<Project[]> {
    return fetchData(`${BACKEND_URL}api/projects`, { method: "GET" });
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
    return fetchData(`${BACKEND_URL}api/tasks`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        data: task
    });
}

export async function createProject(project: ProjectInput): Promise<Project> {
    return fetchData(`${BACKEND_URL}api/projects`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        data: project
    });
}

export async function updateTask(taskId: string, task: TaskInput): Promise<Task> {
    return fetchData(`${BACKEND_URL}api/tasks/${taskId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        data: task
    });
}

export async function updateProject(projectId: string, project: ProjectInput): Promise<Project> {
    return fetchData(`${BACKEND_URL}api/projects/${projectId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        data: project
    });
}

export async function deleteTask(taskId: string) {
    await fetchData(`${BACKEND_URL}api/tasks/${taskId}`, { method: "DELETE" });
}

export async function deleteProject(projectId: string) {
    await fetchData(`${BACKEND_URL}api/projects/${projectId}`, { method: "DELETE" });
}