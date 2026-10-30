import Link from "next/link"
import { Header } from "@/components/home/header"
import { Footer } from "@/components/home/footer"
import { Button } from "@/components/ui/button"
import { IconArrowLeft, IconSearch, IconBuildingEstate } from "@tabler/icons-react"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-surface font-sans text-on-surface">
      <Header />

      <main className="flex flex-1 flex-col items-center justify-center p-6 text-center pt-24 pb-16">
        <div className="relative mb-6 flex items-center justify-center">
          <div className="absolute h-32 w-32 rounded-full bg-secondary/15 blur-2xl" />
          <div className="relative flex h-20 w-20 items-center justify-center rounded-3xl border border-outline-variant/30 bg-surface-container text-secondary shadow-md">
            <IconBuildingEstate size={40} />
          </div>
        </div>

        <span className="font-mono text-xs font-black uppercase tracking-widest text-secondary">
          Error 404 • Resource Not Found
        </span>

        <h1 className="mt-2 text-3xl font-black tracking-tight text-on-surface sm:text-4xl max-w-lg">
          The Requested Enclave Dossier Does Not Exist
        </h1>

        <p className="mt-3 text-sm text-on-surface-variant max-w-md leading-relaxed">
          The property listing, closing room, or administrative node you are attempting to access may have been delisted, settled, or restricted under non-disclosure parameters.
        </p>

        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <Link href="/">
            <Button
              className="h-10 rounded-xl bg-primary px-5 text-xs font-bold text-primary-foreground hover:bg-primary/90 shadow-sm gap-2"
            >
              <IconArrowLeft size={15} />
              <span>Return to Public Radar</span>
            </Button>
          </Link>

          <Link href="/properties">
            <Button
              variant="outline"
              className="h-10 rounded-xl border-outline-variant/40 px-4 text-xs font-bold hover:bg-surface-container gap-1.5"
            >
              <IconSearch size={15} />
              <span>Explore Active Listings</span>
            </Button>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  )
}
