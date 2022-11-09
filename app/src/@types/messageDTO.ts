import { GeoData } from './geoData';

interface MessageDTO {
  gmailId: string;
  labelIds: string[];
  snippet: string;
  internalDate: string;
  dateParsed: Date;
  from?: string | null;
  received?: string | null;
  receivedSPF?: string | null;
  subject?: string | null;
  listUnsubscribe?: string | null;
  mailto?: string | null;
  status?: AllowedStatusTypes;
  link?: string | null;
  links?: Record<string, string>[] | null;
  googleSheetsLink?: string | null;
  domain?: string | null;
  geoData?: GeoData[] | null;
}

const domain_regex = /@([a-zA-Z0-9-.]+)/;

export const ALLOWED_STATUS_TYPES = [
  'HAS_UNSUB_LINK',
  'HAS_MAILTO',
  'HAS_BOTH',
  '--> HAS_MANY_LINKS <--',
  'HAS_DATA',
  ''
] as const;

export type AllowedStatusTypes = typeof ALLOWED_STATUS_TYPES[number];

// export type AllowedStatusTypes =
//   | 'HAS_UNSUB_LINK'
//   | 'HAS_MAILTO'
//   | 'HAS_BOTH'
//   | '--> HAS_MANY_LINKS <--'
//   | 'HAS_DATA'
//   | '';
export class GmailMessageDTO implements Required<MessageDTO> {
  constructor({
    gmailId,
    labelIds,
    snippet,
    internalDate,
    dateParsed,
    from,
    received,
    receivedSPF,
    subject,
    listUnsubscribe,
    mailto,
    links,
    status,
    geoData
  }: {
    gmailId: string;
    labelIds: string[];
    snippet: string;
    internalDate: string;
    dateParsed: Date;
    from: string | null;
    received: string | null;
    receivedSPF: string | null;
    subject: string | null;
    listUnsubscribe?: string | null;
    mailto?: string | null;
    status?: AllowedStatusTypes;
    link?: string | null;
    links?: Record<string, string>[] | null;
    googleSheetsLink?: string | null;
    domain?: string | null;
    geoData?: GeoData[] | null;
  }) {
    this.gmailId = gmailId;
    this.labelIds = labelIds;
    this.dateParsed = dateParsed;
    this.internalDate = internalDate;
    this.from = from || '';
    this.received = received || '';
    this.receivedSPF = receivedSPF || '';
    this.subject = subject || '';
    this.listUnsubscribe = listUnsubscribe || '';
    this.mailto = mailto || '';
    this.snippet = snippet || '';
    this.status = status || '';
    this.link = `https://mail.google.com/mail/u/0/#inbox/${gmailId}`;
    this.links = links || [];
    this.googleSheetsLink = `=HYPERLINK("https://mail.google.com/mail/u/0/#inbox/${this.gmailId}#", "View")`;
    this.domain = this.from.match(domain_regex)?.[1] || '';
    this.geoData = geoData || null;
  }
  gmailId: string;
  labelIds: string[];
  snippet: string;
  internalDate: string;
  dateParsed: Date;
  from: string;
  received: string;
  receivedSPF: string;
  subject: string;
  listUnsubscribe: string;
  mailto: string;
  status: AllowedStatusTypes;
  link: string;
  links: Record<string, string>[];
  googleSheetsLink: string;
  domain: string;
  geoData: GeoData[] | null;
}
