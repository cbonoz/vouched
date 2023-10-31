import UiLayoutWrapper from './lib/UiLayoutWrapper';

import './globals.css';
import { ClerkProvider } from '@clerk/nextjs';


export default function RootLayout({ children }) {

  return (<html>
    <head>
      <link rel="favicon" href="/favicon.ico" sizes="any" />
      {/* <link rel="icon" href="/favicons/icon.ico" type="image/svg+xml" /> */}
      {/* <link rel="apple-touch-icon" href="/favicons/apple-touch-icon.png" /> */}
      {/* <link rel="manifest" href="/favicons/manifest.json" /> */}

      <title>Vouched | A private referral network</title>
      <meta name="description" content="Privy Auth Starter" />
    </head>
    <body>
    <ClerkProvider>
        <UiLayoutWrapper>
          {children}
        </UiLayoutWrapper>
    </ClerkProvider>
    </body>
  </html>
  )

}