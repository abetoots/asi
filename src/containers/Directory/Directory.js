import React, { useState, useEffect, useRef } from 'react';
import './Directory.scss';

import { connect } from 'react-redux';
import FilterControls from '../../components/FilterControls/FilterControls';
import VendorPreview from './VendorPreview/VendorPreview';
import Spinner3 from '../../components/UI/Spinner/Spinner3';
import MobileWrapper from '../../components/MobileWrapper/MobileWrapper';
import BackDrop from '../../components/UI/Backdrop/Backdrop';

//misc
import * as actions from '../../store/actions/index';
import PropTypes from 'prop-types';
import Aux from '../../hoc/Auxiliary';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Directory = (props) => {

    const [showBackDrop, setShowBackDrop] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const targetMobileEl = useRef(null);

    useEffect(() => {
        if (!props.loaded) {
            props.retrieveVendors();
        } else {
            setRefreshing(false);
        }
    }, [props.vendors]);

    const submitHandler = (e, activeFilters) => {
        e.preventDefault();
        console.log('submitted');
        props.retrieveFilteredVendors(activeFilters);

    }

    const notLoaded = props.error ?
        <div>{props.error} ⚠️</div>
        : <Spinner3 />;

    const handleRefresh = (e) => {
        setRefreshing(true);
        props.retrieveVendors();
    }

    const mobileClickHandler = (e) => {
        setShowBackDrop(true);
        targetMobileEl.current.classList.toggle('-toggled');
    }

    const backDropClickHandler = e => {
        targetMobileEl.current.classList.toggle('-toggled');
        setShowBackDrop(false);
    }

    return (
        <div className="Directory">
            {props.loaded ?
                <Aux>
                    <div className="Directory__slot -filters">
                        <MobileWrapper>
                            <BackDrop show={showBackDrop} handleClick={backDropClickHandler} />
                            <button onClick={mobileClickHandler} className="Directory__mobileBtn">
                                <FontAwesomeIcon icon={['fas', 'sliders-h']} />
                                <span className="FilterControls__mobileBtnText">Filter</span>
                            </button>
                        </MobileWrapper>
                        <MobileWrapper>
                            <div ref={targetMobileEl} className="Directory__mobileTarget">
                                <FilterControls handleSubmit={submitHandler} />
                            </div>
                        </MobileWrapper>
                        <div className="Directory__subSlot -filterControls">
                            <FilterControls handleSubmit={submitHandler} />
                        </div>
                    </div>
                    <div className="Directory__slot -results">
                        <div className="Directory__subSlot -refresh">
                            <button className="Directory__refresh" onClick={handleRefresh}>
                                <FontAwesomeIcon icon={['fas', 'sync-alt']} spin={refreshing} />
                                <span className="Directory__refreshText">Refresh Results</span>
                            </button>
                        </div>
                        {props.vendors.map(vendor => {
                            return (
                                <VendorPreview
                                    key={vendor.id}
                                    data={vendor.data}
                                />
                            );
                        })}
                    </div>
                </Aux>
                :
                notLoaded
            }

        </div>
    );

};

const mapStateToProps = state => {
    return {
        vendors: state.vendors.vendors,
        loaded: state.vendors.loaded,
        loading: state.vendors.loading,
        error: state.vendors.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        retrieveVendors: () => dispatch(actions.retrieveVendors()),
        retrieveFilteredVendors: (filters) => dispatch(actions.retrieveFilteredVendors(filters))
    }
}

Directory.propTypes = {
    error: PropTypes.string,
    loading: PropTypes.bool,
    loaded: PropTypes.bool,
    vendors: PropTypes.array,
    retrieveVendors: PropTypes.func,
    retrieveFilteredVendors: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(Directory);