import React from "react";
import { 
    TextField,
    Button,
    Stack,
    Container
} from "@mui/material";
import * as colors from '@mui/material/colors';
import { gql } from 'graphql-tag';
import { useMutation } from '@apollo/client';
import { useForm } from "../utility/hooks";
import { useNavigate } from 'react-router-dom';


const CREATE_DIVE = gql`
    mutation CreateDive (
        $name: String!
        $date: String!
        $description: String!
        $duration: Int!
        $location: String!
    ) {
        createDive(
            name: $name, 
            date: $date, 
            description: $description, 
            duration: $duration, 
            location: $location
        ) {
            name 
            date
            location
            duration
            description
          }
    }
`
type DiveFormValues = {
    name: string;
    date: string;
    location: string;
    duration: number; 
    description: string;
}
const DiveForm = () => {
    let navigate = useNavigate();

    const { onChange, onSubmit, values, setValues } = useForm<DiveFormValues>(createDiveCallback, {
        name: '',
        date: '',
        location: '',
        duration: 0,
        description: ''
    } as DiveFormValues);

    const [ createDive ] = useMutation(CREATE_DIVE, {
        update() {
            setValues({
                name: '',
                date: '',
                location: '',
                duration: 0,
                description: ''
            });
        },
        variables: {
            ...values,
            // @ts-ignore
            duration: parseInt(values.duration, 10)
        }
    });

   function createDiveCallback(){
        createDive();
        navigate('/');
    }

    return (
        <Container maxWidth="sm">
           <Stack spacing={3} paddingBottom={4} paddingTop={5}>
                <TextField 
                    label="Dive Name"
                    value={values.name}
                    name="name"
                    variant="filled"
                    sx={{ 
                        '& .MuiFilledInput-root': {
                            backgroundColor: colors.amber[50],
                        }
                    }}
                    onChange={(onChange)}
                />
                <TextField 
                    label="Date"
                    value={values.date}
                    type="date"
                    name="date"
                    variant="filled"
                    sx={{ 
                        '& .MuiFilledInput-root': {
                            backgroundColor: colors.amber[50],
                            color: "gray"
                        }
                    }}
                    onChange={onChange}
                />
                <TextField 
                    label="Location"
                    value={values.location}
                    name="location"
                    variant="filled"
                    sx={{ 
                        '& .MuiFilledInput-root': {
                            backgroundColor: colors.amber[50],
                        }
                    }}
                    onChange={onChange}
                />
                <TextField 
                    label="Duration"
                    value={values.duration}
                    name="duration"
                    type="number"
                    variant="filled"
                    sx={{ 
                        '& .MuiFilledInput-root': {
                            backgroundColor: colors.amber[50],
                        }
                    }}
                    onChange={onChange}
                />
                <TextField 
                    label="Description"
                    value={values.description}
                    name="description"
                    variant="filled"
                    sx={{ 
                        '& .MuiFilledInput-root': {
                            backgroundColor: colors.amber[50],
                        }
                    }}
                    multiline
                    rows={5}
                    onChange={onChange}
                />
                <Button 
                    variant="text" 
                    type="submit"
                    onClick={onSubmit}
                    sx={{backgroundColor: colors.blue[900], color: "lightgray"}}
                >
                    Add Dive
                </Button>
           </Stack>
        </Container>
    );

}; 

export default DiveForm;