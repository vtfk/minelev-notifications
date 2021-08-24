const pkg = require('../package.json')
const dependencies = pkg.dependencies || {}
const devDependencies = pkg.devDependencies || {}

Object.keys(dependencies).forEach((dependency) => {
  test(`Dependency '${dependency}' loads ok`, () => {
    const module = require(dependency)
    expect(module).toBeTruthy()
  })
})

Object.keys(devDependencies).forEach((dependency) => {
  test(`DevDependency '${dependency}' loads ok`, () => {
    const module = require(dependency)
    expect(module).toBeTruthy()
  })
})
