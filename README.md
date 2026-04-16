# Gender Classifier

A small Express app that guesses gender from a first name using the `Genderize.io` service.

## Quick Start

1. Install dependencies:
```bash
npm install
```
2. Start the server:
```bash
node index.js
```

The app listens on port `3000` by default.

## API

`GET /api/classify?name=<firstName>`

## What it returns

A JSON object containing:

- `name`
- `gender`
- `probability`
- `sample_size`
- `is_confident`

## Possible errors

- `400`: missing or empty `name`
- `422`: `name` is not a string
- `502`: upstream API failure
- `500`: server error

## Notes

- Built with `express` and `axios`.


