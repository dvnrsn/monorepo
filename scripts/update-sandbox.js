// This script is to update all the sandboxed `@remix-pwa/*` packages to the latest version

import { writeFile } from 'fs';

const importJson = async (/** @type {string} */ path) => {
  try {
    return await import(path, { assert: { type: 'json' } });
  } catch (err) {
    // @ts-ignore
    if (err.code === 'ERR_IMPORT_ATTRIBUTE_MISSING') {
      return await import(path, { with: { type: 'json' } });
    } else {
      console.error('💥 Error occured:', '\n\n', err);
      process.exit(1);
    }
  }
};

const sandboxPackageJson = await importJson('../playground/package.json');
const deps = sandboxPackageJson.default.dependencies;
const devDeps = sandboxPackageJson.default.devDependencies;

/**
 * @type {string[]}
 */
const remixPwaPackages = [];

Object.keys(deps).forEach(dep => {
  if (dep.startsWith('@remix-pwa')) {
    remixPwaPackages.push(dep);
  }
});

Object.keys(devDeps).forEach(dep => {
  if (dep.startsWith('@remix-pwa')) {
    remixPwaPackages.push(dep);
  }
});

await Promise.allSettled(remixPwaPackages.map(async pkg => {
  const pkgPath = pkg.replace('@remix-pwa/', '');

  const pkgJson = await importJson(`../packages/${pkgPath}/package.json`);

  // @ts-ignore
  if (deps[pkg]) {
    // @ts-ignore
    console.log(`Updating ${pkg} from ${deps[pkg]} to ${pkgJson.default.version}`);
    // @ts-ignore
    deps[pkg] = pkgJson.default.version;
  } else {
    // @ts-ignore
    console.log(`Updating ${pkg} from ${devDeps[pkg]} to ${pkgJson.default.version}`);
    // @ts-ignore
    devDeps[pkg] = pkgJson.default.version;
  }
}));

writeFile(
  './package.json',
  JSON.stringify(sandboxPackageJson.default, null, 2),
  { encoding: 'utf-8' },
  err => {
    if (err) 
      console.error('Error updating sandbox packages', err);
    else 
      console.log('Sandbox packages updated successfully');
  }
);
