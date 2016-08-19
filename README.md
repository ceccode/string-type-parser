# json-type-parser

Json type parser. Micro library guessing type from string content. Usefull when importng from a csv or from JSON.parse().

## Installation

```
npm install json-type-parser --save
```

## Usage

```
const jsonTypeParser = require('json-type-parser');

const obj = {
    date: '2016-08-17',
    num: '12345',  
    string: 'I am a string'
    timestamp: '1471640778',
    date_malformed 'foo-bar 2014'
};

const result = jsonTypeParser.parse(obj);

/*
 * result.date // December 17, 1995 03:24:00; typeof Ddte
 * result.num // 2345; typeof number
 * result.string // 'I am a string'; typeof string
 * result.timestamp // 1471640778 is a Number, timestamps are not converted in Date; typeof number
 * result.date_malformed // return a Date on V8 while 'foo-bar 2014' in SpiderMonkey due nature of Date.parse(): https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse
 */

```

## API

parse(obj)

### Usage

```
const jsonTypeParser = require('json-type-parser');

const result = jsonTypeParser.parse({age: '28'}); // {age: 28}
const result = jsonTypeParser.parse(); // {}

```

## Test

```
npm test
```

## Coverage

```
npm run test-travis
```

## License

[MIT license](LICENSE)