import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link
          rel="icon"
          href="/books-logo.svg"
          sizes="any"
          type="image/svg+xml"
        />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
        {/**
         * Montserrat 600
         */}
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@600&display=swap"
          rel="stylesheet"
        ></link>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
