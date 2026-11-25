import nextra from 'nextra';

const withNextra = nextra({
  defaultShowCopyCode: true,
  search: { codeblocks: false },
});

export default withNextra({
  reactStrictMode: true,
  async redirects() {
    // The examples page used to be /usages.
    return [{ source: '/usages', destination: '/examples', permanent: true }];
  },
});
