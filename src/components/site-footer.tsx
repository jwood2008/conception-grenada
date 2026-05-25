import { Mail, MapPin } from "lucide-react";
import { site } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border/60 bg-secondary/40">
      <div className="container-prose grid gap-12 py-16 md:grid-cols-12">
        <div className="md:col-span-6">
          <span className="font-display text-xl font-medium tracking-tight">
            {site.name}
          </span>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
            {site.description}
          </p>
        </div>

        <div className="md:col-span-6">
          <h3 className="eyebrow">Contact</h3>
          <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
            <li className="flex items-start gap-3">
              <Mail className="mt-0.5 h-4 w-4 flex-none text-sand" />
              <a
                href={`mailto:${site.contactEmail}`}
                className="hover:text-foreground"
              >
                {site.contactEmail}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 flex-none text-sand" />
              <span>Point Saline, St. George, Grenada</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border/60">
        <div className="container-prose py-6 text-xs text-muted-foreground">
          © {new Date().getFullYear()} {site.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
