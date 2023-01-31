import React from "react";
import Head from "next/head";
type Props = { title?: string; desc?: string };

export default function HeadComponent({ title }: Props) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content="Bilirim Bilgi Yarışması" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
}
