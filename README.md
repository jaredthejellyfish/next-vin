# vin-decode.com

Welcome to the official GitHub repository for [VIN-Decode.com](https://vin-decode.com), a powerful and user-friendly platform for decoding Vehicle Identification Numbers (VINs). Our service provides detailed information about vehicles based on their VIN, including manufacturer details, physical characteristics, engine specs, safety features, and more.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Features

- **VIN Lookup:** Easily decode VINs to retrieve detailed vehicle information.
- **CAPTCHA Protection:** Secure your queries with Cloudflare Turnstile CAPTCHA.
- **Responsive Design:** Accessible across various devices with a modern and responsive UI.
- **Server-Side VIN Data Fetching:** Ensures secure and accurate data retrieval.
- **Dynamic Tables:** Organized and categorized vehicle data for easy navigation.

## Technologies Used

- **Frontend:**
  - [Next.js](https://nextjs.org/) - React framework for building fast and SEO-friendly websites.
  - [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework for styling.
  - [React](https://reactjs.org/) - JavaScript library for building user interfaces.

- **Backend:**
  - [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction) - Server-side logic and API route handling.
  - [Cloudflare Turnstile](https://developers.cloudflare.com/turnstile/) - CAPTCHA protection for form submissions.

- **Deployment:**
  - Hosted on [Vercel](https://vercel.com/) for fast and reliable deployment.

## Installation

### Prerequisites

- Node.js and npm installed on your machine.
- A Cloudflare account to set up Turnstile CAPTCHA.
- API keys and environment variables configured.

### Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/vin-decode.com.git
   cd vin-decode.com
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env.local` file in the root of the project and add your API keys:

   ```plaintext
   NEXT_PUBLIC_TURNSLITE_SITE_KEY=your-turnstile-site-key
   CLOUDFLARE_TURNSTILE_SECRET_KEY=your-turnstile-secret-key
   ```

4. **Run the development server:**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Usage

1. **Enter a VIN:** Input the VIN into the search field on the homepage.
2. **Complete the CAPTCHA:** Verify that you're human by completing the Turnstile CAPTCHA.
3. **View the Results:** Get detailed vehicle information based on the provided VIN.

## Contributing

We welcome contributions to improve VIN-Decode.com! Here's how you can contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes and commit them (`git commit -m 'Add a new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Create a pull request.

Please ensure your code adheres to the existing code style and includes relevant tests.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

If you have any questions or need further assistance, feel free to reach out:

- Email: ger.almenara@gmail.com
- Website: [vin-decode.com](https://vin-decode.com)

---
