document.addEventListener('turbolinks:load', function(){

  let timer = null

  const delayedRequest = () => {
    const source = document.getElementById('source_currency').value
    const target = document.getElementById('target_currency').value
    const amountValue = document.getElementById('amount').value
    clearTimeout(timer)
    if (source !== target) {
      if (amountValue) {
        document.getElementById('result').value = 'Convertendo...'
        timer = setTimeout(() => {
          fetch(`/convert?source_currency=${source}&amount=${amountValue}&target_currency=${target}`)
            .then(res => res.json())
            .then(data => {
              document.getElementById('result').value = `${data.value} ${target}`
            })
        }, 2000)
      }
    } else {
      document.getElementById('result').value = 'ERRO: Moedas iguais.'
    }
  }

  document.getElementById('invert').addEventListener('click', (event) => {
    event.preventDefault()
    let current = document.getElementById('source_currency')
    let target = document.getElementById('target_currency')
    let swap = target.value
    target.value = current.value
    current.value = swap
    delayedRequest();
  })

  document.getElementById('amount').addEventListener('change', () => {
    delayedRequest();
  })

  document.getElementById('source_currency').addEventListener('change', () => {
    delayedRequest();
  })

  document.getElementById('target_currency').addEventListener('change', () => {
    delayedRequest();
  })
})