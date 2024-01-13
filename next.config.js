// @ts-check

/**
 * @type {import('next').NextConfig}
 **/

const nextConfig = {
  cleanDistDir: false,
  webpack: (
    config,
    { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack },
  ) => {
    config.experiments = {
      syncWebAssembly: true,
      layers: true, // I have no idea what this does, but when it was disabled I got the error "'entryOptions.layer' is only allowed when 'experiments.layers' is enabled"
    };

    config.resolve.extensions.push(".wgsl");

    config.module.rules.push({
      test: /\.wgsl$/i,
      use: [
        {
          loader: "@use-gpu/wgsl-loader",
          options: { minify: !dev },
        },
      ],
    });

    return config;
  },
};

module.exports = nextConfig;
