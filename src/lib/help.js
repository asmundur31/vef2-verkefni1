/**
 * Fall sem setur tímann síðan að myndband var búið til á rétt form
 * @param {string} age er fjöldi millisekúndna á strengjaformi frá 1. jan 1970 þangað til að
 * myndband var búið til
 * @returns {string} strengurinn sem gefur til kynna hversu langt síðan að myndband var búið til
 * með tilliti til ára, mánuða, vikna, daga og klukkustunda
 */
export function formatAge(age) {
  const now = new Date();
  const msAge = now.getTime() - parseInt(age, 10);
  const hAge = Math.floor(msAge / (60 * 60 * 1000));
  let s = (hAge === 1 ? `Fyrir ${hAge} klukkustund síðan` : `Fyrir ${hAge} klukkustundum síðan`);
  const dAge = Math.floor(hAge / 24);
  if (dAge >= 1) {
    s = (dAge === 1 ? `Fyrir ${hAge} degi síðan` : `Fyrir ${hAge} dögum síðan`);
  }
  const wAge = Math.floor(dAge / 7);
  if (wAge >= 1) {
    s = (wAge === 1 ? `Fyrir ${wAge} viku síðan` : `Fyrir ${wAge} vikum síðan`);
  }
  const mAge = Math.floor(dAge / 30);
  if (mAge >= 1) {
    s = (mAge === 1 ? `Fyrir ${mAge} mánuði síðan` : `Fyrir ${mAge} mánuðum síðan`);
  }
  const yAge = Math.floor(dAge / 365);
  if (yAge >= 1) {
    s = (yAge === 1 ? `Fyrir ${yAge} ári síðan` : `Fyrir ${yAge} árum síðan`);
  }
  return s;
}

/**
 * Fall sem setur lengd myndbands á rétt form
 * @param {string} time Lengd myndbands í sekúndum á strengjaformi
 * @returns {string} lengd myndbands í mínutum og sekúndum
 */
export function formatTime(time) {
  const totSec = parseInt(time, 10);
  const min = Math.floor(totSec / 60);
  const sec = ((totSec % 60) < 10 ? `0${totSec % 60}` : `${totSec % 60}`);
  return `${min}:${sec}`;
}
