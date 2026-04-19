import type { Metadata } from "next";
import { LegalDocument } from "@/components/legal/LegalDocument";

export const metadata: Metadata = {
	title: "Privacy Policy",
	description:
		"How BuildInc collects, uses, and protects personal information.",
};

export default function PrivacyPage() {
	return (
		<LegalDocument
			title="Privacy Policy"
			lastUpdated="19 April 2026"
		>
			<section>
				<h2 id="intro">1. Introduction</h2>
				<p>
					This Privacy Policy describes how BuildInc (&quot;we&quot;,
					&quot;us&quot;, or &quot;our&quot;) handles personal
					information when you use our website and application
					available at{" "}
					<a href="https://buildinc.app">https://buildinc.app</a> (the
					&quot;Service&quot;). We are committed to protecting your
					privacy and being transparent about our practices.
				</p>
				<p>
					By using the Service, you acknowledge that you have read
					this policy. If you do not agree, please do not use the
					Service.
				</p>
			</section>

			<section>
				<h2 id="controller">2. Who is responsible?</h2>
				<p>
					The data controller for personal information processed
					through the Service is the operator of BuildInc. For
					privacy-related requests, contact us at{" "}
					<a href="mailto:privacy@buildinc.app">privacy@buildinc.app</a>
					.
				</p>
			</section>

			<section>
				<h2 id="collect">3. Information we collect</h2>
				<p>We may collect the following categories of information:</p>
				<ul>
					<li>
						<strong>Account and profile data:</strong> such as your
						name, email address, password (stored securely by our
						authentication provider), optional profile details you
						choose to provide, and your role or organisation
						membership within the Service.
					</li>
					<li>
						<strong>Content you submit:</strong> including project,
						organisation, task, approval, material, and related
						information you or your organisation adds to the
						Service.
					</li>
					<li>
						<strong>Technical and usage data:</strong> such as IP
						address, browser type, device information, general
						logs, and timestamps. Our hosting and infrastructure
						providers may process this data when you access the
						Service.
					</li>
					<li>
						<strong>Communications:</strong> if you email us for
						support or feedback, we retain those messages as needed
						to respond and improve the Service.
					</li>
				</ul>
			</section>

			<section>
				<h2 id="use">4. How we use information</h2>
				<p>We use personal information to:</p>
				<ul>
					<li>Provide, operate, and maintain the Service;</li>
					<li>
						Authenticate users, enforce security, and prevent abuse;
					</li>
					<li>
						Display and sync your data within organisations and
						projects you belong to;
					</li>
					<li>
						Communicate with you about the Service (e.g. email
						verification, password reset, important notices);
					</li>
					<li>
						Comply with legal obligations and respond to lawful
						requests.
					</li>
				</ul>
				<p>
					We do not sell your personal information. We do not use it
					for third-party advertising in the current version of the
					Service.
				</p>
			</section>

			<section>
				<h2 id="legal-bases">5. Legal bases (EEA, UK, and similar)</h2>
				<p>
					Where applicable data protection law requires a legal basis,
					we rely on: performance of a contract (providing the Service
					you signed up for); legitimate interests (e.g. securing the
					Service, improving reliability, and limited analytics that do
					not override your rights); and consent where we specifically
					ask for it.
				</p>
			</section>

			<section>
				<h2 id="sharing">6. Service providers and sharing</h2>
				<p>
					We use trusted third-party infrastructure to run the Service.
					These providers process data on our behalf under appropriate
					agreements. They include, for example:
				</p>
				<ul>
					<li>
						<strong>Supabase</strong> (authentication, database, and
						related backend services);
					</li>
					<li>
						<strong>Vercel</strong> (or comparable hosting) for
						serving the web application.
					</li>
				</ul>
				<p>
					We may also disclose information if required by law, to
					protect rights and safety, or in connection with a business
					transfer (such as a merger), subject to applicable law.
				</p>
				<p>
					Other users in your organisation or project may see content
					you submit according to the permissions and features of the
					Service.
				</p>
			</section>

			<section>
				<h2 id="retention">7. Retention</h2>
				<p>
					We retain personal information for as long as your account is
					active or as needed to provide the Service. We may retain
					certain records longer where required by law, for security, or
					to resolve disputes. You may request deletion of your account
					subject to any legal or contractual retention needs.
				</p>
			</section>

			<section>
				<h2 id="security">8. Security</h2>
				<p>
					We implement appropriate technical and organisational
					measures designed to protect personal information. No method
					of transmission or storage is completely secure; we encourage
					strong passwords and careful sharing of access within your
					team.
				</p>
			</section>

			<section>
				<h2 id="rights">9. Your rights</h2>
				<p>
					Depending on where you live, you may have rights to access,
					correct, delete, or restrict processing of your personal
					information, to data portability, and to object to certain
					processing. You may also have the right to lodge a complaint
					with a supervisory authority.
				</p>
				<p>
					To exercise these rights, contact{" "}
					<a href="mailto:privacy@buildinc.app">privacy@buildinc.app</a>
					. We will respond within the timeframes required by
					applicable law.
				</p>
			</section>

			<section>
				<h2 id="transfers">10. International transfers</h2>
				<p>
					Our service providers may process data in countries other
					than your own. Where required, we use appropriate safeguards
					(such as standard contractual clauses) to protect personal
					information transferred internationally.
				</p>
			</section>

			<section>
				<h2 id="children">11. Children</h2>
				<p>
					The Service is not directed at children under 16 (or the age
					required in your jurisdiction). We do not knowingly collect
					personal information from children. If you believe we have,
					please contact us so we can delete it.
				</p>
			</section>

			<section>
				<h2 id="changes">12. Changes to this policy</h2>
				<p>
					We may update this Privacy Policy from time to time. We will
					post the updated version on this page and adjust the
					&quot;Last updated&quot; date. For material changes, we may
					provide additional notice (for example, by email or in-app
					message).
				</p>
			</section>

			<section>
				<h2 id="contact">13. Contact</h2>
				<p>
					Questions about this Privacy Policy:{" "}
					<a href="mailto:privacy@buildinc.app">privacy@buildinc.app</a>
					.
				</p>
				<p>
					For how we use cookies and similar technologies, see our{" "}
					<a href="/cookies">Cookie notice</a>.
				</p>
			</section>
		</LegalDocument>
	);
}
