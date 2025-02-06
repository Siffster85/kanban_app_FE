import { useForm } from "react-hook-form"
import { User } from "../../models/userModel"
import { SignUpCredentials } from "../../network/api"
import * as TaskApi from "../../network/api"
import { Alert, Button, Form, Modal } from "react-bootstrap"
import TextInputField from "../form/TextInputField"
import stylesUtils from "../../styles/utils.module.css";
import { useState } from "react"
import { ConflictError } from "../../errors/http_errors"
import { MdOutlineAssignment } from "react-icons/md";
import { defaultSeedProject, defaultSeedTasks } from "../../utils/defaultDataSeed"
import { TaskInput } from "../../network/api"

interface SignupModalProps {
    onDismiss: () => void,
    onSignUpSuccess: (user: User) => void
}

const SignUpModal = ({onDismiss, onSignUpSuccess}: SignupModalProps) => {
        const [errorText, setErrorText] = useState<string| null>(null)

    const { register, handleSubmit, formState: { errors, isSubmitting }} = useForm<SignUpCredentials>();

    async function onSubmit(credentials:SignUpCredentials) {
        try {
            const newUser = await TaskApi.signUp(credentials);
            onSignUpSuccess(newUser)
            const defaultProject = await TaskApi.createProject(defaultSeedProject)
            const seedData:TaskInput[] = defaultSeedTasks.map((task) => ({
                ...task,
                projectId: defaultProject._id.toString(),
            }));
            for (const task of seedData) {
                await TaskApi.createTask(task);
            }
            
        }  catch (error) {
            if(error instanceof ConflictError) {
            setErrorText(error.message)
            } else {
                alert(error)
            }
            console.error(error);
        }
    }

    return (
        <Modal show onHide={onDismiss}>
            <Modal.Header closeButton>
                <Modal.Title>
                <MdOutlineAssignment /> Sign Up
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            {errorText &&
            <Alert variant="danger">
                {errorText}
            </Alert>
            }
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <TextInputField
                        name="username"
                        label="Username"
                        type="test"
                        placeholder="Username"
                        register={register}
                        registerOptions={{ required: "Required"}}
                        error={errors.username}
                    />
                    <TextInputField
                        name="email"
                        label="Email"
                        type="email"
                        placeholder="Email"
                        register={register}
                        registerOptions={{ required: "Required"}}
                        error={errors.email}
                    />
                    <TextInputField
                        name="password"
                        label="Password"
                        type="password"
                        placeholder="Password"
                        register={register}
                        registerOptions={{ required: "Required"}}
                        error={errors.password}
                    />
                    <Button
                    type="submit"
                    disabled={isSubmitting}
                    className={stylesUtils.width100}>
                        Sign Up
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    )
}

export default SignUpModal