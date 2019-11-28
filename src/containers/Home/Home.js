import React, { useState, useEffect } from 'react';
import './Home.scss';

//Redux
import { connect } from 'react-redux';

//Components
import Hero from '../../components/Hero/Hero';
import CategoryIcons from '../../components/CategoryIcons/CategoryIcons';
import Search from '../../components/Search/Search';
import { NavLink } from 'react-router-dom';

//Media
import heroMobile from '../../assets/hero-mobile.jpg';
import heroTablet from '../../assets/hero-tablet.jpg';
import hero from '../../assets/hero-original.jpg';
import { search3 } from '../../misc/shared/icons';

//Misc
import { vendorsRef } from '../../firebase-init';
import { categoryIcons } from '../../misc/shared/categories';
import { useDebounce } from '../../misc/tools/hooks';
import * as actions from '../../store/actions/index';
import PropTypes from 'prop-types';


const Home = (props) => {
    const [touched, setTouched] = useState(false);
    const [inputVal, setInputVal] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    //Listen for changes in inputVal
    const debouncedInputVal = useDebounce(inputVal, 400);

    //The auto search API call.
    //After render, listen only for changes in the DEBOUNCED inputVal, not the inputVal
    /**
     * TODO better search logic, right now categories are prioritized first, what if user is expecting a
     * TODO business that happens to have the same prefix as a category?
     */
    useEffect(() => {

        //only when the value to search exceeds 3 chars
        if (debouncedInputVal && debouncedInputVal.length >= 3) {
            // //case insensitive
            // const regex = new RegExp(debouncedInputVal, 'i');
            // //categories local search
            // //finds a cateory match return early
            // let foundCat = categories.filter(cat => regex.test(cat)).map(cat => { return { category: true, result: cat } });
            // if (foundCat.length > 0) {
            //     console.log(foundCat);
            //     setSearchResults([...searchResults, foundCat]);
            //     return;
            // }

            //no? 
            //await both search vendor's names & vendor's address
            //TODO search by location, better indexing
            //TODO maybe implement result caching
            //https://stackoverflow.com/questions/46568142/google-firestore-query-on-substring-of-a-property-value-text-search
            vendorsRef.where('businessName', '>=', debouncedInputVal).where('businessName', '<=', debouncedInputVal + '\uf8ff').get()
                .then(querySnapshot => {
                    let foundDocs = [];
                    // doc.data() is never undefined for query doc snapshots
                    querySnapshot.forEach(doc => {
                        foundDocs.push({ businessName: true, doc: doc.data(), result: doc.data().businessName });
                    });
                    setSearchResults(foundDocs);
                })
                .catch(err => {
                    console.log(err)
                })

        } else {
            setSearchResults([]);
        }

    },
        [debouncedInputVal]
    );

    const submitHandler = (e) => {
        e.preventDefault();
        vendorsRef
    }

    const inputChangedHandler = (e) => {
        setTouched(true);
        setInputVal(e.target.value);
    }

    const resultClickHandler = (e, result) => {
        //if categories , get doc, then display directory
        if (result.category) {
            //fetch docs in this category
            console.log(result, '[category]')
        }
        //if businessname, get doc, then go to the vendor page
        if (result.businessName) {
            console.log(result, '[businessName]')
        }
    }

    const categoryIconClickedHandler = (e, identifier) => {
        props.retrieveByCategory(identifier);
        // eslint-disable-next-line react/prop-types
        props.history.push('/directory');
    }

    return (
        <div className="Home">
            <Hero src={hero} srcMobile={heroMobile} srcTablet={heroTablet}>
                <div className="Home__slot -hero">
                    <div className="Home__subSlot -panel">
                        <h2>Search by business name / category / location:</h2>
                        <Search
                            icon={search3}
                            label="Search our directory"
                            labelHidden
                            placeholder="Start typing..."
                            tooltip="Try: 'Tea N' A Pie' or 'bakery' or 'Baguio City'"
                            btnText="Search"
                            btnPos="rightaligncenterpadded"
                            touched={touched}
                            variant='variant2'
                            handleChange={inputChangedHandler}
                            handleSubmit={submitHandler}
                            handleResultClick={(e, result) => resultClickHandler(e, result)}
                            enableAutoResults
                            results={searchResults}
                        />
                        <h3>Categories:</h3>

                        <CategoryIcons categories={categoryIcons} handleClick={(e, identifier) => categoryIconClickedHandler(e, identifier)} />
                    </div>
                    <div className="Home__subSlot -or">
                        <div className="Home__or">or</div>
                        <div className="Home__line -translate -scale"></div>
                    </div>
                    <div className="Home__subSlot -panel">
                        <h2>Add your business to our directory. It's easy</h2>
                        <NavLink to={`${props.signedIn ? '/account' : '/login'}`} className="Home__btnCta">Get Started</NavLink>
                    </div>
                </div>
            </Hero>
        </div >
    );

};

const mapStateToProps = state => {
    return {
        signedIn: state.user.signedIn
    }
}

const mapDispatchToProps = dispatch => {
    return {
        retrieveByCategory: (identifier) => dispatch(actions.retrieveVendorsByCategory(identifier))
    }
}

Home.propTypes = {
    signedIn: PropTypes.bool,
    retrieveByCategory: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);