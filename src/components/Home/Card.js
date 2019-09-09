import React, { useEffect } from 'react';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Countdown from 'react-countdown-now';

const useStyles = makeStyles({
  card: {
    width: 400,
  },
  media: {
    height: 180,
  },
});

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
          <div id='active'>
            <div id='discountPrice'>
              <p1 id='discountText'>${(price * tierOne).toFixed(2)}</p1>
            </div>
            <div id='discountPercent'>
              <p1 id='discountText'>{100 - (tierOne * 100)}% off retail</p1>
            </div>
            <div id='discountRemaining'>
              <p1 id='discountText'>Current Discount</p1>
            </div>
          </div>
          <div id='discountContainer'>
            <div id='discountPrice'>
              <p1 id='discountText'>${(price * tierTwo).toFixed(2)}</p1>
            </div>
            <div id='discountPercent'>
              <p1 id='discountText'>{100 - (tierTwo * 100)}% off retail</p1>
            </div>
            <div id='discountRemaining'>
              <p1 id='discountText'>{first - count} until next discount</p1>
            </div>
          </div>
          <div id='discountContainer'>
            <p1>${(price * tierThree).toFixed(2)}</p1>
          </div>
        </div>
      )
    } else if (count < second) {
      return (
        <div>
          <div id='discountContainer'>
            <p1>${(price * tierOne).toFixed(2)}</p1>
          </div>
          <div id='active'>
            <p1>${(price * tierTwo).toFixed(2)}</p1>
          </div>
          <div id='discountContainer'>
            <p1>${(price * tierThree).toFixed(2)}</p1>
          </div>
        </div>
      )
    } else {
      return (
        <div>
          <div id='discountContainer'>
            <p1>${(price * tierOne).toFixed(2)}</p1>
          </div>
          <div id='discountContainer'>
            <p1>${(price * tierTwo).toFixed(2)}</p1>
          </div>
          <div id='active'>
            <p1>${(price * tierThree).toFixed(2)}</p1>
          </div>
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
      <CardContent id='content'>
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
          <div id='joinedContainer'>
            <Typography align='center' variant="body2" component="p">
              Paq Members Joined: {count}/{personLimit}
            </Typography>
          </div>
        </div>
        <div id='countdown'>
          <Countdown date={Date.parse(timeStamp) + (timer * 24 * 60 * 60 * 1000)} renderer={renderer} />
        </div>
      </CardContent>
    </Card>
  )
}

export default ProductCard;