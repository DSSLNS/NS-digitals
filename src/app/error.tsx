"use client";

import { useEffect } from "react";
import { Button, ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/section";

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);
  return (
    <section className="py-32">
      <Container className="max-w-2xl text-center">
        <p className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-coral-ink">Something went wrong</p>
        <h1 className="mt-4 text-4xl font-bold sm:text-5xl">We hit an unexpected error.</h1>
        <p className="mt-5 text-lg text-muted">Please try again. If the problem continues, let us know and we&apos;ll look into it.</p>
        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <Button onClick={reset} size="lg">
            Try again
          </Button>
          <ButtonLink href="/" variant="outline" size="lg">
            Back to homepage
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
