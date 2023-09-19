import './style.scss'
import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Tooltip } from '@mui/material';
import { Link } from 'react-router-dom';

export default function HomeProductCard(props) {
    return (
        <Link to={`/productDetails/${props._id}`} style={{ width: props.wdth, height: props.hgth, padding:'0px',margin: "15px", textDecoration: 'none' }}>
            <Card className="cards" sx={{ width: 300, height: 510 }}>
                <Tooltip title='Quick View'>
                    <CardActionArea sx={{ justifyContent: 'center', textAlign: 'center', color: 'white' }}>
                        <CardMedia
                            className='cardMedias'
                            component="img"
                            height='410'
                            image={`/uploads/${props.image}`}
                            alt={props.title}
                            sx={{ backgroundColor: '#C4D7E0' }}
                        />
                        <CardContent sx={{ padding: 1, margin: '10px 0px' }}>
                            <Typography gutterBottom sx={{ color: 'black' }} variant="p" fontFamily={"Poppins"} fontWeight={600}>
                                {props.title}
                            </Typography>

                            <Typography gutterBottom sx={{ color: 'black' }} variant="body1" fontFamily={"Poppins"} fontWeight={300}>
                                {`$${props.price} `}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Tooltip>
            </Card >
        </Link>
    );
}