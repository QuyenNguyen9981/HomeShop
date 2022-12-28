import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, ListItemIcon, makeStyles, Menu, Typography } from '@material-ui/core';
import { CheckCircleOutline, Close } from '@material-ui/icons';
import QuantityField from 'components/form-controls/QuantityField';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    position: 'relative'

  },
  close: {
    right: '0px',
    position: 'absolute',
    cursor: 'pointer'
  },
  stick: {
    color: 'green',
  },
  notice: {
    margin: 'auto'
  },
  button: {
    margin: theme.spacing(1)
  }
}))

function AddToCartForm({ onSubmit = null }) {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = useState(null)
  const navigate = useNavigate()
  const schema = yup.object().shape({
    quantity: yup
      .number()
      .required('Please enter quantity')
      .min(1, 'Minimun value is 1')
      .typeError('Please enter a number'),
  });

  const form = useForm({
    defaultValues: {
      quantity: 1,
    },

    resolver: yupResolver(schema),
  });

  const handleOnSubmit = async (values) => {

    if (!onSubmit) return;

    await onSubmit(values);
  };

  const handleMenuCartClick = (e) => {
    setAnchorEl(e.currentTarget)
  }

  const handleNavigateMenuCart = () => {
    navigate('/cart');
  }
  const handleCloseMenuCart = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <form onSubmit={form.handleSubmit(handleOnSubmit)}>
        <QuantityField name="quantity" label="Quantity" form={form} />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          style={{ cursor: 'pointer', width: '252px' }}
          onClick={handleMenuCartClick}
        >
          Add to cart
        </Button>
      </form>
      <Menu
        onBlur={handleCloseMenuCart}
        className={classes.root}
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleNavigateMenuCart}
        anchorReference="anchorPosition"
        anchorPosition={{ top: 65, left: 1100 }}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}

      >
        <Box className={classes.close}>
          <Close onClick={handleCloseMenuCart} />
        </Box>
        <Box>
          <CheckCircleOutline fontSize="small" className={classes.stick} />
          <Typography variant="inherit" className={classes.notice}>Thêm vào giỏ hàng thành công!</Typography>
        </Box>
        <Button
          className={classes.button}
          onClick={handleNavigateMenuCart}
          type="submit"
          variant="contained"
          color="secondary"
          startIcon={<AddShoppingCartIcon />}
        >Xem giỏ hàng và thanh toán</Button>
      </Menu>

    </>
  );
}

AddToCartForm.propTypes = {
  onSubmit: PropTypes.func,
};

export default AddToCartForm;
