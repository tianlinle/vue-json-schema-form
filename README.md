# tian-json-schema-form

## Notes
+ Unsupport keyword 'enum' of json-schema because it can not define a title for each enum value. Use 'anyOf' instead. For example
```javascript
{anyOf: [{const: 1, title: 'title1'}, {const: 2, title: 'title2'}]}
```
+ Return undefined if text input or number input is empty.
