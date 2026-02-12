/** @type {import('next').NextConfig} */
const basePath = process.env.NODE_ENV === "production" ? "/YE_website" : "";
const nextConfig = {
  output: "export",
  basePath,
  assetPrefix: basePath ? `${basePath}/` : "",
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
