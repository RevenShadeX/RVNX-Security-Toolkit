# RVNX Security Toolkit

A lightweight, browser-based cybersecurity toolkit built with **HTML, CSS, and JavaScript**.

RVNX Security Toolkit is a personal learning project focused on building practical security utilities while improving my understanding of web development, browser APIs, hashing, encoding, password security, and JSON Web Tokens.

## Features

### SHA-256 Hash Generator

Generate a SHA-256 hash from text directly in the browser using the Web Crypto API.

### Base64 Encoder / Decoder

Encode text into Base64 or decode existing Base64 data.

### Password Security Analyzer

Analyze a password locally based on:

* Password length
* Uppercase characters
* Lowercase characters
* Numbers
* Symbols
* Overall strength

The tool also checks whether the password appears in known breach data using the **Have I Been Pwned Pwned Passwords API**.

The password itself is not sent to the API. The application uses the k-anonymity range method, sending only the first five characters of the password's SHA-1 hash.

### JWT Decoder

Decode the header and payload of a JSON Web Token and display its signature.

This tool is intended for inspection and learning. It **does not verify JWT signatures**.

## Technologies

* HTML5
* CSS3
* JavaScript
* Web Crypto API
* Fetch API
* Have I Been Pwned Pwned Passwords API

## Design

The interface uses a dark, minimal cybersecurity aesthetic with crimson accents.

The layout is responsive and designed to work across:

* Desktop
* Laptop
* Tablet
* Mobile

The project intentionally uses plain HTML, CSS, and JavaScript without a large framework or unnecessary dependencies.

## Project Structure

```text
RVNX-Security-Toolkit/
│
├── index.html
├── style.css
├── script.js
```

## Running Locally

No build system is required.

Clone the repository:

```bash
git clone https://github.com/RevenShadeX/RVNX-Security-Toolkit.git
```

Open the project folder and launch `index.html` in a modern browser.

For the best development experience, a local development server such as VS Code Live Server can also be used.

## Security Notes

This project is primarily intended for **education and authorized use**.

The toolkit does not attempt to exploit systems, bypass authentication, or perform unauthorized security testing.

The password breach checker uses the Pwned Passwords range API so that the complete password is never transmitted to the service.

JWT decoding should not be confused with JWT verification. Decoding a token does not prove that the token is authentic or valid.

## Why I Built This

I built RVNX Security Toolkit as a practical way to combine my interests in **web development and cybersecurity**.

Instead of building another basic webpage, I wanted to create something that contains actual browser-based utilities and gives me experience working with APIs, cryptographic browser features, input handling, error handling, and responsive UI design.

This project will also serve as a foundation for adding more security-related utilities as I continue learning.

## Future Improvements

Possible future additions include:

* URL analyzer
* IP address information tool
* HTTP header analyzer
* Hash identifier
* Password generator
* Improved Unicode support for Base64
* Additional validation and error handling
* More browser-based security utilities

## Disclaimer

RVNX Security Toolkit is an educational project.

Use security tools only on systems, accounts, and data that you own or have explicit permission to test.

## Author

**RevenShadeX**

Personal cybersecurity and web development project.

GitHub: https://github.com/RevenShadeX
