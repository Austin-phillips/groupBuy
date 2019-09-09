import React, { useEffect } from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import { makeStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Countdown from 'react-countdown-now';

const useStyles = makeStyles({
  card: {
    width: 300,
  },
  media: {
    height: 180,
  },
});

function ProductCard(props) {
  const classes = useStyles();
  const { id, name, image1, companyName, price, count, personLimit, timer, timeStamp, } = props.product;

  const Completionist = () => <span>Times Up!</span>;

  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      return <Completionist />
    } else {
      const singleDay = days.toString().length === 1;
      const singleHour = hours.toString().length === 1;
      const singleMinute = minutes.toString().length === 1;
      const singleSecond = seconds.toString().length === 1;

      return <span>{singleDay ? "0" + days : days}:{singleHour ? "0" + hours : hours}:{singleMinute ? "0" + minutes : minutes}:{singleSecond ? "0" + seconds : seconds}</span>
    }
  }

  return (
    <Card className={classes.card} id='card' key={id}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={image1}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="h2">
            {name.charAt(0).toUpperCase() + name.slice(1)}
          </Typography>
          <Typography gutterBottom variant="h6" component="h2">
            By: {companyName}
          </Typography>
          <Typography variant="body2" component="p">
            ${price.toFixed(2)}
          </Typography>
          <div id='joinedContainer'>
            <Typography align='center' variant="body2" component="p">
              Paq Members Joined: {count}/{personLimit}
            </Typography>
          </div>
          <div id='countdown'>
            <Countdown date={Date.parse(timeStamp) + (timer * 24 * 60 * 60 * 1000)} renderer={renderer} />
          </div>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default ProductCard;