# Clean it
rm -rf dist/

# Compile babel sources
NODE_ENV=production babel --ignore src/__tests__,src/__benchmarks__ src -d dist

# Copy files
cp package.json dist/package.json
cp README.md dist/README.md
