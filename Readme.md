# Simple Fictitious Banking Application API

## Table of Contents

- [Description](#description)
- [Features](#features)
- [API Endpoints](#api-endpoints)
- [Requirements](#requirements)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [Testing](#testing)
- [Documentation](#documentation)
- [Contributing](#contributing)
- [License](#license)

## Description

This project is a simple fictitious banking application API built with Node.js and Express. It provides authentication, transaction, and user account management endpoints.

## Features

- User Registration and Authentication
- Token-based Authentication with JWT
- Transaction Operations (Transfer, Deposit, Withdrawal)
- Account Balance Retrieval
- Email Verification for User Registration

## API Endpoints

- [POST /api/register](#post-apiregister) - User registration
- [POST /api/login](#post-apilogin) - User login
- [POST /api/logout](#post-apilogout) - User logout
- [GET /api/balance](#get-apibalance) - Get account balance
- [POST /api/transfer](#post-apitransfer) - Make a transfer
- [POST /api/deposit](#post-apideposit) - Make a deposit
- [POST /api/withdraw](#post-apiwithdraw) - Make a withdrawal
- [GET /api/transactions](#get-apitransactions) - List user transactions

## Requirements

- Node.js (>= version 12)
- MongoDB

## Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/simple-fictitious-banking-application-api.git
```
2. Run project

```bash
npm start
```

3. Run with Docker
```bash
docker build simple-fictious-bank -d
docker compose up
```
## Documentation
- Swagger[]
- Postman


