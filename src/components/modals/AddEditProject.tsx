import { Button, Form, Modal } from "react-bootstrap"
import { Project } from "../../models/projectModel";
import { ProjectInput } from "../../network/api";
import { useForm } from "react-hook-form";
import * as ProjectsApi from "../../network/api"
import TextInputField from "../form/TextInputField";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; 
import { useState } from "react";

interface AddEditProjectProps {
    projectToEdit?: Project,
    onDismiss: () => void
    onProjectSaved: (project: Project) => void;
}

export const AddEditProject = ({projectToEdit, onDismiss, onProjectSaved}: AddEditProjectProps) => {
    const {register, handleSubmit, formState: {errors, isSubmitting}, setValue} = useForm<ProjectInput>({
        defaultValues: {
            title: projectToEdit?.title || "",
            text: projectToEdit?.text || "",
            requiredBy: projectToEdit?.requiredBy 
            ? new Date(projectToEdit?.requiredBy).toISOString() 
            : "", 
            completed: projectToEdit?.completed
        }
    })

    const [selectedDate, setSelectedDate] = useState(projectToEdit?.requiredBy ? new Date(projectToEdit?.requiredBy) : null); 

    const handleDateChange = (date: Date | null) => {
        setSelectedDate(date);
        setValue('requiredBy', date ? date.toISOString() : ""); 
    };

    async function onSubmit(input:ProjectInput) {
        try{
            let projectReponse: Project;
            if(projectToEdit){
                projectReponse = await ProjectsApi.updateProject(projectToEdit._id, input)
            } else {
                projectReponse = await ProjectsApi.createProject(input)
            }
            onProjectSaved(projectReponse)
        } catch (error){
            console.error(error);
            alert(error)
        }
        
    }
    return (
        <Modal show onHide={onDismiss}>
            <Modal.Header closeButton>
                <Modal.Title>
                    {projectToEdit ? "Edit Project" : "Add Project"}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form id="addEditProject" onSubmit={handleSubmit(onSubmit)}>
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
                    label="Project Details"
                    as="textarea"
                    rows={3}
                    placeholder="Project Details"
                    register={register}
                    registerOptions={{ required: "Details required"}}
                    error={errors.title}
                    />
                    <Form.Group controlId="requiredBy"> 
                    <Form.Label>Required By </Form.Label>
                    <br/>
                    <DatePicker 
                        selected={selectedDate} 
                        onChange={handleDateChange} 
                        showTimeSelect 
                        timeFormat="HH:mm" 
                        timeIntervals={15} 
                        dateFormat="dd-MM-yyyy HH:mm" 
                    />
                    {errors.requiredBy && <Form.Text className="text-muted">{errors.requiredBy?.message}</Form.Text>}
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button
                type="submit"
                form="addEditProject"
                disabled={isSubmitting}>
                    Submit
                </Button>
            </Modal.Footer>
        </Modal>
    )

}

