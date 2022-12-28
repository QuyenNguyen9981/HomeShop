import {
  Box,
  Button,
  Container,
  Grid,
  makeStyles,
  Paper,
  Snackbar,
  Typography,
} from '@material-ui/core';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { cartItemsCountSelector, cartTotalSelector } from './selectors';
import { IMAGE_PLACEHOLDER, STATIC_HOST } from 'constants';
import { formatPrice } from 'utils';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import { useState } from 'react';
import { Alert } from '@material-ui/lab';

CartFeature.propTypes = {};

const useStyles = makeStyles((theme) => ({
  root: {},
  middle: {
    maxWidth: '600px',
    padding: theme.spacing(1.5),
  },
  left: {
    flex: 'wrap',
    padding: theme.spacing(1.5),
  },
  right: {
    position: 'relative',
    maxWidth: '350px',
    minHeight: '200px',
    width: '100%',
    textAlign: 'center',
    padding: theme.spacing(1.5),
    borderLeft: `1px solid ${theme.palette.grey[300]}`,
  },
  empty: {
    padding: '40px 20px',
    textAlign: 'center',
    width: '100%',
  },
  name: {
    textTransform: 'uppercase',
  },

  description: {
    margin: theme.spacing(2, 0),
  },
  priceBox: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.grey[100],
    borderRadius: '4px',
  },
  salePrice: {
    marginRight: theme.spacing(2),
    fontSize: theme.typography.h4.fontSize,
    fontWeight: 'bold',
  },
  originalPrice: {
    textDecoration: 'line-through',
  },
  button: {
    position: 'absolute',
    maxWidth: '325px',
    width: '100%',
    bottom: '8px',
    right: '8px',
  },
  local: {
    padding: theme.spacing(1.5),
    border: `2px solid ${theme.palette.grey[300]}`,
  },
  total: {
    color: '#b2102f',
    fontSize: theme.typography.h6.fontSize,
    fontWeight: 'bold',
    borderTop: `2px solid ${theme.palette.grey[300]}`,
  },
  estimatePrice: {
    padding: theme.spacing(1.5),
  },
}));

function CartFeature(props) {
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  const navigate = useNavigate();

  // Tong so san pham
  const cartTotal = useSelector(cartTotalSelector);

  // So san pham trong gio hang
  const numberItemInCart = useSelector(cartItemsCountSelector);

  // Mảng cac san pham,
  const infoProduct = useSelector((state) => state.cart.cartItems);

  const innerInfoProduct = infoProduct[0];

  const dataInfoProduct = innerInfoProduct.product;

  const { name, shortDescription, salePrice, originalPrice, promotionPercent } = dataInfoProduct;
  console.log(name, shortDescription, salePrice, originalPrice, promotionPercent);

  const thumbnailUrl = dataInfoProduct.thumbnail
    ? `${STATIC_HOST}${dataInfoProduct.thumbnail.url}`
    : `${IMAGE_PLACEHOLDER}`;

  const handleClickContinueBuy = () => {
    navigate('/products');
  };

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <Box>
      <Container>
        <Box className={classes.root}>
          <h3>Giỏ hàng ({numberItemInCart} sản phẩm) </h3>
        </Box>
        <Paper elevation={0}>
          <Grid container>
            {/* left */}
            <Grid item className={classes.left}>
              {infoProduct.length > 0 &&
                infoProduct.map((product, idx) => (
                  <div key={product.id} product={product}>
                    <img src={thumbnailUrl} name="product" width="200px" />
                  </div>
                ))}

              {infoProduct.length <= 0 && (
                <Paper elevation={0}>
                  <Box component="div" className={classes.empty}>
                    <img src="https://salt.tikicdn.com/desktop/img/mascot@2x.png" alt="" />
                    <p>Không có sản phẩm nào trong giỏ hàng của bạn</p>
                    <Button
                      variant="contained"
                      color="secondary"
                      size="medium"
                      onClick={handleClickContinueBuy}
                    >
                      Tiếp tục mua sắm
                    </Button>
                  </Box>
                </Paper>
              )}
            </Grid>

            <Grid>
              <Box className={classes.middle}>
                <Typography component="h1" variant="h4" className={classes.name}>
                  {name}
                </Typography>
                <Typography variant="body2" className={classes.description}>
                  {shortDescription}
                </Typography>

                <Box className={classes.priceBox}>
                  <Box component="span" className={classes.salePrice}>
                    {formatPrice(salePrice)}
                  </Box>
                  {promotionPercent > 0 && (
                    <>
                      <Box component="span" className={classes.originalPrice}>
                        {formatPrice(originalPrice)}
                      </Box>
                      <Box component="span" className={classes.promotionPercent}>
                        {` -${promotionPercent}%`}
                      </Box>
                      <Box component="span" className={classes.salePrice}>
                        {' '}
                        x {numberItemInCart}(số lượng)
                      </Box>
                    </>
                  )}
                </Box>
              </Box>
            </Grid>

            {/* right */}
            {numberItemInCart > 0 && (
              <Grid item className={classes.right}>
                <Box className={classes.local}>
                  Địa chỉ giao hàng: 118/16/30 Huỳnh Thiện Lộc,Phường Hòa Thạnh, Quận Tân Phú, HCM
                </Box>
                <Box className={classes.estimatePrice}>Tạm tính: {formatPrice(cartTotal)}</Box>
                <Box className={classes.total}>Tổng tiền: {formatPrice(cartTotal)}</Box>
                <Button
                  variant="contained"
                  color="secondary"
                  startIcon={<LocalShippingIcon />}
                  className={classes.button}
                  onClick={handleClick}
                >
                  Đặt Hàng
                </Button>
              </Grid>
            )}
          </Grid>
        </Paper>
      </Container>
      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Alert
          onClose={handleClose}
          severity="info"
          style={{ backgroundColor: 'blue', color: '#fff' }}
        >
          Chức năng này chưa hoàn thành!
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default CartFeature;
