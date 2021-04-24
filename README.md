# Supporting API endpoints for https://actuallycolab.org

This repository is not the core service for Actually Colab.
View [Desktop](https://github.com/actually-colab/desktop) and [Editor](https://github.com/actually-colab/editor) if that's what you're looking for.

## Setup

1.) Install dependencies

```bash
yarn install
```

2.) Install dynamodb local

```bash
yarn sls dynamodb install
```

3.) Create a folder for dynamodb

```bash
mkdir ./.dynamodb/db
```

4.) Run the dev environment locally

```bash
yarn start
```
