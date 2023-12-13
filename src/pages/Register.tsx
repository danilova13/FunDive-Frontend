import React from 'react';
import { 
    useContext, 
    useState 
} from 'react';
import { AuthContext } from '../context/AuthContext';
import { useForm } from "../utility/hooks";
import { useMutation } from '@apollo/client';
import { gql } from 'graphql-tag';
import { useNavigate } from 'react-router-dom';
import { GraphQLError } from 'graphql';
import { 
    TextField,
    Button,
    Container,
    Stack,
    Alert
} from "@mui/material";

// GraphQL mutation for creating a new user
const REGISTER_USER = gql`
    mutation CreateUser(
        $email: String!, 
        $firstName: String!,
        $lastName: String!,
        $phone: String!,
        $password: String!
    ) {
        createUser(
            email: $email, 
            firstName: $firstName, 
            lastName: $lastName, 
            phone: $phone, 
            password: $password
        ) {
            user {
                firstName
                lastName
                email
                phone
            }

            auth {
                jwtToken
            } 
        }
    }
`

const Register = () => {
    // define and access the authentication context -> allows us to use all the functions in authContext
    const context = useContext(AuthContext);
    // hook for navigation
    const navigate = useNavigate();
    // state for storing errors coming from the GraphQL server
    const [ errors, setErrors ] = useState<GraphQLError[]>([]);

    // callback function to be executed when the form is submitted
    function createUserCallback() {
        console.log("Callback works!")
          // call registerUser function to execute createUser mutation
        registerUser();
    }

    // custom hook for form handling 
    const { onChange, onSubmit, values } = useForm(createUserCallback, {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: ''
    });

    // Apollo mutation hook
    const [ registerUser ] = useMutation(REGISTER_USER, {
        // function to be executed if mutation is successful
        update(proxy, { data: { createUser: userData }}) {
            // log the user in 
            context.login(userData);
            // navigate to the home page when user gets logged in 
            navigate('/');
        },
        onError(error) {
            setErrors([...error.graphQLErrors]);
        },
        // variables for the mutation 
        variables: values
    });
    
    return (
        <Container maxWidth="sm">
            <h3>Register</h3>
            <p>This is the registration page, register below to create an account!</p>
            <Stack spacing={2} paddingBottom={2}>
                <TextField 
                    label="First name"
                    name="firstName"
                    onChange={onChange}
                />
                <TextField 
                    label="Last Name"
                    name="lastName"
                    onChange={onChange}
                />
                <TextField 
                    label="Email"
                    name="email"
                    onChange={onChange}
                />
                <TextField 
                    label="Phone"
                    name="phone"
                    onChange={onChange}
                />
                <TextField 
                    label="Password"
                    name="password"
                    onChange={onChange}
                />
            </Stack>
            {errors.map(function(error){
                return(
                    <Alert severity='error'>
                        {error.message}
                    </Alert>
                )
            })}
            <Button variant="contained" onClick={onSubmit}>
                Submit
            </Button>
        </Container>
    );
};

export default Register;
