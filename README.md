# Lab 04 - Data Modeling
#### *Author: Austin Hedeen*

This lab implements various methods to manage data modeling, including CRUD
handlers for in-memory models and those persisted to JSON-based data files.

## Modules
`file.js` - exports a generic Data Model that persists data to a local .db file   
`file-edit.js` - a refactor of the Lab 03 file for handling file I/O using Promises  
`memory.js` - exports a generic Data Model that stores data in memory (starter code provided)  
#### Models
`categories/categories.js` - extends the `memory.js` data model (starter code provided)  
`products/products.js` - extends the `memory.js` data model  
`person/person.js` - extends the `file.js` data model   


#### Tests
`__tests__/categories.test.js` (starter code provided)  
`__tests__/person.test.js`  
`__tests__/products.test.js`  

## Dependencies
* `fs-extra`
* `jest`
* `uuid`
