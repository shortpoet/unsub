const MESSAGE_TYPES: Record<string, Record<string, string>> = {
  HAS_DATA: { value: 'HAS_DATA', label: 'Has Data' },
  HAS_MAILTO: { value: 'HAS_MAILTO', label: 'Has Mailto' },
  '--> HAS_MANY_LINKS <--': {
    value: '--> HAS_MANY_LINKS <--',
    label: 'Has Many Links'
  },
  HAS_UNSUB_LINK: { value: 'HAS_UNSUB_LINK', label: 'Has Unsub Link' }
};

export default MESSAGE_TYPES;
