const KEYS_TO_SKIP = [
  '_opts',
  '_interfaceLanguage',
  '_language',
  '_defaultLanguage',
  '_defaultLanguageFirstLevelKeys',
  '_props'
];

const skipTranslationKeys = (keys) => Object.keys({ ...keys }).filter(key => !KEYS_TO_SKIP.includes(key));

export default skipTranslationKeys;
