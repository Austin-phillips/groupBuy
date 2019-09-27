import React from 'react';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Countdown from 'react-countdown-now';
import Paper from '@material-ui/core/Paper';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import CheckIcon from '@material-ui/icons/Check';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
  card: {
    width: 330,
    height: 450
  },
  media: {
    height: 180,
  },
  root: {
    flexGrow: 1,
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
              <span id='discountPrice'>${Math.round((price * tierOne))}</span>
            </div>
            {/* <div id='discountContainer'>
              <span id='discountPercent'>{100 - (tierOne * 100)}% off</span>
            </div> */}
            <div id='discountContainer'>
              <span id='discountRemaining'>Current Paq Price</span>
            </div>
          </Paper>
          <Paper id='paper'>
            <div id='discountContainer'>
              <span id='discountPrice'>${Math.round((price * tierTwo))}</span>
            </div>
            {/* <div id='discountContainer'>
              <span id='discountPercent'>{100 - (tierTwo * 100)}% off</span>
            </div> */}
            <div id='discountContainer'>
              <span id='discountRemaining'>{first - count} {first - count > 1 ? 'members' : 'member'} needed</span>
            </div>
          </Paper>
          <Paper id='paper'>
            <div id='discountContainer'>
              <span id='discountPrice'>${Math.round((price * tierThree))}</span>
            </div>
            {/* <div id='discountContainer'>
              <span id='discountPercent'>{100 - (tierThree * 100)}% off</span>
            </div> */}
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
              <span id='discountPrice'>${Math.round((price * tierOne))}</span>
            </div>
            {/* <div id='discountContainer'>
              <span id='discountPercent'>{100 - (tierOne * 100)}% off</span>
            </div> */}
            <div id='discountContainer'>
              <span id='discountRemaining'><ListItemIcon><CheckIcon /></ListItemIcon></span>
            </div>
          </Paper>
          <Paper id='active'>
            <div id='discountContainer'>
              <span id='discountPrice'>${Math.round((price * tierTwo))}</span>
            </div>
            {/* <div id='discountContainer'>
              <span id='discountPercent'>{100 - (tierTwo * 100)}% off</span>
            </div> */}
            <div id='discountContainer'>
              <span id='discountRemaining'>Current Discount</span>
            </div>
          </Paper>
          <Paper id='paper'>
            <div id='discountContainer'>
              <span id='discountPrice'>${Math.round((price * tierThree))}</span>
            </div>
            {/* <div id='discountContainer'>
              <span id='discountPercent'>{100 - (tierThree * 100)}% off</span>
            </div> */}
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
              <span id='discountPrice'>${Math.round((price * tierOne))}</span>
            </div>
            {/* <div id='discountContainer'>
              <span id='discountPercent'>{100 - (tierOne * 100)}% off</span>
            </div> */}
            <div id='discountContainer'>
              <span id='discountRemaining'><ListItemIcon><CheckIcon /></ListItemIcon></span>
            </div>
          </Paper>
          <Paper id='paper'>
            <div id='discountContainer'>
              <span id='discountPrice'>${Math.round((price * tierTwo))}</span>
            </div>
            {/* <div id='discountContainer'>
              <span id='discountPercent'>{100 - (tierTwo * 100)}% off</span>
            </div> */}
            <div id='discountContainer'>
              <span id='discountRemaining'><ListItemIcon><CheckIcon /></ListItemIcon></span>
            </div>
          </Paper>
          <Paper id='active'>
            <div id='discountContainer'>
              <span id='discountPrice'>${Math.round((price * tierThree))}</span>
            </div>
            {/* <div id='discountContainer'>
              <span id='discountPercent'>{100 - (tierThree * 100)}% off</span>
            </div> */}
            <div id='discountContainer'>
              <span id='discountRemaining'>Current Discount</span>
            </div>
          </Paper>
        </div>
      )
    }
  }

  return (
    <Grid item sm={12} md={6} lg={4} xl={3}>
      <Card className={classes.card} id='card' key={id}>
        <CardMedia
          className={classes.media}
          image={image1}
          title="Contemplative Reptile"
        />
        <CardContent>
          <div id='left'>
            <Typography id='text' gutterBottom variant="h6" component="h2">
              {name.charAt(0).toUpperCase() + name.slice(1)}
            </Typography>
            <Typography id='text' gutterBottom variant="body1" component="p">
              By: {companyName}
            </Typography>
            <Typography id='text' id='price' variant="h6" component="h2">
              ${price.toFixed(2)}
            </Typography>
            <Button id='joinButton'>Join Paq</Button>
          </div>
          <div id='right'>
            {displayDiscount()}
            <Typography id='joinedText' align='center' variant="body2" component="p">
              Paq Members Joined: {count}/{personLimit}
            </Typography>
          </div>
          <div id='countdown'>
            <Countdown date={Date.parse(timeStamp) + (timer * 24 * 60 * 60 * 1000)} renderer={renderer} />
          </div>
        </CardContent>
      </Card>

    </Grid>
  )
}

export default ProductCard;