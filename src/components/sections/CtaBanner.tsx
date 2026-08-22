import { finalCta } from "@/config/site";
import { CtaButton, Reveal } from "@/components/ui";
import { LeadForm } from "@/components/lead/LeadForm";

export function CtaBanner() {
  return (
    <section className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] border border-violet/30 bg-gradient-to-br from-violet/20 via-surface to-cyan/10 p-8 sm:p-12 lg:p-16">
            <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-violet/30 blur-[100px] blob" />
            <div className="pointer-events-none absolute -bottom-20 -left-10 h-72 w-72 rounded-full bg-cyan/20 blur-[100px] blob" style={{ animationDelay: "-5s" }} />

            <div className="relative grid items-center gap-10 lg:grid-cols-2">
              <div>
                <h2 className="font-display text-3xl font-extrabold leading-tight sm:text-4xl">
                  {finalCta.title}
                </h2>
                <p className="mt-4 max-w-md text-lg text-muted">{finalCta.text}</p>
                <div className="mt-8">
                  <CtaButton source="cta-banner">{finalCta.button}</CtaButton>
                </div>
              </div>

              <div className="rounded-3xl border border-border bg-bg/70 p-6 backdrop-blur sm:p-8">
                <LeadForm
                  variant="compact"
                  title="Оставьте заявку"
                  subtitle="Ответим и предложим удобное время консультации."
                />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
