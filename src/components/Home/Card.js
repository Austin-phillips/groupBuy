import React from 'react';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Countdown from 'react-countdown-now';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
  card: {
    width: 350,
  },
  media: {
    height: 180,
  },
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  table: {
    width: 150,
  },
}));

function ProductCard(props) {
  const classes = useStyles();
  const { id, name, image1, companyName, price, count, personLimit, timer, timeStamp, tierOne, tierTwo, tierThree } = props.product;

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

  const displayDiscount = () => {
    const first = Math.round(personLimit * .33);
    const second = Math.round(personLimit * .66);
    if (count < first) {
      return (
        <div>
          <Paper id='active'>
            <div id='discountContainer'>
              <span id='discountPrice'>${(price * tierOne).toFixed(2)}</span>
            </div>
            <div id='discountContainer'>
              <span id='discountPercent'>{100 - (tierOne * 100)}% off</span>
            </div>
            <div id='discountContainer'>
              <span id='discountRemaining'>Current Discount</span>
            </div>
          </Paper>
          <Paper id='paper'>
            <div id='discountContainer'>
              <span id='discountPrice'>${(price * tierTwo).toFixed(2)}</span>
            </div>
            <div id='discountContainer'>
              <span id='discountPercent'>{100 - (tierTwo * 100)}% off</span>
            </div>
            <div id='discountContainer'>
              <span id='discountRemaining'>{first - count} {first - count > 1 ? 'members' : 'member'} needed</span>
            </div>
          </Paper>
          <Paper id='paper'>
            <div id='discountContainer'>
              <span id='discountPrice'>${(price * tierThree).toFixed(2)}</span>
            </div>
            <div id='discountContainer'>
              <span id='discountPercent'>{100 - (tierThree * 100)}% off</span>
            </div>
            <div id='discountContainer'>
              <span id='discountRemaining'>{second - count} {second - count > 1 ? 'members' : 'member'} needed</span>
            </div>
          </Paper>
        </div>
      )
    } else if (count < second) {
      return (
        <div>
          <Paper id='paper'>
            <div id='discountContainer'>
              <span id='discountPrice'>${(price * tierOne).toFixed(2)}</span>
            </div>
            <div id='discountContainer'>
              <span id='discountPercent'>{100 - (tierOne * 100)}% off</span>
            </div>
            <div id='discountContainer'>
              <span id='discountRemaining'>Done</span>
            </div>
          </Paper>
          <Paper id='active'>
            <div id='discountContainer'>
              <span id='discountPrice'>${(price * tierTwo).toFixed(2)}</span>
            </div>
            <div id='discountContainer'>
              <span id='discountPercent'>{100 - (tierTwo * 100)}% off</span>
            </div>
            <div id='discountContainer'>
              <span id='discountRemaining'>Current Discount</span>
            </div>
          </Paper>
          <Paper id='paper'>
            <div id='discountContainer'>
              <span id='discountPrice'>${(price * tierThree).toFixed(2)}</span>
            </div>
            <div id='discountContainer'>
              <span id='discountPercent'>{100 - (tierThree * 100)}% off</span>
            </div>
            <div id='discountContainer'>
              <span id='discountRemaining'>{second - count} {second - count > 1 ? 'members' : 'member'} needed</span>
            </div>
          </Paper>
        </div>
      )
    } else {
      return (
        <div>
          <Paper id='paper'>
            <div id='discountContainer'>
              <span id='discountPrice'>${(price * tierOne).toFixed(2)}</span>
            </div>
            <div id='discountContainer'>
              <span id='discountPercent'>{100 - (tierOne * 100)}% off</span>
            </div>
            <div id='discountContainer'>
              <span id='discountRemaining'>Done</span>
            </div>
          </Paper>
          <Paper id='paper'>
            <div id='discountContainer'>
              <span id='discountPrice'>${(price * tierTwo).toFixed(2)}</span>
            </div>
            <div id='discountContainer'>
              <span id='discountPercent'>{100 - (tierTwo * 100)}% off</span>
            </div>
            <div id='discountContainer'>
              <span id='discountRemaining'>Done</span>
            </div>
          </Paper>
          <Paper id='active'>
            <div id='discountContainer'>
              <span id='discountPrice'>${(price * tierThree).toFixed(2)}</span>
            </div>
            <div id='discountContainer'>
              <span id='discountPercent'>{100 - (tierThree * 100)}% off</span>
            </div>
            <div id='discountContainer'>
              <span id='discountRemaining'>Current Discount</span>
            </div>
          </Paper>
        </div>
      )
    }
  }

  return (
    <Card className={classes.card} id='card' key={id}>
      <CardMedia
        className={classes.media}
        image={image1}
        title="Contemplative Reptile"
      />
      <CardContent>
        <div id='left'>
          <Typography gutterBottom variant="h6" component="h2">
            {name.charAt(0).toUpperCase() + name.slice(1)}
          </Typography>
          <Typography gutterBottom variant="body1" component="p">
            By: {companyName}
          </Typography>
          <Typography id='price' variant="h6" component="h2">
            ${price.toFixed(2)}
          </Typography>
          <Button id='joinButton'>Join Paq</Button>
        </div>
        <div id='right'>
          {displayDiscount()}
          <Typography align='center' variant="body2" component="p">
            Paq Members Joined: {count}/{personLimit}
          </Typography>
        </div>
        <div id='countdown'>
          <Countdown date={Date.parse(timeStamp) + (timer * 24 * 60 * 60 * 1000)} renderer={renderer} />
        </div>
      </CardContent>
    </Card>
  )
}

export default ProductCard;