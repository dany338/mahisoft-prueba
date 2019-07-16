const $numFriendlyOneInput = document.querySelector(".js-number1-input")
const $numFriendlyTwoInput = document.querySelector(".js-number2-input")
const $friendlyButton = document.querySelector(".js-friendly-button")
const $messageArticle = document.querySelector(".js-message")
const $messageArticleBody = document.querySelector(".js-message-body")

const $arraysPricesInput = document.querySelector(".js-prices-input")
const $dayVerificInput = document.querySelector(".js-day-input")
const $pricesButton = document.querySelector(".js-prices-button")
const $messageArticlePrices = document.querySelector(".js-message-prices")
const $messageArticlePricesBody = document.querySelector(".js-message-prices-body")

const $unionsOneInput = document.querySelector(".js-unions-one-input")
const $unionsTwoInput = document.querySelector(".js-unions-two-input")
const $unionsButton = document.querySelector(".js-unions-button")
const $messageArticleUnions = document.querySelector(".js-message-unions")
const $messageArticleUnionsBody = document.querySelector(".js-message-unions-body")

const verificDivisors = (number) => {
  let sum = 0
  for (i=1; i<=(number/2); i++) {
    if (number%i==0) {
      sum += i
    }
  }
  return sum
}

const convertStringToArray = (string) => JSON.parse("[" + string + "]")

const calculateMaxGain = (array, day) => {
  const newArray = array.slice(day)
  const maxGain  = Math.max(...newArray)
  return maxGain
}

const unionsOnceTwoList = (unionOne, unionTwo) => {
  const object = {}
  const result = []
  let newArray = [...unionOne, ...unionTwo]
  newArray = newArray.sort((a, b) => a - b)
  newArray.forEach((i) => {
    if (!object[i]) {
      object[i] = 0
    }
    object[i] += 1
  })

  for (const prop in object) {
    if (object[prop] == 1) {
      result.push(parseInt(prop));
    }
  }

  return result
}

const unionTextList = (unionOne, unionTwo, unions) => `
  The union disjunt of: <b>[${unionOne.join(',')}]</b> and: <b>[${unionTwo.join(',')}]</b> is: <b>[${unions.join(',')}]</b>
`

/*
 * By Daniel Explain: El evento click en el botón realiza varios procedimientos entre ellos convertir
 * cada posible número amigo a número, luego se llama a un arrow function para verificar los divisores y por ende sumar el total
 * de estos divisores para cada número. Estando en la función 1 es divisor siempre por lo que el cilo inicia desde esa iteracción
 * luego se realiza la operación de modulo % para obtener si el resultado es divisible por el item "i" si es asi en el acomulador
 * va sumando los divisores - divisibles y retorna el resultado sumado.
 */
$friendlyButton.addEventListener("click", () => {
  const numberOne = Number($numFriendlyOneInput.value)
  const numberTwo = Number($numFriendlyTwoInput.value)
  console.log(numberOne, numberTwo)
  if(numberOne !== '' && numberTwo !== '') {
    const resultDivisorOne = verificDivisors(numberOne)
    const resultDivisorTwo = verificDivisors(numberTwo)
    console.log(resultDivisorOne, resultDivisorTwo)
    let classApply = 'is-danger'
    if( (resultDivisorOne === numberTwo) && (resultDivisorTwo === numberOne) ) {
      console.log('Son amigos')
      classApply = 'is-success'
      $messageArticleBody.innerHTML = 'The numbers are friendly'
    } else {
      $messageArticleBody.innerHTML = 'The numbers not are friendly'
    }
    $messageArticle.classList.add(classApply)
    $messageArticle.classList.remove('is-hidden')
  } else {
    alert('Ingrese números amigos');
  }
})

/*
 * By Daniel Explain: El evento click en el botón realiza varios procedimientos entre ellos convertir
 * el string de los precios de las acciones a un array, el dia del input castearlo a numero luego de eso llama al arrow functions para
 * obtener la maxima ganancia de acuerdo al dia la acción correspondiente posterior al dia a calcular. Estando en la función básicamente
 * cortamos el array de precios desde el dia a buscar comparar y luego de eso buscamos el valor de la acción precio mayor.
 */
$pricesButton.addEventListener("click", () => {
  let arrayPrices = $arraysPricesInput.value
  const day = Number($dayVerificInput.value)
  console.log(arrayPrices, day)
  if(arrayPrices !== '' && day !== '' && day !== NaN) {
    arrayPrices = convertStringToArray(arrayPrices)
    const maxGain = calculateMaxGain(arrayPrices, day)
    console.log(maxGain)
    $messageArticlePricesBody.innerHTML = 'Max Gain for the day: ' + day + ' is: ' + maxGain
    $messageArticlePrices.classList.remove('is-hidden')
  } else {
    alert('Ingrese el array de precios separados por coma y el dia de la acción a comparar');
  }
})

/*
 * By Daniel Explain: El evento click en el botón realiza varios procedimientos entre ellos convertir
 * el string de cada uno de los inputs a un array, luego de eso llama al arrow functions para unir los dos arrays
 * y mostrar la unión disjunta; dentro de la funcion de unión organiza los elementos de mayor a menor y despues hace
 * un recorrido para contar las ocurrencias de cada elemento luego de eso recorremos el objecto para verificar que
 * elementos tienen una sola ocurrencia y eso lo adicionamos al array de resultados.
 */
$unionsButton.addEventListener("click", () => {
  let unionsOne = $unionsOneInput.value
  let unionsTwo = $unionsTwoInput.value
  console.log(unionsOne, unionsTwo)
  if(unionsOne !== '' && unionsTwo !== '') {
    unionsOne = convertStringToArray(unionsOne)
    unionsTwo = convertStringToArray(unionsTwo)

    const unions = unionsOnceTwoList(unionsOne, unionsTwo)
    console.log(unions)
    $messageArticleUnionsBody.innerHTML = unionTextList(unionsOne, unionsTwo, unions)
    $messageArticleUnions.classList.remove('is-hidden')
  } else {
    alert('Ingrese el array de precios separados por coma y el dia de la acción a comparar');
  }
})
