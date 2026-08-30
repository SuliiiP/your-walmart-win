import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, Lock, ShieldCheck, Star, Truck } from "lucide-react";

const OFFER_URL = "https://giftclick.org/aff_c?offer_id=1911&aff_id=173888";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Apply For Walmart $750 Today | 30-Second Clothing Savings Quiz" },
      {
        name: "description",
        content:
          "Answer 2 quick questions about how you shop for groceries and apply for the Walmart $750 shopping credit opportunity. US residents 18+. Participation required.",
      },
      { property: "og:title", content: "Apply For Walmart $750 Today" },
      {
        property: "og:description",
        content:
          "Take the quick grocery savings quiz and apply for the Walmart $750 shopping credit opportunity. US only.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Lander,
});

const questions = [
  {
    id: "spend",
    title: "How much do you usually spend on groceries each month?",
    subtitle: "This helps us match you with the right savings offers.",
    options: ["Under $200", "$200 – $500", "$500 – $800", "More than $800"],
  },
  {
    id: "shop",
    title: "What would you put a $750 Walmart shopping credit toward first?",
    subtitle: "Pick the one closest to what you need right now.",
    options: [
      "Weekly groceries & fresh produce",
      "Bulk pantry staples & household items",
      "Baby food, snacks & family essentials",
      "A full month of grocery stock-up",
    ],
  },
];

function Lander() {
  const [step, setStep] = useState(0); // 0,1 = questions, 2 = form
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", zip: "" });
  const [submitting, setSubmitting] = useState(false);

  const totalSteps = 3;
  const progress = Math.round((step / totalSteps) * 100) + 10;

  const answer = (id: string, value: string) => {
    setAnswers((a) => ({ ...a, [id]: value }));
    setTimeout(() => setStep((s) => s + 1), 180);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    window.location.href = OFFER_URL;
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-[image:var(--gradient-hero)] px-4 pb-8 pt-5 text-primary-foreground">
        <div className="mx-auto max-w-md">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-sm font-semibold tracking-wide">
              <Star className="size-5 fill-secondary text-secondary" />
              Savings Rewards
            </span>
            <span className="rounded-full bg-secondary px-3 py-1 text-xs font-bold text-secondary-foreground">
              US ONLY · 18+
            </span>
          </div>

          <h1 className="mt-6 text-3xl font-extrabold leading-tight sm:text-4xl">
            Apply For Walmart $750 Today
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-primary-foreground/85">
            Answer 2 quick questions about how you shop for groceries, then complete your
            details to apply for the $750 Walmart shopping credit opportunity.
          </p>

          <div className="mt-5 flex flex-wrap gap-3 text-xs font-medium text-primary-foreground/85">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="size-4 text-secondary" /> Secure form
            </span>
            <span className="flex items-center gap-1.5">
              <Truck className="size-4 text-secondary" /> Shop in-store or online
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="size-4 text-secondary" /> Quick application
            </span>
          </div>
        </div>
      </header>

      <main className="px-4 pb-14">
        <div className="mx-auto -mt-5 max-w-md rounded-2xl bg-card p-5 shadow-[var(--shadow-card)]">
          <div className="mb-5">
            <div className="mb-2 flex items-center justify-between text-xs font-semibold text-muted-foreground">
              <span>
                {step < 2 ? `Question ${step + 1} of 2` : "Final step: your details"}
              </span>
              <span>{Math.min(progress, 100)}% complete</span>
            </div>
            <Progress value={Math.min(progress, 100)} className="h-2" />
          </div>

          {step < 2 && questions[step] ? (
            <section key={questions[step]!.id}>
              <h2 className="text-xl font-bold text-foreground">{questions[step]!.title}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{questions[step]!.subtitle}</p>
              <div className="mt-4 grid gap-3">
                {questions[step]!.options.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => answer(questions[step]!.id, opt)}
                    className="flex w-full items-center justify-between rounded-xl border-2 border-border bg-card px-4 py-4 text-left text-base font-semibold text-foreground transition-all active:scale-[0.99] hover:border-primary hover:bg-accent"
                  >
                    {opt}
                    <span className="ml-3 size-5 shrink-0 rounded-full border-2 border-border" />
                  </button>
                ))}
              </div>
              {step === 1 && (
                <button
                  type="button"
                  onClick={() => setStep(0)}
                  className="mt-4 text-sm font-medium text-muted-foreground underline"
                >
                  Back
                </button>
              )}
            </section>
          ) : (
            <section>
              <div className="mb-4 rounded-xl bg-accent px-4 py-3 text-sm font-semibold text-accent-foreground">
                Nice — your answers are in. Complete the last step to submit your
                application.
              </div>
              <h2 className="text-xl font-bold text-foreground">Where should we send your next steps?</h2>
              <form onSubmit={submit} className="mt-4 grid gap-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="grid gap-1.5">
                    <Label htmlFor="firstName">First name</Label>
                    <Input
                      id="firstName"
                      required
                      autoComplete="given-name"
                      value={form.firstName}
                      onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-1.5">
                    <Label htmlFor="lastName">Last name</Label>
                    <Input
                      id="lastName"
                      required
                      autoComplete="family-name"
                      value={form.lastName}
                      onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                    />
                  </div>
                </div>
                <div className="grid gap-1.5">
                  <Label htmlFor="email">Email address</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    inputMode="email"
                    autoComplete="email"
                    placeholder="you@email.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                </div>
                <div className="grid gap-1.5">
                  <Label htmlFor="zip">US ZIP code</Label>
                  <Input
                    id="zip"
                    required
                    inputMode="numeric"
                    pattern="[0-9]{5}"
                    maxLength={5}
                    autoComplete="postal-code"
                    placeholder="12345"
                    value={form.zip}
                    onChange={(e) => setForm({ ...form, zip: e.target.value })}
                  />
                </div>

                <Button
                  type="submit"
                  disabled={submitting}
                  className="h-14 w-full rounded-xl text-base font-extrabold shadow-[var(--shadow-cta)]"
                >
                  {submitting ? "Submitting…" : "Continue My Application →"}
                </Button>
                <p className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
                  <Lock className="size-3.5" /> Your info is submitted over a secure
                  connection.
                </p>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-sm font-medium text-muted-foreground underline"
                >
                  Back
                </button>
              </form>
            </section>
          )}
        </div>

        <div className="mx-auto mt-6 max-w-md rounded-2xl border border-border bg-card p-5">
          <h3 className="text-base font-bold text-foreground">How it works</h3>
          <ol className="mt-3 grid gap-3 text-sm text-muted-foreground">
            {[
              "Answer 2 quick questions about your grocery budget.",
              "Enter your basic details so your application can be reviewed.",
              "Complete the sponsor's steps on the next page to finish your entry.",
            ].map((t, i) => (
              <li key={t} className="flex gap-3">
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  {i + 1}
                </span>
                <span>{t}</span>
              </li>
            ))}
          </ol>
        </div>

        <p className="mx-auto mt-6 max-w-md text-center text-[11px] leading-relaxed text-muted-foreground">
          This is a promotional offer and an independent advertisement — it is not
          affiliated with, endorsed by, or sponsored by Walmart Inc. Completing this quiz
          and form does not guarantee that you will receive a shopping credit, reward, or
          any other item. Participation requirements, including completing sponsored
          offers, must be met. Open to US residents 18 and over. Message and data rates
          may apply.
        </p>
      </main>
    </div>
  );
}
