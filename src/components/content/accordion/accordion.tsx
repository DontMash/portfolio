import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export type AccordionItemData = {
  title: string;
  body: readonly string[];
};

export type AccordionProps = {
  multiple?: boolean;
  items: readonly AccordionItemData[];
};

export default function AccordionIsland({
  multiple = false,
  items,
}: AccordionProps) {
  return (
    <Accordion multiple={multiple}>
      {items.map((item, index) => (
        <AccordionItem key={`${item.title}-${index}`} value={`item-${index}`}>
          <AccordionTrigger>{item.title}</AccordionTrigger>
          <AccordionContent>
            {item.body.map((paragraph, paragraphIndex) => (
              <p key={paragraphIndex}>{paragraph}</p>
            ))}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
