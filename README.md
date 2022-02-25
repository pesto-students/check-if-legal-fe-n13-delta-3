<!-- PROJECT LOGO -->
<p align="center">
    <img src="./public/assets/logo-light.png" alt="Logo"  >
</p>
Check if Legal is a online legal paper verification platform, where you are allowed to select from expert and verified lawyers based on your city.
<br />
<br />
This repo contains front-end source code.<br/>
For back-end repository <a href="https://github.com/pesto-students/check-if-legal-be-n13-delta-3">click here</a>.

<!-- TABLE OF CONTENTS -->
<br/>

# Table of Contents

1. [Demo](#demo)
2. [Installation](#installation)
3. [Technology Stack](#technology-stack)
4. [Authors](#authors)
5. [License](#license)

<br/>

# Demo

[Live Demo](https://checkiflegal.in/)

<br/>

Please Note:

-  We recommend using this app in latest browser with javascript support.
-  Try demo credentials if you not comfortable with Google SignIn OAuth.
-  Payment Gateway is in test mode, so use <code>4111 1111 1111</code> as card no to continue.

<br/>
Test Credentials:

-  For Admin
   -  [Admin Login Page Link](https://checkiflegal.in/#/login/admin)
   -  Username: admin
   -  Password: admin
-  For User/Lawyer
   -  Click on "Try as Demo" button
      <br/>

# Installation

1. Clone the repo
   ```sh
   git clone https://github.com/pesto-students/check-if-legal-fe-n13-delta-3.git
   ```
2. Set environment variables

REACT_APP_API_BASE_URL=https://api.checkiflegal.com/<br />
REACT_APP_GOOGLE_CLIENT_ID=<br />

3. Install NPM packages
   ```sh
   npm install
   ```
4. Run
   ```sh
   npm start
   ```
5. Open http://localhost:3000 to view it in the browser

6. Run Test cases
   ```sh
   npm test
   ```
   <br/>

# Technology Stack

We tried to use a completely modern tech stack while testing out some new technologies that we had never used before. This resulted in a fast, performant, and easily-extensible web app that should be fairly future-proof for the coming next several years. We used:

-  [React JS](https://reactjs.org/)
-  [TypeScript](https://www.typescriptlang.org/)
-  [Chakra UI](https://chakra-ui.com)
-  [Axios](https://axios-http.com/docs/intro)
-  [Zustand](https://zustand.surge.sh/) (Client State)
-  [React Query](https://react-query.tanstack.com/) (Server State)

<br/>

# Authors

-  [Kunal Gosrani](https://github.com/kunalgosrani)
-  [Sai Tharun](https://github.com/saitharunsai)

<br/>

# Mentor

-  [Rachit Srivastava](https://github.com/rachit1994)

<br/>

# License

[MIT](https://opensource.org/licenses/MIT)
