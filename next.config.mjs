/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "export",
  images: { unoptimized: true },
  basePath: "/cogent-ai-agency",
  assetPrefix: "/cogent-ai-agency/",
};

export default nextConfig;
