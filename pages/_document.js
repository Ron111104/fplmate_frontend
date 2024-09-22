import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="description" content="AI-driven insights and data-centric recommendations for your Fantasy Premier League." />
        <link rel="icon" href="/assets/logo.png" />
        <title>FPLMate</title> {/* Note: Title is typically set in pages */}
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
