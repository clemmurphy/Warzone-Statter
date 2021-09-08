document.addEventListener('DOMContentLoaded', () => {

  const jkrBtns = document.querySelectorAll('.jkr-btns')
  const usernameInput = document.getElementById('username')
  const platformInput = document.getElementById('platform')
  const getBtn = document.getElementById('submit')

  const statsDiv = document.querySelector('.stats')
  const nameDisplay = document.getElementById('name')
  const winsDisplay = document.getElementById('wins')
  const killsDisplay = document.getElementById('kills')
  const kdDisplay = document.getElementById('kd')

  let username = ''
  let platform = ''

  let name = ''
  let wins = ''
  let kills = ''
  let kd = ''

  const theBoys = {
    clem: {
      username: 'Clem%25232584',
      platform: 'battle'
    },
    james: {
      username: 'RaJames%252321320',
      platform: 'battle'
    },
    gene: {
      username: 'Geno%252321795',
      platform: 'battle'
    },
    louis: {
      username: 'Loupo#0',
      platform: 'xbl'
    },
    brad: {
      username: 'Bradsok ZFH#9072351',
      platform: 'xbl'
    }
  }

  usernameInput.addEventListener('input', () => {
    username = usernameInput.value
    name = usernameInput.value
    console.log(username)
  })
  
  platformInput.addEventListener('change', () => {
    platform = platformInput.value
    console.log(platform)
  })

  getBtn.addEventListener('click', (e) => {
    e.preventDefault()
    getData(username, platform)
  })

  jkrBtns.forEach(button => {
    button.addEventListener('click', (event) => { 
      const n = event.target.id
      name = n
      getData(theBoys[n].username, theBoys[n].platform)  
    })
  })

  function showData() {
    nameDisplay.innerText = name
    winsDisplay.innerText = wins
    killsDisplay.innerText = kills
    kdDisplay.innerText = kd
    statsDiv.style.display = 'block'
  }

  async function getData(user, plat) {
    try {
      const response = await fetch(`https://call-of-duty-modern-warfare.p.rapidapi.com/warzone/${user}/${plat}`,
        {
          'mode': 'cors',  
          'method': 'GET',
          'headers': {
            'x-rapidapi-host': 'call-of-duty-modern-warfare.p.rapidapi.com',
            'x-rapidapi-key': `${API_KEY}`
          }
        })
      const res = await response.json()
      console.log(res)
      name = user
      wins = res.br.wins
      kills = res.br.kills
      kd = res.br.kdRatio.toFixed(2)
      showData()
    } catch (error) {
      console.log(error)
    }
  }

})