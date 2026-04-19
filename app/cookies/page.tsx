import type { Metadata } from "next";
import { LegalDocument } from "@/components/legal/LegalDocument";

export const metadata: Metadata = {
	title: "Cookie notice",
	description: "How BuildInc uses cookies and similar technologies.",
};

export default function CookiesPage() {
	return (
		<LegalDocument
			title="Cookie notice"
			lastUpdated="19 April 2026"
		>
			<section>
				<h2 id="what">1. What are cookies?</h2>
				<p>
					Cookies are small text files stored on your device when you
					visit a website. They are widely used to make sites work, to
					keep you signed in, and to remember preferences. Similar
					technologies include local storage, where we may store data
					in your browser for app functionality.
				</p>
			</section>

			<section>
				<h2 id="how-we-use">2. How BuildInc uses cookies</h2>
				<p>We use cookies and similar technologies that are:</p>
				<ul>
					<li>
						<strong>Strictly necessary for the Service.</strong> Our
						authentication provider (Supabase) sets cookies so you
						can log in securely and stay logged in across pages.
						Without these cookies, sign-in and protected areas of the
						Service will not work reliably.
					</li>
					<li>
						<strong>Functional (optional UI preferences).</strong> We
						may store a cookie to remember interface choices (for
						example, sidebar state) so the layout feels consistent
						when you return.
					</li>
				</ul>
				<p>
					We do not use cookies for third-party advertising on the
					Service in its current form. If we add analytics or marketing
					cookies in the future, we will update this notice and, where
					required, obtain consent before using non-essential cookies.
				</p>
			</section>

			<section>
				<h2 id="third-party">3. Third-party services</h2>
				<p>
					When you use the Service, our infrastructure providers (such
					as hosting and database/authentication services) may set or
					read cookies as part of delivering the product. Their use is
					governed by their own policies and our agreements with them.
				</p>
			</section>

			<section>
				<h2 id="control">4. Your choices</h2>
				<p>
					Most browsers let you block or delete cookies through
					settings. If you block strictly necessary cookies, parts of
					the Service (especially login) may not function. For more on
					how we process personal data, see our{" "}
					<a href="/privacy">Privacy Policy</a>.
				</p>
			</section>

			<section>
				<h2 id="contact">5. Contact</h2>
				<p>
					Questions about this notice:{" "}
					<a href="mailto:privacy@buildinc.app">privacy@buildinc.app</a>
					.
				</p>
			</section>
		</LegalDocument>
	);
}
