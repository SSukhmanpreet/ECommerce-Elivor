import './style.scss'
import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { Link } from 'react-router-dom';

export default function CategoryCard(props) {
    return (
        <Link className='catCard' to={`/productsList/byCategory/${props.categoryName}`} style={{ width: 300, height: 500, padding: '0px', margin: "15px", textDecoration: 'none' }}>
            <Card className="cardsCat" sx={{ width: 300, height: 500 }}>
                <CardActionArea sx={{ justifyContent: 'center', textAlign: 'center', color: 'white' }}>
                    <CardMedia
                        className='cardMediasCat'
                        component="img"
                        height='500'
                        image={`/uploads/${props.image}`}
                        alt={props.title}
                        sx={{ backgroundColor: '#C4D7E0' }}
                    />
                    <CardContent sx={{ padding: 1 }}>
                        <Typography gutterBottom sx={{ color: 'white', textShadow: "2px 2px #000", position: 'absolute', top: '50%', left: '50%', transform: ' translate(-50%, -50%)', }} variant="h5" fontFamily={"Poppins"} fontWeight={500}>
                            {props.categoryName.toUpperCase()}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card >
        </Link>
    );
}