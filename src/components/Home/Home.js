import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import { getProducts } from '../../actions/products';
import { Link, withRouter } from 'react-router-dom';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Countdown from 'react-countdown-now';

const useStyles = makeStyles({
  card: {
    width: 345,
  },
  media: {
    height: 140,
  },
});

function Home(props) {
  const classes = useStyles();

  useEffect(() => {
    function onLoad() {
      const { dispatch } = props;
      dispatch(getProducts())
    }
    onLoad()
  }, [])

  const displayProducts = () => {
    const { products } = props;
    return products.map(p => {
      return(
        <Card className={classes.card} id='card'>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image="/static/images/cards/contemplative-reptile.jpg"
              title="Contemplative Reptile"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {p.name.charAt(0).toUpperCase() + p.name.slice(1)}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Paq Members: {p.count} / {p.personLimit}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Price: {p.price}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Discount Tier One: {100 - (p.tierOne * 100)}%
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Discount Tier Two: {100 - (p.tierTwo * 100)}%
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Discount Tier Three: {100 - (p.tierThree * 100)}%
              </Typography>
              <Countdown date={Date.now() + (p.timer * 24 * 60 * 60 * 1000)} />
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="small" color="primary" id='buyButton'>
              Buy
            </Button>
          </CardActions>
        </Card>
      )
    })
  }

    return (
      <div id='homeContainer'>
        <Divider />
        {displayProducts()}
      </div>
    );
  }

const mapStateToProps = (state) => {
  return { products: state.products, user: state.user, userProducts: state.userProducts}
}

export default withRouter(connect(mapStateToProps)(Home));