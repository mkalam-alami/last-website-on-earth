import * as faker from 'faker';


const header =
  `<table>
    <tr>
      <th>Station</th>
      <th>Status</th>
      <th>Comms</th>
      <th>Frequency</th>
    </tr>
`
const footer = `
</table>`

let active = header, rogue = header, inactive = footer

for (let i = 0; i < 583; i++) {
  const info = generate(i)
  const text = `  <tr>
  <td>TEP-${padLeft(info.number, 3)}</td>
  <td>${info.state} ${info.date ? info.date + ' ' : ''}${info.reason ? '(' + info.reason + ')' : ''}</td>
  <td>${info.comms}</td>
  <td>${info.freq}</td>
</tr>
`
  if (info.state === 'Active') {
    active += text
  } else if (info.state === 'Rogue') {
    rogue += text
  } else {
    inactive = text + inactive
  }
}

active = active + footer
rogue = rogue + footer
inactive = header + inactive

console.log(active, '\n\n\n\n', rogue, '\n\n\n\n', inactive)

function generate(number: number) {
  let state: string;
  let date = ''
  let reason = ''
  let comms = ''
  let freq = ''

  const n = Math.random();
  if (number < 74) {
    state = 'Destroyed';
    reason = 'Orbit regulation software failure';
    if (Math.random() > 0.6) freq = randomFreq()
    if (Math.random() > 0.9 || freq) comms = randomCommsName()
  } else if (n < 0.13) {
    state = 'Active';
    freq = randomFreq()
    comms = randomCommsName()
    if (Math.random() < 0.1) {
      reason = 'Escape trajectory'
    }
  } else if (n < 0.18) {
    state = 'Rogue';
    reason = randomIn([
      'No contact', 'No contact', 'No contact', 'No contact', 'No contact', 'No contact', 'No contact', 'No contact',
      'Passive hostile behaviour', 'Passive hostile behaviour', 'Passive hostile behaviour', 
      'Active hostile behaviour, AVOID ORBIT MATCH AT ALL COSTS!'
    ])
    if (reason.indexOf('Active') === -1) freq = randomFreq()
    if (Math.random() > 0.3) comms = randomCommsName()
  } else if (n < 0.25) {
    state = 'Ghost';
    reason = randomIn([
      'All passengers left',
      'All passengers dead',
      'Escape trajectory', 'Escape trajectory', 'Escape trajectory',
      'Empty for unknown reasons', 'Empty for unknown reasons'
    ])
  } else if (n < 0.85) {
    state = 'Destroyed'
    date = randomDate()
    reason = randomIn([
      'Oxygen recycling failure', 'Oxygen recycling failure',
      'Water recycling failure', 'Water recycling failure',
      'Hull breach',
      'Unusable greenhouse', 'Unusable greenhouse',
      'Depressurization', 'Depressurization', 'Depressurization',
      'Reactor explosion',
      'Fire related incident',
      'Electrics related incident',
      'Unknown', 'Unknown', 'Unknown'
    ])
    if (Math.random() > 0.6) freq = randomFreq()
    if (Math.random() > 0.9 || freq) comms = randomCommsName()
  } else {
    state = 'Unknown'
    reason = randomIn([
      '', '', '',
      'Re-entered atmosphere',
      'Escape trajectory, no contact', 'Escape trajectory, no contact'
    ])
    if (reason && Math.random() > 0.4) freq = randomFreq()
    if (reason && (Math.random() > 0.2 || freq)) comms = randomCommsName()
  }

  return {
    number,
    state,
    date,
    reason,
    comms,
    freq
  }
}

function randomFreq(): string {
  return '1.' + padLeft(Math.floor((0.2 + Math.random() * 0.6) * 1000), 3) + ' GHz';
}

function randomCommsName() {
  const n2 = Math.random();
  if (n2 < 0.7) {
    return faker.name.firstName() + ' ' + faker.name.lastName()
  } else {
    return faker.name.firstName();
  }
}

function randomDate() {
  return faker.date.month({ abbr: true }) + ' ' + Math.floor(2078 + Math.random() * (2143 - 2078))
}

function randomIn(array: string[]) {
  return array[Math.floor(Math.random() * array.length)]
}

function padLeft(data, size, paddingChar?) {
  return (new Array(size + 1).join(paddingChar || '0') + String(data)).slice(-size);
}
