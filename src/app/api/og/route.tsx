/* eslint-disable @next/next/no-img-elemnt */
// @ts-nocheck

import { ImageResponse } from "next/og";
// App router includes @vercel/og.
// No need to install it.

export const runtime = "edge";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const hasTitle = searchParams.has("title");
    const title = hasTitle ? searchParams.get("title")?.slice(0, 100) : "Hello";

    const fontData = await fetch(
      new URL("/public/fonts/MonaspaceArgon-Bold.woff", import.meta.url)
    ).then((r) => r.arrayBuffer());

    const imageData = await fetch(
      new URL("/public/profile-circle.png", import.meta.url)
    ).then((r) => r.arrayBuffer());

    return new ImageResponse(
      (
        //   <div
        //     style={{
        //       fontSize: 40,
        //       color: "black",
        //       background: "white",
        //       width: "100%",
        //       height: "100%",
        //       padding: "50px 200px",
        //       textAlign: "center",
        //       justifyContent: "center",
        //       alignItems: "center",
        //     }}
        //   >
        //     👋 Hello
        //   </div>

        <div tw="flex flex-col w-full h-full items-center justify-center bg-white">
          <div tw="bg-gray-50 flex w-full">
            <div tw="flex flex-col md:flex-row w-full py-12 px-4 md:items-center justify-between p-8">
              <img
                width={64}
                height={64}
                src={imageData}
                alt="Workflow"
              />
              <h2 tw="flex flex-col text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 text-left">
                <span style={{ fontFamily: "Monaspace Argon Bold" }}>
                  Ready to dive in?
                </span>
                <span tw="text-indigo-600">Start your free trial today.</span>
              </h2>
              <div tw="mt-8 flex md:mt-0">
                <div tw="flex rounded-md shadow">
                  <a tw="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-5 py-3 text-base font-medium text-white">
                    👋 Hello
                  </a>
                </div>
                <div tw="ml-3 flex rounded-md shadow">
                  <a tw="flex items-center justify-center rounded-md border border-transparent bg-white px-5 py-3 text-base font-medium text-indigo-600">
                    Learn more
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        emoji: "twemoji",
        fonts: [
          {
            name: "Monaspace Argon Bold",
            data: fontData,
            style: "normal",
          },
        ],
      }
    );
  } catch (error) {
    return new Response("Failed to generate image", { status: 500 });
  }
}
