import React, { useState, useEffect } from 'react';
import { Section, SectionContent } from '../UI';
import { InfoBox, InfoBoxTitle, InfoBoxText } from '../InfoBox';
import { GmailMessageDTO } from '../../types/messageDTO';
import { theme } from '../../Theme';

export function CountSection(props: { messages: GmailMessageDTO[] }) {
  const [messages, setMessages] = useState([] as GmailMessageDTO[]);
  const [count, setCount] = useState({
    hasData: 0,
    hasUnsub: 0,
    hasMailto: 0,
    hasManyLinks: 0
  });
  useEffect(() => {
    setMessages(props.messages);
  }, [props]);

  const getCount = async (messages: GmailMessageDTO[]) => {
    const count = {
      hasData: 0,
      hasUnsub: 0,
      hasMailto: 0,
      hasManyLinks: 0
    };
    messages.forEach((message: GmailMessageDTO) => {
      if (message.status === 'HAS_DATA') {
        count.hasData++;
      }
      if (message.status === 'HAS_UNSUB_LINK') {
        count.hasUnsub++;
      }
      if (message.status === 'HAS_MAILTO') {
        count.hasMailto++;
      }
      if (message.status === '--> HAS_MANY_LINKS <--') {
        count.hasManyLinks++;
      }
    });
    setCount(count);
  };

  useEffect(() => {
    // getCount(messages);
    if (messages) {
      const { hasData, hasUnsub, hasMailto, hasManyLinks } = messages.reduce(
        (acc, message) => {
          if (message.status === 'HAS_DATA') {
            acc.hasData++;
          } else if (message.status === 'HAS_UNSUB_LINK') {
            acc.hasUnsub++;
          } else if (message.status === 'HAS_MAILTO') {
            acc.hasMailto++;
          } else if (message.status === '--> HAS_MANY_LINKS <--') {
            acc.hasManyLinks++;
          }
          return acc;
        },
        { hasData: 0, hasUnsub: 0, hasMailto: 0, hasManyLinks: 0 }
      );
      setCount({ hasData, hasUnsub, hasMailto, hasManyLinks });
    }
  }, [messages]);

  return (
    <Section>
      <SectionContent justify="space-around" theme={theme}>
        {count.hasData > 0 ? (
          <InfoBox>
            <InfoBoxTitle>Count Has Data</InfoBoxTitle>
            <InfoBoxText>
              {count.hasData.toLocaleString('en-US', {
                maximumFractionDigits: 0
              })}
            </InfoBoxText>
          </InfoBox>
        ) : null}
        {count.hasUnsub > 0 ? (
          <InfoBox>
            <InfoBoxTitle>Count Has Unsub Link</InfoBoxTitle>
            <InfoBoxText>
              {count.hasUnsub.toLocaleString('en-US', {
                maximumFractionDigits: 0
              })}
            </InfoBoxText>
          </InfoBox>
        ) : null}
        {count.hasMailto > 0 ? (
          <InfoBox>
            <InfoBoxTitle>Count Has Mailto</InfoBoxTitle>
            <InfoBoxText>
              {count.hasMailto.toLocaleString('en-US', {
                maximumFractionDigits: 0
              })}
            </InfoBoxText>
          </InfoBox>
        ) : null}
        {count.hasManyLinks > 0 ? (
          <InfoBox>
            <InfoBoxTitle>Count Has Many Links</InfoBoxTitle>
            <InfoBoxText>
              {count.hasManyLinks.toLocaleString('en-US', {
                maximumFractionDigits: 0
              })}
            </InfoBoxText>
          </InfoBox>
        ) : null}
      </SectionContent>
    </Section>
  );
}
