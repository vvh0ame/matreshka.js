# matreshka.js
Mobile-API for [matreshka](https://matrp.ru) online game about Russia in which you can immerse yourself in the gameplay with maximum comfort

## Example
```JavaScript
async function main() {
	const { Matreshka } = require("./matreshka.js")
	const matreshka = new Matreshka()
	await matreshka.login("email", "password")
}

main()
```

