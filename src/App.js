import React from 'react';
import './App.scss';

//Router
import { BrowserRouter } from 'react-router-dom';
//Redux

import { connect } from 'react-redux';
//Components
import Header from './containers/Header/Header';
import MainContent from './containers/MainContent/MainContent';
import Footer from './containers/Footer/Footer';
import RoutesList from './components/RoutesList/RoutesList';
import Spinner2 from './components/UI/Spinner/Spinner2';
import Aux from './hoc/Auxiliary';

import * as menus from './misc/shared/menus';
import { uniqArray } from './misc/tools/util';

const App = (props) => {
    /**
     * 1) Modules are objects by default. We extract them to an array using Object.values() then flatten it using flat()
     * 2) We only need to add one route per path so we extract only unique values through a custom func uniqArray() [see util.js]
     */
    let routes = uniqArray(Object.values(menus).flat());

    return (
        <BrowserRouter>
            <div className={`App ${props.initializedFirebaseAuth ? ' -loaded' : ' -loading'}`}>
                {props.initializedFirebaseAuth ?
                    <Aux>
                        {/* <ScriptTags /> */}
                        < Header />
                        <MainContent>
                            <RoutesList routes={routes} loaded={props.initializedFirebaseAuth} />
                        </MainContent>
                        <Footer />
                    </Aux>

                    : <Spinner2 />}

            </div>
        </BrowserRouter>
    );

};

const mapStateToProps = state => {
    return {
        initializedFirebaseAuth: state.global.initializedFirebaseAuth
    }
}

export default connect(mapStateToProps)(App);