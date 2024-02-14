import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

let infracts = JSON.parse(localStorage.getItem("infractions"));

if (!infracts) {
  infracts = [];
}

renderInfo();

const yoniSucksEl = document.querySelector('button');
const yoniHatersEl = document.querySelector('h3');
const infractReason = document.querySelector('input');

let infractNum = infracts.length;
yoniHatersEl.innerHTML = `Yoni Infractions: ${infractNum}`;
yoniSucksEl.addEventListener('click', () => {
  if (infractReason.value !== '') {
    addInfraction();
    infractNum++;
    yoniHatersEl.innerHTML = `Yoni Infractions: ${infractNum}`;

    renderInfo();
    infractReason.value = "";
  
    localStorage.setItem("infractions", JSON.stringify(infracts));
  }
})

function addInfraction() {
  const day = dayjs();
  const time = day.format('MM/DD/YYYY HH:mm:s');
  infracts.push({
    reason: `${infractReason.value}`,
    dayTime: time
  });
}

function renderInfo() {
  const infractionsEl = document.querySelector('.js-infractions');
  let HTML = "<div class='infract-list'>";

  for (let i = 0; i < infracts.length; i++) {

    HTML += 
    `
    <div>
      #${i+1}: 
      <span class='list-item'>
        ${infracts[i].reason}
      <span/>  
      <span class="list-time">
        created on ${infracts[i].dayTime}
      <span/>
      <button class='remove-button' data-id="${i}">
        Remove Infraction
      </button>
    </div>
    `;
  }


  HTML += '</div>'
  infractionsEl.innerHTML = HTML;

  document.querySelectorAll('.remove-button').forEach(button => {
    button.addEventListener('click', () => {
      const index = button.dataset.id;
      infracts.splice(index);
      
      localStorage.setItem("infractions", JSON.stringify(infracts));
      infractNum--;
      yoniHatersEl.innerHTML = `Yoni Infractions: ${infractNum}`;
      renderInfo();
    })
  })
}