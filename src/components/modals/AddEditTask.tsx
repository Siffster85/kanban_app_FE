import { Button, Form, Modal } from "react-bootstrap"
import { Task } from "../../models/taskModel";
import { TaskInput } from "../../network/api";
import { useForm } from "react-hook-form";
import * as TasksApi from "../../network/api"
import TextInputField from "../form/TextInputField";
import { useState } from 'react';


interface AddEditTaskProps {
    projectId: string,
    taskToEdit?: Task,
    onDismiss: () => void
    onTaskSaved: (task: Task) => void;
}

export const AddEditTask = ({projectId, taskToEdit, onDismiss, onTaskSaved}: AddEditTaskProps) => {
    
    const {register, handleSubmit, formState: {errors, isSubmitting}} = useForm<TaskInput>({
        defaultValues: {
            projectId,
            title: taskToEdit?.title || "",
            text: taskToEdit?.text || "",
        }
    })

    const [completed, setCompleted] = useState(taskToEdit?.completed || false);

    async function onSubmit(input:TaskInput) {
        
        try{
            let taskReponse: Task;
            if(taskToEdit){
                taskReponse = await TasksApi.updateTask(taskToEdit._id, { ...input, completed})
            } else {
                taskReponse = await TasksApi.createTask({ ...input, completed})
            }
            onTaskSaved(taskReponse)
        } catch (error){
            console.error(error);
            alert(error)
        }
        
    }
    return (
        <Modal show onHide={onDismiss}>
            <Modal.Header closeButton>
                <Modal.Title>
                    {taskToEdit ? "Edit Note" : "Add Task"}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form id="addEditTask" onSubmit={handleSubmit(onSubmit)}>
                    <TextInputField
                    name="title"
                    label="Title"
                    type="title"
                    placeholder="Title"
                    register={register}
                    registerOptions={{required: "Required"}}
                    error={errors.title}
                    />
                    
                    <TextInputField
                    name="text"
                    label="Task Details"
                    as="textarea"
                    rows={3}
                    placeholder="Task Details"
                    register={register}
                    registerOptions={{ required: "Details required"}}
                    error={errors.title}
                    />
                    {taskToEdit ? 
                    <Form.Check
                    type="checkbox"
                    label="Completed"
                    checked={completed} 
                    onChange={() => setCompleted(!completed)}
                    style={{ fontSize: '1.05rem', float: 'right' }}
                    /> : null}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button
                type="submit"
                form="addEditTask"
                disabled={isSubmitting}>
                    Submit
                </Button>
            </Modal.Footer>
        </Modal>
    )

}

