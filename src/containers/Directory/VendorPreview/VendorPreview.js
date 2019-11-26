import React from 'react';
import './VendorPreview.scss';

//misc
import PropTypes from 'prop-types';
import { truncateHtml } from '../../../misc/tools/util';

const VendorPreview = (props) => {



    return (
        <div className="VendorPreview">
            <div className="VendorPreview__slot -head">
                <h4 className="VendorPreview__name">{props.data.businessName}</h4>
                <img className="VendorPreview__photo" src={props.data.profilePhoto} />
            </div>
            <div className="VendorPreview__slot">
                {truncateHtml(props.data.description, 140)}
            </div>
        </div>
    );
}


VendorPreview.propTypes = {
    data: PropTypes.object
}

export default VendorPreview;