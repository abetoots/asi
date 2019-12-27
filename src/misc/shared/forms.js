import { categories } from './categories';
import { provinces } from './lists';
// * Key should be what you defined in the state
export const accountForm = [
    {
        key: 'name',
        elementType: 'input',
        elementConfig: {
            type: 'text',
            required: true
        },
        label: 'Name',
        customProps: {},
    },
    {
        key: 'businessName',
        elementType: 'input',
        elementConfig: {
            type: 'text',
            required: true
        },
        label: 'Business Name',
        customProps: {},
    },
    {
        key: 'categories',
        elementType: 'checkbox',
        elementConfig: {
            options: categories
        },
        label: 'Category',
        customProps: {},
    },
    {
        multiLine: true,
        parentKey: 'location',
        inputs: [
            {
                key: 'street',
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    required: true
                },
                label: 'House No. / Street / Barangay',
                customProps: {},
            },
            {
                key: 'city',
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    required: true
                },
                label: 'Municipality/City',
                customProps: {},
            },
            {
                key: 'province',
                elementType: 'select',
                elementConfig: {
                    required: true,
                    options: provinces
                },
                label: 'Province',
                customProps: {},
            },
            {
                key: 'country',
                elementType: 'select',
                elementConfig: {
                    required: true,
                    options: ['', 'Philippines']
                },
                label: 'Country',
                customProps: {},
            },

        ]
    },
    {
        key: 'phoneNum',
        elementType: 'input',
        elementConfig: {
            type: 'number',
            required: true
        },
        label: 'Phone Number',
        customProps: {
            icon: ['fas', 'mobile-alt'],
            insideInput: true
        },

    },
    {
        key: 'telNum',
        elementType: 'input',
        elementConfig: {
            type: 'number',
        },
        label: 'Tel. Number',
        customProps: {
            icon: ['fas', 'phone'],
            insideInput: true
        },
    },
    {
        key: 'website',
        elementType: 'input',
        elementConfig: {
            type: 'url',
            //TODO update firestore validation
            pattern: /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/
        },
        label: 'Website',
        customProps: {
            icon: ['fas', 'globe'],
            insideInput: true
        },
    },
    {
        key: 'facebook',
        elementType: 'input',
        elementConfig: {
            type: 'url',
            pattern: /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/
        },
        label: 'Facebook',
        customProps: {
            icon: ['fab', 'facebook'],
            insideInput: true
        },
    },
    {
        key: 'description',
        elementType: 'editor',
        elementConfig: {},
        label: 'Description',
        customProps: {},
    },
    {
        key: 'profilePhoto',
        elementType: 'input',
        elementConfig: {
            type: 'file',
            accept: 'image/png, image/jpeg',

        },
        label: 'Upload Profile Photo',
        customProps: {
            btnText: 'Choose File'
        },
    },

];

export const filters = [
    {
        key: 'categories',
        elementType: 'checkbox',
        elementConfig: {
            options: categories
        },
        label: 'Category',
        customProps: {},
    },
    {
        key: 'city',
        elementType: 'input',
        elementConfig: {
            type: 'text',
            autoComplete: 'none'
        },
        label: 'Municipality/City',
        customProps: {},
    },
    {
        key: 'province',
        elementType: 'select',
        elementConfig: {
            options: provinces,
            autoComplete: 'none'
        },
        label: 'Province',
        customProps: {},
    },
    {
        key: 'country',
        elementType: 'select',
        elementConfig: {
            options: ['', 'Philippines'],
            autoComplete: 'none'
        },
        label: 'Country',
        customProps: {},
    },
];