import {debug, identity, curry, passThrough,
        startsWith, join, on, isEqual,
        on2, init, tail, last, head, map, map_, reverse,
        reduce, compose, prop, zip, flip, toPairs, fromPairs,
        mapObject, mapValues, toObject, filter} from './fp';
import sinon from 'sinon';

describe('fp', () => {
    describe('debug', () => {
        it('returns the value it is invoked with', () => {
            expect(debug('hello')).to.equal('hello');
        });
    });
    describe('identity', () => {
        it('returns the value it is invoked with', () => {
            expect(identity('hello')).to.equal('hello');
        });
    });
    describe('curry', () => {
        it('returns a function if one of 3 args are provided', () => {
            const fn = curry((x, y, z) => x);
            expect(fn('hej')).to.be.a('function');
        });
        it('returns a function if two of 3 args are provided', () => {
            const fn = curry((x, y, z) => x);
            expect(fn('hej', 1)).to.be.a('function');
        });
        it('returns a value if all args are provided', () => {
            const fn = curry((x, y, z) => x);
            expect(fn('hej', 1, 2)).to.be.equal('hej');
        });
    });
    describe('passThrough', () => {
        it('invoke function and return second arg', () => {
            const f = sinon.spy();
            expect(passThrough(f, 'hello')).to.equal('hello');
            expect(f.callCount).to.equal(1);
        });
    });
    describe('startsWith', () => {
        it('return true if first string is prefix of second string', () => {
            expect(startsWith('hello', 'hello world')).to.be.true;
        });
        it('return false if first string is not prefix of second string', () => {
            expect(startsWith('hej', 'hello world')).to.be.false;
        });
        it('return true if first arg is first element list', () => {
            expect(startsWith(1, [1,2,3,4,5])).to.be.true;
        });
    });
    describe('join', () => {
        it('merge two strings with specified separator', () => {
            expect(join('-', 'hello', 'world')).to.be.equal('hello-world');
        });
    });
    describe('on', () => {
        it('pass final arg thorugh second and thrid function and pass into first function', () => {
            const f = (x, y) => x + y;
            const g = x => x.toUpperCase();
            const h = x => x.toLowerCase();
            expect(on(f, g, h, 'hello')).to.be.equal('HELLOhello');
        });
    });
    describe('isEqual', () => {
        it('two elements are equal if same type and same value', () => {
            expect(isEqual('hello', 'hello')).to.be.true;
        });
        it('two elements are not equal if different type even if same value', () => {
            expect(isEqual(1, '1')).to.be.false;
        });
    });
    describe('on2', () => {
        it('passes two final values through 2nd and 3rd fn to 1st fn', () => {
            const f = (x, y) => x + y;
            const g = x => x.toUpperCase();
            const h = x => x.toLowerCase();
            expect(on2(f, g, h, 'hello', 'WORLD')).to.be.equal('HELLOworld');
        });
    });
    describe('init', () => {
        it('returns all but the last element', () => {
            const xs = [1,2,3,4];
            const expected = [1,2,3];
            expect(init(xs)).to.deep.equal(expected);
        });
    });
    describe('tail', () => {
        it('returns all but the first element', () => {
            const xs = [1,2,3,4];
            const expected = [2,3,4];
            expect(tail(xs)).to.deep.equal(expected);
        });
    });
    describe('last', () => {
        it('returns the last element', () => {
            const xs = [1,2,3,4];
            const expected = 4;
            expect(last(xs)).to.equal(expected);
        });
    });
    describe('head', () => {
        it('returns the first element', () => {
            const xs = [1,2,3,4];
            const expected = 1;
            expect(head(xs)).to.equal(expected);
        });
    });
    describe('map', () => {
        it('applies fn to all elements in array', () => {
            const xs = [1,2,3,4];
            const add1 = x => x + 1;
            const expected = [2,3,4,5];
            expect(map(add1, xs)).to.deep.equal(expected);
        });
    });
    describe('map_', () => {
        it('applies fn to all elements in array but returns nothing', () => {
            const xs = [1,2,3,4];
            const fn = sinon.spy();
            map_(fn, xs);
            expect(fn.callCount).to.equal(xs.length);
        });
    });
    describe('reverse', () => {
        it('reverses elements in array', () => {
            const xs = [1,2,3,4];
            const expected = [4,3,2,1];
            expect(reverse(xs)).to.deep.equal(expected);
        });
    });
    describe('reduce', () => {
        it('joins element with specified base case and operator', () => {
            const xs = [1,2,3,4];
            const base = 0;
            const add = (x, y) => x + y;
            const expected = 10;
            expect(reduce(add, base, xs)).to.deep.equal(expected);
        });
    });
    describe('compose', () => {
        it('passes output from last fn to first after calling last with provided args', () => {
            const f = x => x + 1;
            const g = x => x + 1;
            const fog = compose(f, g);
            expect(fog(1)).to.equal(3);
        });
    });
    describe('prop', () => {
        it('returns the property of an object', () => {
            expect(prop('hej', {hej: 'hello'})).to.equal('hello');
        });
    });
    describe('zip', () => {
        it('form pairs where indices are equal', () => {
            expect(zip([1,2,3], [2,3,4])).to.deep.equal([[1,2], [2,3], [3,4]]);
        });
        it('resulting array shall have same size as first arg array', () => {
            expect(zip([1,2], [2,3,4])).to.deep.equal([[1,2], [2,3]]);
        });
    });
    describe('flip', () => {
        it('switch argument order of fn', () => {
            const f = flip(prop);
            expect(f({hej: 'hello'}, 'hej')).to.equal('hello');
        });
    });
    describe('toPairs', () => {
        it('Given an object form pairs with keys and values', () => {
            const o = {hello: 'hej', fish: 'fisk'};
            expect(toPairs(o)).to.deep.equal([['hello', 'hej'], ['fish', 'fisk']]);
        });
    });
    describe('fromPairs', () => {
        it('Given an array of pairs, create an object where first element is key send second value', () => {
            const xs = [['hello', 'hej'], ['fish', 'fisk']];
            expect(fromPairs(xs)).to.deep.equal({hello: 'hej', fish: 'fisk'});
        });
    });
    describe('mapObject', () => {
        it('invokes fn with pairs [key, value] from the object', () => {
            const xs = {'hello': 'hej', 'fish': 'fisk', 'cheese': 'ost'};
            expect(mapObject(x => x.join('-'), xs)).to.deep.equal(
                ['hello-hej', 'fish-fisk', 'cheese-ost']
            );
        });
    });
    describe('mapValues', () => {
        it('only transforms values of object', () => {
            const xs = {'hello': 'hej', 'fish': 'fisk', 'cheese': 'ost'};
            const toUpperCase = x => x.toUpperCase();
            expect(mapValues(toUpperCase, xs)).to.deep.equal(
                {'hello': 'HEJ', 'fish': 'FISK', 'cheese': 'OST'}
            );
        });
    });
    describe('toObject', () => {
        it('takes a list of objects and transforms to an object where keys are given by provided function', () => {
            const xs = [{id: 1, name: 'kalle'}, {id: 2, name: 'Erik Ponti'}];
            expect(toObject(prop('id'), xs)).to.deep.equal(
                {1: {id: 1, name: 'kalle'}, 2: {id: 2, name: 'Erik Ponti'}}
            );
        });
    });
    describe('filter', () => {
        it('Only keeps elements for which the predicate returns true', () => {
            const xs = [1,2,3,4,5,6];
            const largerThan3 = x => x > 3;
            expect(filter(largerThan3, xs)).to.deep.equal(
                [4,5,6]
            );
        });
    });
});
