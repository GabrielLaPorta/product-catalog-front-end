import React from "react";
import { ErrorMessage, Formik, Form, Field } from "formik";
import { Grid } from "@material-ui/core";
import * as yup from 'yup';
import axios from "axios";
import Menu from '../../components/menu';
import { useNavigate } from "react-router-dom";
import './login.css'
import { useState } from "react";


const Login = (props) => {
    const token = localStorage.getItem('app-token')
    let navigate = useNavigate();

    if(token) {
        navigate('/admin/home', {replace: true});
    }
    const handleSubmit = values => {
        axios.post(`${process.env.REACT_APP_API_URL}/login`, values
            ).then((response) => {
                const { data } = response;
                if (data) {
                    localStorage.setItem('app-token', data.token);
                    navigate('/admin/home', {replace: true});
                }
            }).catch((error) => {
                console.log(error)
                setHasError(true);
                setTimeout(()=> setHasError(false), 5000)
            })
    }

    const [hasError, setHasError] = useState(false);

    const validations = yup.object().shape({
        email: yup.string().email('email inválido').required('*campo obrigatório'),
        password: yup.string().min(8, 'mínimo 8 dígitos').required('*campo obrigatório'),
    })
    return (
        <>
            <Menu />
            <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center">
                <h1>Login</h1>
                <Formik 
                    initialValues={{}} 
                    onSubmit={handleSubmit}
                    validationSchema={validations}>
                    <Form className="Form">
                        <div className="Form-Group">
                            <Field
                                name="email" 
                                placeholder="Email"
                                className="Form-Field"/>
                            <ErrorMessage 
                                component="span" 
                                name="email" 
                                className="Form-Error"/>
                        </div>
                        <div className="Form-Group">
                            <Field
                                type="password"
                                placeholder="Senha"
                                name="password" 
                                className="Form-Field"/>
                            <ErrorMessage 
                                component="span" 
                                name="password" 
                                className="Form-Error"/>
                            {hasError && (
                                <span className="Login-Error">Falha de Autenticação</span>
                            )}
                        </div>
                        <button className="Form-Btn" type="submit">
                            Login
                        </button>
                    </Form>
                </Formik>
            </Grid>
        </>
    )
}

export default Login