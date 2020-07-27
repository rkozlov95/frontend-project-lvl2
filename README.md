# Gendiff
[![Maintainability](https://api.codeclimate.com/v1/badges/800c38252522bf76542c/maintainability)](https://codeclimate.com/github/rkozlov95/frontend-project-lvl2/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/800c38252522bf76542c/test_coverage)](https://codeclimate.com/github/rkozlov95/frontend-project-lvl2/test_coverage)
[![Actions Status](https://github.com/rkozlov95/frontend-project-lvl2/workflows/Node.js%20CI/badge.svg)](https://github.com/rkozlov95/frontend-project-lvl2/actions?query=workflow%3A"Node.js+CI")

## Description
Utility for finding differences in configuration files. Supported types: YML, JSON, INI.

## Install & Build

    $ make install
    $ make build

## Run tests

    $ make test

## Usage

    $ gendiff pathToFile1 pathToFile2

### Comparison of configuration files, stylish output

    $ gendiff pathToFile1 pathToFile2

[![asciicast](https://asciinema.org/a/350046.svg)](https://asciinema.org/a/350046)

### Comparison of configuration files, JSON output

    $ gendiff --format json pathToFile1 pathToFile2

[![asciicast](https://asciinema.org/a/350048.svg)](https://asciinema.org/a/350048)

### Comparison of configuration files, plain output

    $ gendiff --format plain pathToFile1 pathToFile2

[![asciicast](https://asciinema.org/a/350047.svg)](https://asciinema.org/a/350047)
