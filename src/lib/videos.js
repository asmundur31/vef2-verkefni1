/* eslint-disable import/no-unresolved */
// eslint-disable-next-line import/no-extraneous-dependencies
import express from 'express';
import util from 'util';
import fs from 'fs';

export const router = express.Router();
const readFileAsync = util.promisify(fs.readFile);

/**
 * Fall sem umlykur async föll og grípur villur
 * @param {function} fn er middleware sem grípa á villur fyrir
 * @returns {function} middleware með villumeðhöndlun
 */
function catchErrors(fn) {
  return (req, res, next) => fn(req, res, next).catch(next);
}

/**
 * Fall sem tekur við gögnum úr json skrá og formatar þau rétt
 * @param {object} gogn JSON gögnin úr videos.json
 * @returns {object} búið að hengja video object-in sjálf við categories í stað
 * fyrir að video id
 */
function formatCategories(gogn) {
  const { videos, categories } = gogn;

  categories.forEach((category) => {
    const vids = []; // Búum til fylki með video object-unum
    category.videos.forEach((videoId) => {
      vids.push(videos.find((vid) => vid.id === videoId));
    });
    // yfirskrifum id fylkið með object fylkinu
    // eslint-disable-next-line no-param-reassign
    category.videos = vids;
  });

  return categories;
}

/**
 * Fall sem tekur við gögnum úr json skrá og formatar þau rétt
 * @param {object} gogn JSON gögnin úr videos.json
 * @returns {object} búið að hengja video object-in sjálf við related í stað
 * fyrir að video id
 */
function formatVideo(videos, vid) {
  const vids = []; // Búum til fylki með video object-unum
  vid.related.forEach((relId) => {
    vids.push(videos.find((v) => v.id === relId));
  });
  // yfirskrifum id fylkið með object fylkinu
  // eslint-disable-next-line no-param-reassign
  vid.related = vids;
  return vid;
}

/**
 * Fall sem að byrtir lista af myndböndum flokkuð efir flokkum
 * @param {object} req Request hlutur
 * @param {object} res Response hlutur
 */
async function listi(req, res) {
  const title = 'Forsíða';
  const headerTitle = 'Fræðslumynd\u00ADbandaleigan';
  const categories = formatCategories(JSON.parse(await readFileAsync('videos.json')));

  return res.render('listi', {
    title,
    headerTitle,
    categories,
  });
}

/**
 * Fall sem að byrtir myndband og tengd myndbönd og myndbandið er ekki til sem beðið er um
 * þá fæst 404 villa
 * @param {object} req Request hlutur
 * @param {object} res Response hlutur
 */
async function video(req, res, next) {
  const { videos } = JSON.parse(await readFileAsync('videos.json'));
  let vid = videos.find((v) => v.id === parseInt(req.params.id, 10));
  if (vid === undefined) {
    return next(); // Video fannst ekki
  }
  vid = formatVideo(videos, vid);
  const { title } = vid;
  const headerTitle = vid.title;
  return res.render('video', {
    title,
    headerTitle,
    video: vid,
  });
}

router.get('/', catchErrors(listi));
router.get('/:id', catchErrors(video));
