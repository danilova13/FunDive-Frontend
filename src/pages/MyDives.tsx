import React, { useEffect, useState } from 'react';
import { 
    Button,
    Grid, 
    Container
} from "@mui/material";
import { useNavigate } from 'react-router-dom';
import * as colors from '@mui/material/colors';
import DiveCard from '../components/DiveCard';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useMutation } from '@apollo/client';

export type Dive = {
    id: number,
    name: string,
    date: string,
    description: string,
    duration: number,
    location: string,
    userId: number
}
const FETCH_DIVES_QUERY = gql`
    query getDivesByUserId(
        $userId: Int!,
        $limit: Int!,
        $offset: Int!
    ) {
        getDivesByUserId(
            userId: $userId, 
            limit: $limit, 
            offset: $offset
        ) {
            name 
            date 
            location
            description
            duration
            id
        }
    }
`
const DELETE_DIVE = gql`
    mutation DeleteDive (
        $id: Int!
    ) {
        deleteDiveById(id: $id)
    }
`
const MyDives = () => {

    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const onSubmit = () => {
        navigate('/diveform');
    }


    const [ deleteDive ] = useMutation(DELETE_DIVE);

    const {
        loading: loadingFetchDives,
        error,
        data,
    } = useQuery(FETCH_DIVES_QUERY, {
        variables: {
            userId: user!.userId,
            limit: 10,
            offset: 0
        }
    });

    const [ dives, setDives ] = useState<Dive[]>([]);

    useEffect(() => {
        if(!loadingFetchDives && data){
            setDives(data.getDivesByUserId);
        }
    }, [loadingFetchDives, data])

    if(loadingFetchDives) {
        return<h1>Loading dives...</h1>
    }

    const onDelete = (id: number) => {
        deleteDive({ variables: { id }});
        setDives(dives.filter((dive) => id !== dive.id))
    }


    return (
        <Container>
              <Button 
                type='submit' 
                variant="contained"
                sx={{backgroundColor: colors.blue[900], margin: "20px"}}
                onClick={onSubmit}
            > 
                Add Dive
            </Button>

            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <h1>My Dives</h1>
                </Grid>

                { dives && dives.map((dive: Dive) => (
                    <Grid key={dive.id} item xs={12} sm={6} md={4}>
                        <DiveCard dive={dive} onDelete={onDelete}/>
                    </Grid>
                ))}     
        </Grid>
        </Container>
     
    );
};

export default MyDives;
