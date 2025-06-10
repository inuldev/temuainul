import type { NextConfig } from "next";
<<<<<<< HEAD
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/config.ts");
=======
>>>>>>> 78fdcc1 (prepare for part 2)

const nextConfig: NextConfig = {
  /* config options here */
};

<<<<<<< HEAD
export default withNextIntl(nextConfig);
=======
export default nextConfig;
>>>>>>> 78fdcc1 (prepare for part 2)
