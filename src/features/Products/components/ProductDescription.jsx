import { Paper } from '@material-ui/core';
import DOMPurify from 'dompurify';
import PropTypes from 'prop-types';

ProductDescription.propTypes = {
    product: PropTypes.object.isRequired,
};

function ProductDescription({product = {}}) {
    const safeDescription = DOMPurify.sanitize(product.description)
    return (
        <Paper elevation={0} style={{ padding: "15px" }}> 
            <div dangerouslySetInnerHTML={{ __html: safeDescription }}/>
        </Paper>

    );
}

export default ProductDescription;