import {
  ArrowUpRight,
  Mail,
  MapPin,
  Send,
} from "lucide-react";

interface ContactProps {
  darkMode: boolean;
}

const Contact = ({ darkMode }: ContactProps) => {
  const textPrimary = darkMode ? "text-white" : "text-slate-900";
  const textSecondary = darkMode
    ? "text-slate-400"
    : "text-slate-600";

  const cardClass = darkMode
    ? "border-white/10 bg-white/[0.03]"
    : "border-slate-200 bg-white";

  return (
    <section
      id="contact"
      className={`relative overflow-hidden px-6 py-24 ${
        darkMode ? "bg-[#070a12]" : "bg-slate-50"
      }`}
    >
      {/* Background glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <div className="mb-4 flex items-center justify-center gap-2">
            <span className="h-px w-8 bg-indigo-500" />

            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-indigo-400">
              Get In Touch
            </span>

            <span className="h-px w-8 bg-indigo-500" />
          </div>

          <h2
            className={`text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl ${textPrimary}`}
          >
            Let's build something{" "}
            <span className="text-indigo-500">great.</span>
          </h2>

          <p
            className={`mt-5 text-sm leading-7 sm:text-base ${textSecondary}`}
          >
            Have a project idea, opportunity, or just want to
            talk about development? Feel free to reach out.
          </p>
        </div>

        {/* Contact grid */}
        <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          {/* Left */}
          <div
            className={`rounded-3xl border p-7 sm:p-8 ${cardClass}`}
          >
            <div className="mb-8">
              <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400">
                Contact Information
              </span>

              <h3
                className={`mt-3 text-2xl font-bold ${textPrimary}`}
              >
                Let's connect
              </h3>

              <p
                className={`mt-3 text-sm leading-6 ${textSecondary}`}
              >
                I'm always open to discussing new projects,
                collaborations, internships, and opportunities.
              </p>
            </div>

            <div className="space-y-4">
              {/* Email */}
              <a
                href="mailto:your-email@example.com"
                className={`group flex items-center gap-4 rounded-2xl border p-4 transition ${
                  darkMode
                    ? "border-white/10 hover:border-indigo-500/40 hover:bg-white/[0.03]"
                    : "border-slate-200 hover:border-indigo-300 hover:bg-slate-50"
                }`}
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-500/10">
                  <Mail
                    size={19}
                    className="text-indigo-400"
                  />
                </div>

                <div className="min-w-0">
                  <p className="text-xs text-slate-500">
                    Email
                  </p>

                  <p
                    className={`mt-1 truncate text-sm font-medium ${textPrimary}`}
                  >
                    your-email@example.com
                  </p>
                </div>

                <ArrowUpRight
                  size={16}
                  className="ml-auto text-slate-500 transition group-hover:text-indigo-400"
                />
              </a>

              {/* Location */}
              <div
                className={`flex items-center gap-4 rounded-2xl border p-4 ${
                  darkMode
                    ? "border-white/10"
                    : "border-slate-200"
                }`}
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-purple-500/10">
                  <MapPin
                    size={19}
                    className="text-purple-400"
                  />
                </div>

                <div>
                  <p className="text-xs text-slate-500">
                    Location
                  </p>

                  <p
                    className={`mt-1 text-sm font-medium ${textPrimary}`}
                  >
                    India
                  </p>
                </div>
              </div>
            </div>

            {/* Availability */}
            <div
              className={`mt-6 rounded-2xl border p-4 ${
                darkMode
                  ? "border-emerald-500/20 bg-emerald-500/5"
                  : "border-emerald-200 bg-emerald-50"
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                </span>

                <span
                  className={`text-xs font-semibold ${
                    darkMode
                      ? "text-emerald-400"
                      : "text-emerald-700"
                  }`}
                >
                  Open to opportunities
                </span>
              </div>

              <p
                className={`mt-2 text-xs leading-5 ${textSecondary}`}
              >
                Currently open to internships, freelance work,
                and interesting development projects.
              </p>
            </div>
          </div>

          {/* Right - form */}
          <div
            className={`rounded-3xl border p-7 sm:p-8 ${cardClass}`}
          >
            <div className="mb-7">
              <h3
                className={`text-xl font-bold ${textPrimary}`}
              >
                Send me a message
              </h3>

              <p
                className={`mt-2 text-sm ${textSecondary}`}
              >
                Tell me a little about what you're working on.
              </p>
            </div>

            <form
              onSubmit={(event) => {
                event.preventDefault();
              }}
              className="space-y-5"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className={`mb-2 block text-xs font-semibold ${textPrimary}`}
                  >
                    Name
                  </label>

                  <input
                    id="name"
                    type="text"
                    placeholder="Your name"
                    className={`w-full rounded-xl border px-4 py-3 text-sm outline-none transition ${
                      darkMode
                        ? "border-white/10 bg-white/[0.03] text-white placeholder:text-slate-600 focus:border-indigo-500/60"
                        : "border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:border-indigo-400"
                    }`}
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className={`mb-2 block text-xs font-semibold ${textPrimary}`}
                  >
                    Email
                  </label>

                  <input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    className={`w-full rounded-xl border px-4 py-3 text-sm outline-none transition ${
                      darkMode
                        ? "border-white/10 bg-white/[0.03] text-white placeholder:text-slate-600 focus:border-indigo-500/60"
                        : "border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:border-indigo-400"
                    }`}
                  />
                </div>
              </div>

              {/* Subject */}
              <div>
                <label
                  htmlFor="subject"
                  className={`mb-2 block text-xs font-semibold ${textPrimary}`}
                >
                  Subject
                </label>

                <input
                  id="subject"
                  type="text"
                  placeholder="What's this about?"
                  className={`w-full rounded-xl border px-4 py-3 text-sm outline-none transition ${
                    darkMode
                      ? "border-white/10 bg-white/[0.03] text-white placeholder:text-slate-600 focus:border-indigo-500/60"
                      : "border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:border-indigo-400"
                  }`}
                />
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className={`mb-2 block text-xs font-semibold ${textPrimary}`}
                >
                  Message
                </label>

                <textarea
                  id="message"
                  rows={6}
                  placeholder="Tell me about your project..."
                  className={`w-full resize-none rounded-xl border px-4 py-3 text-sm outline-none transition ${
                    darkMode
                      ? "border-white/10 bg-white/[0.03] text-white placeholder:text-slate-600 focus:border-indigo-500/60"
                      : "border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:border-indigo-400"
                  }`}
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-indigo-500"
              >
                Send Message

                <Send
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 text-center">
          <p className={`text-xs ${textSecondary}`}>
            Have an idea? Let's turn it into something real.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;