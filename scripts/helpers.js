export default class Helpers {
  static formatPrice(cents) {
    return '$' + 
      ((cents / 100).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ","))
  }

  static rnd(arr) {
    return arr[Math.floor(Math.random() * arr.length)]
  }

  static slugify(text) {
    return text.toString().toLowerCase()
      .replace(/\s+/g, '-')           // Replace spaces with -
      .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
      .replace(/\-\-+/g, '-')         // Replace multiple - with single -
      .replace(/^-+/, '')             // Trim - from start of text
      .replace(/-+$/, '')             // Trim - from end of text
  }

  static getFunName() {
    const adjectives = ['adorable', 'beautiful', 'clean', 'drab', 'elegant', 
      'fancy', 'glamorous', 'handsome', 'long', 'magnificent', 'old-fashioned', 
      'plain', 'quaint', 'sparkling', 'ugliest', 'unsightly', 'angry', 
      'bewildered', 'clumsy', 'defeated', 'embarrassed', 'fierce', 'grumpy', 
      'helpless', 'itchy', 'jealous', 'lazy', 'mysterious', 'nervous', 
      'obnoxious', 'panicky', 'repulsive', 'scary', 'thoughtless', 'uptight', 
      'worried'];
    const nouns = ['women', 'men', 'children', 'teeth', 'feet', 'people', 
      'leaves', 'mice', 'geese', 'halves', 'knives', 'wives', 'lives', 'elves', 
      'loaves', 'potatoes', 'tomatoes', 'cacti', 'foci', 'fungi', 'nuclei', 
      'syllabuses', 'analyses', 'diagnoses', 'oases', 'theses', 'crises', 
      'phenomena', 'criteria', 'data'];
    
    return [
      Helpers.rnd(adjectives), 
      Helpers.rnd(adjectives),
      Helpers.rnd(nouns)
    ].join('-')
  }
}
