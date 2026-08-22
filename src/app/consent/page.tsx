import type { Metadata } from "next";
import Link from "next/link";
import { site, company } from "@/config/site";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { Icon } from "@/components/Icon";

export const metadata: Metadata = {
  title: "Согласие на обработку персональных данных",
  description: `Согласие на обработку персональных данных оператора ${company.legalName} (${site.name}).`,
  alternates: { canonical: "/consent" },
  robots: { index: true, follow: true },
};

function Section({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className="font-display text-xl font-bold sm:text-2xl">
        <span className="text-gradient">{n}.</span> {title}
      </h2>
      <div className="mt-3 space-y-3 text-muted [&_li]:ml-1">{children}</div>
    </section>
  );
}

export default function ConsentPage() {
  const updated = "22 августа 2026 г.";

  return (
    <>
      <Header />
      <main className="relative overflow-hidden pt-32 pb-20 sm:pt-40">
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-40" />
        <div className="pointer-events-none absolute -left-32 top-20 h-80 w-80 rounded-full bg-cyan/15 blur-[120px]" />

        <div className="relative mx-auto max-w-3xl px-6">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted transition hover:text-fg">
            <Icon name="arrow" size={16} className="rotate-180" />
            На главную
          </Link>

          <h1 className="mt-6 font-display text-3xl font-extrabold leading-tight sm:text-4xl">
            Согласие на обработку{" "}
            <span className="text-gradient">персональных данных</span>
          </h1>

          <div className="mt-6 rounded-2xl border border-border bg-surface/60 p-5 text-sm text-muted">
            Настоящим, отправляя заявку через формы на сайте онлайн-школы «{site.name}», пользователь
            (далее — «Субъект») свободно, своей волей и в своём интересе даёт согласие на обработку
            своих персональных данных оператору{" "}
            <strong className="text-fg">{company.legalName}</strong> на условиях, изложенных ниже, в
            соответствии с Федеральным законом от 27.07.2006 № 152-ФЗ «О персональных данных».
          </div>

          <div className="mt-4 rounded-2xl border border-border bg-surface/40 p-5 text-sm text-muted">
            <p>
              <strong className="text-fg">Оператор:</strong> {company.legalName}
            </p>
            <p className="mt-1">
              <strong className="text-fg">ОГРН:</strong> {company.ogrn} · <strong className="text-fg">ИНН:</strong>{" "}
              {company.inn}
            </p>
            <p className="mt-1">
              <strong className="text-fg">Адрес:</strong> {company.address}
            </p>
            <p className="mt-1">
              <strong className="text-fg">E-mail:</strong>{" "}
              <a href={`mailto:${company.email}`} className="text-violet hover:text-cyan">
                {company.email}
              </a>
            </p>
          </div>

          <p className="mt-4 text-sm text-muted">Дата последнего обновления: {updated}</p>

          <Section n={1} title="Перечень персональных данных, на обработку которых даётся согласие">
            <p>Субъект даёт согласие на обработку следующих персональных данных:</p>
            <ul className="list-disc space-y-1.5 pl-5">
              <li>имя (и/или имя родителя);</li>
              <li>номер контактного телефона;</li>
              <li>адрес электронной почты (при наличии);</li>
              <li>идентификатор в мессенджерах (Telegram, WhatsApp) — при добровольном указании;</li>
              <li>возраст ребёнка;</li>
              <li>сведения об интересующем направлении обучения и выбранном тарифе;</li>
              <li>иная информация, добровольно сообщённая Субъектом в комментарии к заявке.</li>
            </ul>
          </Section>

          <Section n={2} title="Цели обработки персональных данных">
            <ul className="list-disc space-y-1.5 pl-5">
              <li>обработка заявки и установление обратной связи с Субъектом;</li>
              <li>консультирование и подбор программы обучения;</li>
              <li>заключение и исполнение договора об оказании образовательных услуг;</li>
              <li>информирование об услугах, акциях и расписании занятий (при согласии Субъекта).</li>
            </ul>
          </Section>

          <Section n={3} title="Перечень действий с персональными данными">
            <p>
              Согласие даётся на совершение следующих действий: сбор, запись, систематизация,
              накопление, хранение, уточнение (обновление, изменение), извлечение, использование,
              передача (предоставление, доступ) уполномоченным лицам, блокирование, удаление и
              уничтожение персональных данных.
            </p>
            <p>
              Обработка персональных данных может осуществляться как с использованием средств
              автоматизации, так и без их использования.
            </p>
          </Section>

          <Section n={4} title="Передача персональных данных">
            <p>
              Оператор не передаёт персональные данные третьим лицам, за исключением случаев,
              предусмотренных законодательством РФ, а также случаев, необходимых для обработки заявки
              (в том числе передачи в используемый Оператором мессенджер Telegram).
            </p>
          </Section>

          <Section n={5} title="Срок действия согласия">
            <p>
              Согласие действует с момента его предоставления и до достижения целей обработки либо до
              момента его отзыва Субъектом.
            </p>
          </Section>

          <Section n={6} title="Порядок отзыва согласия">
            <p>
              Согласие может быть отозвано Субъектом в любой момент путём направления письменного
              уведомления на адрес электронной почты Оператора:{" "}
              <a href={`mailto:${company.email}`} className="text-violet hover:text-cyan">
                {company.email}
              </a>
              .
            </p>
            <p>
              После получения отзыва Оператор прекращает обработку персональных данных и уничтожает их
              в сроки, установленные законодательством РФ, если отсутствуют иные законные основания для
              их дальнейшей обработки.
            </p>
          </Section>

          <Section n={7} title="Подтверждение">
            <p>
              Проставляя отметку о согласии и отправляя заявку, Субъект подтверждает, что ознакомлен с
              настоящим Согласием и{" "}
              <Link href="/privacy" className="text-violet hover:text-cyan">
                Политикой обработки персональных данных
              </Link>
              , а также что указанные им данные достоверны. В случае указания данных ребёнка Субъект
              подтверждает, что является его законным представителем.
            </p>
          </Section>
        </div>
      </main>
      <Footer />
    </>
  );
}
