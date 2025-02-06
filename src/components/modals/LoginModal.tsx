import { useForm } from "react-hook-form"
import { User } from "../../models/userModel"
import { LoginCredentials} from "../../network/api"
import * as TaskApi from "../../network/api"
import { Alert, Button, Form, Modal } from "react-bootstrap"
import TextInputField from "../form/TextInputField"
import stylesUtils from "../../styles/utils.module.css";
import { useState } from "react"
import { UnauthorisedError } from "../../errors/http_errors"
import { MdOutlineLock } from "react-icons/md";

interface LoginModalProps {
    onDismiss: () => void,
    onLoginSuccess: (user: User) => void
}

const LoginModal = ({onDismiss, onLoginSuccess}: LoginModalProps) => {
    const [errorText, setErrorText] = useState<string| null>(null)

    const { register, handleSubmit, formState: { errors, isSubmitting }} = useForm<LoginCredentials>();

    async function onSubmit(credentials:LoginCredentials) {
        try {
            const user = await TaskApi.login(credentials);
            onLoginSuccess(user)
        } catch (error) {
            if(error instanceof UnauthorisedError) {
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
                <MdOutlineLock/> Log In
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
                    Log In
                </Button>
            </Form>
        </Modal.Body>
    </Modal>
    )
}

export default LoginModal