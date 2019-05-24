export const CREATE_USER = {
    id: 'CREATE_USER',
    type: 'object',
    properties: {
        name: {
            type: 'string'
        }
    },
    required: ['name']
};

export const CREATE_HOBBIES = {
    id: 'CREATE_HOBBIES',
    type: 'object',
    properties: {
        name: {
            type: 'string'
        },
        passionLevel: {
            type: 'string'
        },
        user: {
            type: 'string'
        }
    },
    required: ['name', 'user', 'passionLevel']
};