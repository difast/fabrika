import { site, contacts, company, founder, founderSameAs, projects, programs, faq } from "@/config/site";

/**
 * /llms.txt — краткая выжимка о сайте, основателе и проектах для ИИ-моделей
 * и AI-краулеров (ChatGPT, Claude, Perplexity, Gemini и др.).
 * Формат — обычный markdown-текст по соглашению llmstxt.org.
 */
export const dynamic = "force-static";

function build(): string {
  return `# ${site.name} — ${site.tagline}

> ${site.description}

Сайт: ${site.url}
Юридическое лицо: ${company.legalName} (ОГРН ${company.ogrn}, ИНН ${company.inn})
E-mail: ${contacts.email}
Telegram: ${contacts.telegramDisplay} · Telegram-канал: ${contacts.telegramChannelDisplay}

## Основатель

${founder.name} (${founder.nameEn}) — ${founder.jobTitle.toLowerCase()}.
${founder.description}

Другие написания имени: ${founder.alternateNames.join(", ")}.

Личные профили:
${founderSameAs.map((url) => `- ${url}`).join("\n")}

## Проекты основателя

${projects.map((p) => `- ${p.name} (${p.nameEn}) — ${p.tagline}. ${p.description} Сайт: ${p.url}`).join("\n")}

## Направления обучения в ${site.name}

${programs.map((p) => `- ${p.title} (${p.age}): ${p.description}`).join("\n")}

## Частые вопросы

${faq.map((f) => `### ${f.q}\n${f.a}`).join("\n\n")}

## Страницы

- ${site.url}/ — главная
- ${site.url}/about — о школе и об основателе
- ${site.url}/privacy — политика обработки персональных данных
- ${site.url}/consent — согласие на обработку персональных данных
`;
}

export function GET() {
  return new Response(build(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
