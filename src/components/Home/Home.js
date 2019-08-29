import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import { getProducts } from '../../actions/products';
import { Link, withRouter } from 'react-router-dom';
import Divider from '@material-ui/core/Divider';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Countdown from 'react-countdown-now';
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles({
  card: {
    width: 345,
  },
  media: {
    height: 180,
  },
});

const ColorLinearProgress = withStyles({
  colorPrimary: {
    backgroundColor: '#A9A9A9',
  },
  barColorPrimary: {
    backgroundColor: '#32CD32',
  },
})(LinearProgress);

function Home(props) {
  const classes = useStyles();

  useEffect(() => {
    function onLoad() {
      const { dispatch } = props;
      dispatch(getProducts())
    }
    onLoad()
  }, [])

  const Completionist = () => <span>Times Up!</span>;

  const renderer = ({days, hours, minutes, seconds, completed}) => {
    if (completed) {
      return <Completionist />
    } else {
      const singleDay = days.toString().length === 1;
      const singleHour = hours.toString().length === 1;
      const singleMinute = minutes.toString().length === 1;
      const singleSecond = seconds.toString().length ===1;

      return <span>{singleDay ? "0" + days : days}:{singleHour ? "0" + hours : hours}:{singleMinute ? "0" + minutes : minutes}:{singleSecond ? "0" + seconds : seconds}</span>
    }
  }

  const discount = (price, limit, count, tierOne, tierTwo, tierThree) => {
    const first = Math.round(limit * .33);
    const second = Math.round(limit * .66);
    const tierOneDiscount = 100 - (tierOne * 100);
    const tierTwoDiscount = 100 - (tierTwo * 100);
    const tierThreeDiscount = 100 - (tierThree * 100);
    if (count < first) {
      return(
        <div>
          <Typography variant="body2" component="p">
            Current Paq Price: ${(price * tierOne).toFixed(2)}
          </Typography>
          <Typography variant="body2" component="p">
            {tierOneDiscount}% Off Retail
          </Typography>
          <Typography variant="body2" component="p">
            {first - count} Members Until {tierTwoDiscount}% Discount
          </Typography>
        </div>
      )
    } else if ( count < second ){
      return (
        <div>
          <Typography variant="body2" component="p">
            Current Paq Price: ${(price * tierTwo).toFixed(2)}
          </Typography>
          <Typography variant="body2" component="p">
            {tierTwoDiscount}% Off Retail
          </Typography>
          <Typography variant="body2" component="p">
            {first - count} Members Until {tierThreeDiscount}% Discount
          </Typography>
        </div>
      )
    } else {
      return (
        <div>
          <Typography variant="body2" component="p">
            Current Paq Price: ${(price * tierThree).toFixed(2)}
          </Typography>
          <Typography variant="body2" component="p">
            {tierThreeDiscount}% Off Retail
          </Typography>
          <Typography variant="body2" component="p">
            Maximum Discount
          </Typography>
        </div>
      )
    }
  }

  const normalise = (value, max) => (value - 0) * 100 / (max - 0)

  const displayProducts = () => {
    const { products } = props;
    return products.map(p => {
      return(
        <Card className={classes.card} id='card' key={p.id}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image={p.image1}
              title="Contemplative Reptile"
            />
            <CardContent>
              <Typography gutterBottom variant="h6" component="h2">
                {p.name.charAt(0).toUpperCase() + p.name.slice(1)}
              </Typography>
              <Typography gutterBottom variant="h6" component="h2">
                By: {p.companyName}
              </Typography>
              <Typography variant="body2" component="p">
                Original Price: ${p.price.toFixed(2)}
              </Typography>
              {discount(p.price, p.personLimit, p.count, p.tierOne, p.tierTwo, p.tierThree)}
              <div id='joinedContainer'>
                <Typography align='center' variant="body2" component="p">
                  Paq Members Joined: {p.count}/{p.personLimit}
                </Typography>
                <ColorLinearProgress id='progressBar' variant='determinate' value={normalise(p.count, p.personLimit)} />
              </div>
              <div id='countdown'>
                <Countdown date={Date.parse(p.timeStamp) + (p.timer * 24 * 60 * 60 * 1000)} renderer={renderer} />
              </div>
            </CardContent>
          </CardActionArea>
        </Card>
      )
    })
  }

    return (
      <div>
        <Divider />
        {displayProducts()}
      </div>
    );
  }

const mapStateToProps = (state) => {
  return { products: state.products, user: state.user, userProducts: state.userProducts}
}

export default withRouter(connect(mapStateToProps)(Home));