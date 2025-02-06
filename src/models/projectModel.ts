export interface Project {
    _id: string,
    title: string,
    text: string,
    completed: boolean,
    createdAt: string,
    updatedAt: string,
    requiredBy: string,
}