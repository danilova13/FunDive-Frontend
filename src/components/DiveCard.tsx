import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import type { Dive } from '../pages/MyDives';

type DiveCardProps = {
    dive: Dive,
    onDelete: (id: number) => void; 
}

const DiveCard: React.FC<DiveCardProps> = ({dive: {id, name, location, duration, description, date, userId}, onDelete}) => {

    return (
        <Card sx={{ minWidth: 275 }}>
            <CardContent>
                <Typography variant="h5" component="div">
                    {name}
                </Typography>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    {"Date: " + new Date(date).toLocaleDateString()}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {location}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {duration + ' min'}
                </Typography>
                <Typography variant="body2">
                    {description}
                </Typography>
            </CardContent>
            <CardActions>
                <Button 
                    size="small" 
                    onClick={() => onDelete(id)}
                >
                    Delete Dive
                </Button>
            </CardActions>
        </Card>
    );
}

export default DiveCard;