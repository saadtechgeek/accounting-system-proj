import * as chai from 'chai';
import * as cap from 'chai-as-promised';

// * must load chai-string before chai-as-promised *
chai.use(require('chai-string'));
chai.use(cap);

export const expect = require('chai').expect;
export const assert = require('chai').assert;
export const should = require('chai').should;




