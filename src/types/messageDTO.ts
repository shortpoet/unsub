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
  status?:
    | 'HAS_UNSUB_LINK'
    | 'HAS_MAILTO'
    | '--> HAS_MANY_LINKS <--'
    | 'HAS_DATA'
    | null;
  link?: string | null;
  links?: Record<string, string>[] | null;
  googleSheetsLink?: string | null;
  domain?: string | null;
}

const domain_regex = /@([a-zA-Z0-9-.]+)/;

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
    links,
    status
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
    listUnsubscribe: string | null;
    status?:
      | 'HAS_UNSUB_LINK'
      | 'HAS_MAILTO'
      | '--> HAS_MANY_LINKS <--'
      | 'HAS_DATA'
      | null;
    link?: string | null;
    links?: Record<string, string>[] | null;
    googleSheetsLink?: string | null;
    domain?: string | null;
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
    this.snippet = snippet || '';
    this.status = status || null;
    this.link = `https://mail.google.com/mail/u/0/#inbox/${gmailId}`;
    this.links = links || [];
    this.googleSheetsLink = `=HYPERLINK("https://mail.google.com/mail/u/0/#inbox/${this.gmailId}#", "View")`;
    this.domain = this.from.match(domain_regex)?.[1] || '';
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
  status:
    | 'HAS_UNSUB_LINK'
    | 'HAS_MAILTO'
    | '--> HAS_MANY_LINKS <--'
    | 'HAS_DATA'
    | null;
  link: string;
  links: Record<string, string>[];
  googleSheetsLink: string;
  domain: string;
}
