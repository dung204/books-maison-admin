<p align="center">
  <a href="http://api.books-maison.live/api-docs" target="blank"><img src="src/assets/images/books-maison-logo-dark.svg" width="400" alt="Nest Logo" /></a>
</p>

<p align="center">The Admin panel for Books Maison - an online library web application</p>

> 🚧 The project is currently in development and not yet released. Stay tuned!

## Table of Contents

- [1. Primary Features](#1-primary-features)
- [2. Technology used](#2-technology-used)
- [3. Getting started](#3-getting-started)
  - [3.1. Prerequisites](#31-prerequisites)
  - [3.2. Installation](#32-installation)
- [4. License](#4-license)

## 1. Primary Features

- CRUD (Create, Read, Update, Delete) users, books, authors, checkouts, fines
- User authentication and authorization using JWT (JSON Web Token) & Google OAuth2
- Allowing users to borrow and return books
- Calculating fines for late returns
- Allowing users to pay fines using [Momo E-wallet](https://www.momo.vn/)

> **Note**:
>
> - Whenever a user borrows a book, a checkout record is created with a due date.
> - If the user returns the book after the due date, a fine is calculated based on the number of days the book is overdue.

## 2. Technology used

- [React.js](https://react.dev/): A JavaScript library for building user interfaces
- [Next.js](https://nextjs.org/): The React Framework for the Web
- [Tailwind CSS](https://tailwindcss.com/): A utility-first CSS framework
- [shadcn/ui](https://ui.shadcn.com/): A library of beautifully designed components that you can copy and paste into your apps. Made with Tailwind CSS. Open source.

## 3. Getting started

## 3.1. Prerequisites

You need to have the following installed on your machine:

- [Node.js 22.3.0+](https://nodejs.org/en/download/)
- [pnpm](https://pnpm.io/installation)
- [Git](https://git-scm.com/downloads)

You also need to setup and run the [Books Maison API](https://github.com/dung204/books-maison-backend?tab=readme-ov-file#3-getting-started) locally

## 3.2. Installation

1. Clone the repository:

```bash
git clone https://github.com/dung204/books-maison-frontend.git
```

2. Change into the project directory:

```bash
cd books-maison-frontend
```

3. Install the dependencies:

```bash
pnpm install --frozen-lockfile
```

4. Create a `.env` file in the root of the project. The `.env` **must** contains all variables in the [`.env.example`](.env.example) file.

> **Note**:
>
> - The `NEXT_PUBLIC_JWT_ACCESS_SECRET` and `NEXT_PUBLIC_JWT_REFRESH_SECRET` should be the same as the [`JWT_ACCESS_SECRET` and `JWT_REFRESH_SECRET` in the Books Maison API](https://github.com/dung204/books-maison-backend/blob/b7a0b298f6da27a18e9113ea122a5f078a2149c3/.env.example#L13C1-L13C18), respectively.
> - The `NEXT_PUBLIC_API_ENDPOINT` should be the URL of the Books Maison API, suffixed with `/api/v1`.

5. Run the following command to start the development server:

```bash
pnpm dev
```

6. The application should be running at `http://localhost:<APP_PORT>`, where `<APP_PORT>` is `3000` by default.

## 4. License

This project is licensed under the Unlicense - see the [LICENSE](LICENSE) file for details.
