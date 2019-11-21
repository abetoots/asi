import React from 'react';

import { Route, Switch } from 'react-router-dom';
//Components
import Aux from '../../hoc/Auxiliary';
import NotFound from '../NotFound404/NotFound404';

import PropTypes from 'prop-types';

const RoutesList = (props) => {

    return (
        <Aux>
            {/* For a given set of routes, load only one of each */}
            <Switch>
                {props.routes.map(route =>
                    <Route key={route.path} exact={route.exact} path={route.path} component={route.component} />
                )}
                {/* Handle our 404 case. Must be defined last */}
                <Route component={NotFound} />
            </Switch>
        </Aux>
    );
};

RoutesList.propTypes = {
    routes: PropTypes.arrayOf(PropTypes.exact(
        {
            path: PropTypes.string,
            exact: PropTypes.bool,
            component: PropTypes.elementType,
            label: PropTypes.string
        }
    ).isRequired),
}

export default RoutesList;