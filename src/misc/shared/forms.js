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
        key: 'category',
        elementType: 'input',
        elementConfig: {
            type: 'text',
            required: true
        },
        label: 'Category',
        customProps: {},
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
            required: true
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
        },
        label: 'Website',
        customProps: {
            icon: ['fas', 'globe'],
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
            required: true,
            accept: 'image/png, image/jpeg',

        },
        label: 'Upload Profile Photo',
        customProps: {
            btnText: 'Choose File'
        },
    },

];