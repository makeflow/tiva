# tiva

## Examples

```ts
const validatorHelper = new ValidatorHelper(
  {
    project: Path.resolve(__dirname, '../test/tsconfig.json'),
    module: Path.resolve(__dirname, '../test/a.ts'),
    typeName: 'AAA',
  },
  Path.resolve(__dirname, '../test/config.js'),
);

validatorHelper.validate(
  {
    t: 'b',
    aa: 2,
  },
  message => {
    console.log('caller rejcet: ' + message.toString());
  },
  message => {
    console.log('caller resolve: ' + message);
  },
);
```
