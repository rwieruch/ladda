import {decorateCreate} from './create';
import {createEntityStore, get, put} from 'entity-store';
import {createQueryCache} from 'query-cache';
import sinon from 'sinon';

const config = [
    {
        name: 'user',
        ttl: 300,
        api: {
            getUsers: (x) => x,
            getUsers2: (x) => x,
            deleteUser: (x) => x,
        },
        invalidates: ['user'],
        invalidatesOn: ['GET']
    },
    {
        name: 'userPreview',
        ttl: 200,
        api: {
            getPreviews: (x) => x,
            updatePreview: (x) => x,
        },
        invalidates: ['fda'],
        viewOf: 'user'
    },
    {
        name: 'listUser',
        ttl: 200,
        api: {
            getPreviews: (x) => x,
            updatePreview: (x) => x,
        },
        invalidates: ['fda'],
        viewOf: 'user'
    }
];

describe('Create', () => {
    describe('decorateCreate', () => {
        it('Adds value to entity store', (done) => {
            const es = createEntityStore(config);
            const qc = createQueryCache(es);
            const e = config[0];
            const xOrg = {name: 'Kalle'};
            const response = {...xOrg, id: 1};
            const aFn = sinon.spy(() => {
                return Promise.resolve(response);
            });
            const res = decorateCreate(es, qc, e, aFn);
            res(xOrg).then((newX) => {
                expect(newX).to.equal(response);
                expect(get(es, e, 1).value).to.deep.equal({...response, __ladda__id: 1});
                done();
            });
        });
    });
});
