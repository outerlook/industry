import forge from 'mappersmith/mappersmith'


export const api = forge({
    clientId: 'tractian',
    host: 'https://my-json-server.typicode.com/tractian/fake-api',
    resources: {
        Asset: {
            byId: {path: '/assets/{id}'},
            all: {path: '/assets'},
        },
        User: {
            byId: {path: '/users/{id}'},
            all: {path: '/users'},
        },
        Unit: {
            byId: {path: '/units/{id}'},
            all: {path: '/units'},
        },
        Company: {
            byId: {path: '/companies/{id}'},
            all: {path: '/companies'},
        },
        WorkOrder: {
            byId: {path: '/workorders/{id}'},
            all: {path: '/workorders'},
        }
    }
})