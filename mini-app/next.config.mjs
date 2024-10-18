import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./src/core/i18n/i18n.ts')

/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
}

export default withNextIntl(nextConfig)
