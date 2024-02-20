import React from 'react';
import { 
    useState 
} from 'react';
import useAuth from '../utility/useAuth';
import { useForm } from "../utility/hooks";
import { useMutation } from '@apollo/client';
import { gql } from 'graphql-tag';
import { useNavigate } from 'react-router-dom';
import { GraphQLError } from 'graphql';
import { 
    TextField,
    Button,
    Avatar,
    Stack,
    Alert,
    Grid, 
    Paper,
    Container
} from "@mui/material";
import * as colors from '@mui/material/colors';
import LockTwoToneIcon from '@mui/icons-material/LockTwoTone';

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
    const context = useAuth();
    const [ errors, setErrors ] = useState<GraphQLError[]>([]);

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

    function loginUserCallback() {
        loginUser();
    }

    const paperStyle={
        padding: 20, 
        height: '70vh', 
        width: 300,
        margin: '20px auto'
    }
    return (
        <Container maxWidth="sm">
            <Paper elevation={10} style={paperStyle}>
                <Grid container direction="column" justifyContent="center" alignItems="center">
                    <Avatar sx={{ bgcolor: colors.pink[400]}}>
                        <LockTwoToneIcon />
                    </Avatar>
                    <h2>Sign In</h2>
                </Grid>
                <Stack spacing={3} paddingBottom={4}>
                    <TextField 
                        label="Email"
                        name="email"
                        onChange={onChange}
                    />
                    <TextField 
                        label="Password"
                        name="password"
                        type="password"
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
                <Grid container direction="column" justifyContent="center" alignItems="center">
                    <Button type='submit' variant="contained" onClick={onSubmit} fullWidth>
                        Submit
                    </Button>
                </Grid>
            </Paper>
        </Container>
       
    );
};

export default Login;