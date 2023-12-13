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

// GraphQL mutation for logging in user
const LOGIN_USER = gql`
    mutation LoginUser(
        $email: String!,
        $password: String!
    ) {
        loginUser(
            email: $email,
            password: $password
        ) {
            user {
                email
            }

            auth {
                jwtToken
            }
        }
    }
`

const Login = () => {

    const navigate = useNavigate();
    const context = useContext(AuthContext);
    const [ errors, setErrors ] = useState<GraphQLError[]>([]);

    function loginUserCallback() {
        console.log('Callback works!');
        loginUser();
    }

   const { onChange, onSubmit, values } = useForm(loginUserCallback, {
        email: '',
        password: ''
   });

   const [ loginUser ] = useMutation(LOGIN_USER, {
        // function to be executed if mutation is successful
        update(proxy, { data: { loginUser: userData }}) {
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
        <h3>Login</h3>
        <p>This is the login page, login below!</p>
        <Stack spacing={2} paddingBottom={2}>
            <TextField 
                label="Email"
                name="email"
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

export default Login;