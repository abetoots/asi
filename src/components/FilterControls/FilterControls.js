import React, { useState, useEffect } from 'react';
import './FilterControls.scss';

import Input from '../UI/Input/Input';
import Form from '../Form/Form';

//Misc
import { filters } from '../../misc/shared/forms';
import Search from '../Search/Search';
import { useDebounce } from '../../misc/tools/hooks';

import PropTypes from 'prop-types';


const FilterControls = (props) => {
    const [activeFilters, setActiveFilters] = useState({
        input: '',
        categories: [],
        location: {}
    });

    const [location, setLocation] = useState({
        city: '',
        province: '',
        country: ''
    });
    const [categories, setCategories] = useState([]);
    const [textVal, setTextVal] = useState('');

    //for referencing only
    //use case: filter.keys below
    const refObj = {
        categories: categories,

    }

    const debouncedVal = useDebounce(textVal, 400);

    useEffect(() => {
        if (debouncedVal) {
            console.log('called')
            setActiveFilters({ ...activeFilters, input: debouncedVal, categories: categories, location: { ...location } });
        } else {
            setActiveFilters({
                input: '',
                categories: [],
                location: {}
            });
        }
    }, [debouncedVal])

    //after every render, we get all the active filters only if any of them changed
    useEffect(() => {
        let set = new Set(Object.values(location));
        if (categories.length > 0 || set.size > 1) {
            setActiveFilters({ ...activeFilters, input: debouncedVal, categories: categories, location: { ...location } });
        } else {
            setActiveFilters({
                input: '',
                categories: [],
                location: {}
            });
        }
    }, [categories, location]);

    const locationKeys = Object.keys(location);

    const inputChangedHandler = (e, identifier) => {
        switch (identifier) {
            case 'search':
                //user should be typing
                //we wait for them to finish typing
                setTextVal(e.target.value); // triggers useDebounce above
                break;
            case 'categories':
                //add the selected category to the array
                if (e.target.checked) {
                    setCategories([...categories, e.target.value]);
                } else {
                    let filtered = [...categories].filter(cat => cat !== e.target.value);
                    setCategories(filtered);
                }
                break;
        }

        if (locationKeys.includes(identifier)) {
            //the identifier is a key of location
            //set location
            setLocation({ ...location, [identifier]: e.target.value });
        }

    }

    //TODO Create a separate search component not coupled with search results
    return (
        <div className="FilterControls">
            <div className="FilterControls__slot -search">
                <Search
                    handleChange={(event) => inputChangedHandler(event, 'search')}
                    handleSubmit={(e) => props.handleSubmit(e, activeFilters)}
                    label="Search filter"
                    labelHidden
                    btnText="Search"
                    enableAutoResults={false}
                    btnPos='rightaligncenter'
                    variant='filterControls'
                    placeholder="Search..."
                />
            </div>

            <div className="FilterControls__slot -filters">
                <Form
                    handleSubmit={(e) => props.handleSubmit(e, activeFilters)}
                    submitError={''}
                    submitted={false}
                    submitting={false}
                    btnText="Refine Search Results"
                >
                    {filters.map(filter => {
                        return (
                            <Input
                                key={filter.key}
                                elementType={filter.elementType}
                                elementConfig={filter.elementConfig}
                                label={filter.label}
                                value={locationKeys.includes(filter.key) ? location[filter.key] : refObj[filter.key]}
                                handleChange={(event) => inputChangedHandler(event, filter.key)}
                                customProps={filter.customProps}
                            />
                        );
                    })}
                </Form>
            </div>

        </div>
    );
}

FilterControls.propTypes = {
    handleSubmit: PropTypes.func.isRequired
}

export default FilterControls;