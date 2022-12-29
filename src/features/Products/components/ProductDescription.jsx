import { Paper } from '@material-ui/core';
import DOMPurify from 'dompurify';
import PropTypes from 'prop-types';

ProductDescription.propTypes = {
    product: PropTypes.object.isRequired,
};

function ProductDescription({ product = {} }) {
    const safeDescription = DOMPurify.sanitize(product.description)
    console.log(safeDescription)
    return (
        <Paper elevation={0} style={{ padding: "15px" }}>
            <div style={{ minWidth: '375px' }}>
                <div dangerouslySetInnerHTML={{ __html: safeDescription }} />
            </div>
        </Paper>

    );
}

export default ProductDescription;