'use strict';

const assert = require('chai').assert;

const stringParser = require('../lib/string-type-parser.js');

describe('can parse json object', () => {

  it('should return an object', () => {

    const obj = {
      a: 'a',
      b: 'b',
    };
    const result = stringParser.parse(obj);

    assert.typeOf(result, 'object');     
    assert.deepEqual(result, obj); 

  });

  it('should return {} if input is invalid', () => {

    const obj = null;
    const result = stringParser.parse(obj);

    assert.typeOf(result, 'object');
    assert.deepEqual(result, {});

  });

  it('should convert date string', () => {

    const obj = {
      date: '2016-08-17',
      date_1: '2011-04-11T11:51:00',  
      date_2: 'December 17, 1995 03:24:00',
      date_3: '10 06 2014',
      date_utc: '2011-04-11T10:20:30Z',        
    };

    const result = stringParser.parse(obj);

    assert.typeOf(result.date, 'date'); 
    assert.deepEqual(result.date, new Date('Wed, 17 Aug 2016 00:00:00 GMT'));
    assert.deepEqual(result.date, new Date('2016-08-17'));

    assert.typeOf(result.date_1, 'date'); 
    assert.deepEqual(result.date_1, new Date('Mon, 11 Apr 2011 11:51:00 GMT'));  
    assert.deepEqual(result.date_1, new Date('2011-04-11T11:51:00'));      

    assert.typeOf(result.date_2, 'date'); 
    assert.deepEqual(result.date_2, new Date('Sun, 17 Dec 1995 02:24:00 GMT'));  
    assert.deepEqual(result.date_2, new Date('December 17, 1995 03:24:00'));       

    assert.typeOf(result.date_3, 'date'); 
    assert.deepEqual(result.date_3, new Date('Sun, 05 Oct 2014 22:00:00 GMT'));  
    assert.deepEqual(result.date_3, new Date('10 06 2014'));       

    assert.typeOf(result.date_utc, 'date'); 
    assert.deepEqual(result.date_utc, new Date('Mon, 11 Apr 2011 10:20:30 GMT'));  
    assert.deepEqual(result.date_utc, new Date('2011-04-11T10:20:30Z'));       

  });

  it('shoud not convert invalid date string', () => {

    const obj = {
      invalid_non_iso_date: '23/25/2014', //Non-ISO string with invalid date values
      invalid_iso_date: '2014-25-23',  // ISO string with invalid values
      non_conforming_iso_date: 'foo-bar 2014', //in V8 is a valid date :-(
      invalid_date: '2014 foo',
    };

    const result = stringParser.parse(obj);

    assert.typeOf(result.invalid_non_iso_date, 'string'); 
    assert.equal(result.invalid_non_iso_date, '23/25/2014');

    assert.typeOf(result.invalid_iso_date, 'string'); 
    assert.equal(result.invalid_iso_date, '2014-25-23');

    // assert.typeOf(result.non_conforming_iso_date, 'string'); 
    // assert.equal(result.non_conforming_iso_date, '2014 foo');

    assert.typeOf(result.invalid_date, 'string'); 
    assert.equal(result.invalid_date, '2014 foo');

  });

  it('should convert bool value', () => {

    const obj = {
      i_am_a_bool: 'true',
      i_am_not_a_bool: 'I am a string',
      i_am_a_bool_uc: 'TRUE',
      i_am_a_falsy_bool_uc: 'FALSE'
    };

    const result = stringParser.parse(obj);

    assert.typeOf(result, 'object');
    assert.typeOf(result.i_am_a_bool, 'boolean');        
    assert.equal(result.i_am_a_bool, true);

    assert.typeOf(result.i_am_not_a_bool, 'string');        
    assert.equal(result.i_am_not_a_bool, 'I am a string');

    assert.typeOf(result.i_am_a_bool_uc, 'boolean');        
    assert.equal(result.i_am_a_bool_uc, true);    

    assert.typeOf(result.i_am_a_falsy_bool_uc, 'boolean');        
    assert.equal(result.i_am_a_falsy_bool_uc, false);        
  });

  it('should convert number value', () => {

    const obj = {
      int_num: '23593',
      float_num: '234.04',      
      timestamp_is_convert_to_number: '1471601601',
      negative_int_num: '-5693',
      negative_float_num: '-5693.6543',      
      

    };
    const result = stringParser.parse(obj);

    assert.typeOf(result.int_num, 'number');  
    assert.equal(result.int_num, 23593);   

    assert.typeOf(result.timestamp_is_convert_to_number, 'number');  
    assert.equal(result.timestamp_is_convert_to_number, 1471601601);       
 
    assert.typeOf(result.float_num, 'number');  
    assert.equal(result.float_num, 234.04);

    assert.typeOf(result.negative_int_num, 'number');  
    assert.equal(result.negative_int_num, -5693);

    assert.typeOf(result.negative_float_num, 'number');  
    assert.equal(result.negative_float_num, -5693.6543);

  });  

});

