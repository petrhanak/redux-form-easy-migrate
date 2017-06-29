# Redux form v5 to v6
 
izi pizi lemon squeezy redux form migration for Richuncles

## Usage

```bash
yarn install
yarn start
```

## How to do it?

1. Add webpack alias for `redux-form-legacy` 
2. `import { reduxForm } from 'redux-form-legacy'` for all current forms
3. Wrap all form input components in `withLegacyForm` and `withLegacyComponent` HoC