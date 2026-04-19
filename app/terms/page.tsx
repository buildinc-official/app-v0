import type { Metadata } from "next";
import { LegalDocument } from "@/components/legal/LegalDocument";

export const metadata: Metadata = {
	title: "Terms of Service",
	description: "Terms governing your use of BuildInc.",
};

export default function TermsPage() {
	return (
		<LegalDocument
			title="Terms of Service"
			lastUpdated="19 April 2026"
		>
			<section>
				<h2 id="agreement">1. Agreement to these terms</h2>
				<p>
					These Terms of Service (&quot;Terms&quot;) govern your
					access to and use of BuildInc&apos;s website and application
					at{" "}
					<a href="https://buildinc.app">https://buildinc.app</a> (the
					&quot;Service&quot;). By creating an account, accessing, or
					using the Service, you agree to these Terms. If you are
					using the Service on behalf of an organisation, you
					represent that you have authority to bind that organisation,
					and &quot;you&quot; includes that organisation.
				</p>
				<p>
					If you do not agree, do not use the Service. We may update
					these Terms from time to time; the &quot;Last updated&quot;
					date above will change, and continued use after changes
					constitutes acceptance where permitted by law.
				</p>
			</section>

			<section>
				<h2 id="service">2. The Service</h2>
				<p>
					BuildInc provides tools for construction and real estate
					teams to manage organisations, projects, tasks, approvals,
					and related workflows. Features may change as we improve the
					product. The Service may be offered in beta or early access;
					availability and performance are not guaranteed.
				</p>
			</section>

			<section>
				<h2 id="accounts">3. Accounts and security</h2>
				<p>You agree to:</p>
				<ul>
					<li>
						Provide accurate registration information and keep it
						updated;
					</li>
					<li>
						Maintain the confidentiality of your credentials and
						accept responsibility for activity under your account;
					</li>
					<li>
						Notify us promptly at{" "}
						<a href="mailto:support@buildinc.app">
							support@buildinc.app
						</a>{" "}
						if you suspect unauthorised access.
					</li>
				</ul>
				<p>
					We may suspend or terminate accounts that violate these
					Terms or pose a security risk.
				</p>
			</section>

			<section>
				<h2 id="acceptable-use">4. Acceptable use</h2>
				<p>You must not:</p>
				<ul>
					<li>
						Use the Service unlawfully, to harm others, or to
						violate third-party rights;
					</li>
					<li>
						Attempt to probe, scan, or test the vulnerability of the
						Service, or breach authentication or security measures;
					</li>
					<li>
						Interfere with or disrupt the Service or servers or
						networks connected to the Service;
					</li>
					<li>
						Use automated means to access the Service in a way that
						imposes an unreasonable load or circumvents access
						controls, except as we expressly permit;
					</li>
					<li>
						Reverse engineer, decompile, or attempt to extract
						source code from the Service except where applicable law
						allows despite this limitation.
					</li>
				</ul>
			</section>

			<section>
				<h2 id="content">5. Your content</h2>
				<p>
					You retain ownership of data and materials you submit to the
					Service (&quot;Your Content&quot;). You grant us a worldwide,
					non-exclusive licence to host, process, transmit, and display
					Your Content solely to operate, secure, and improve the
					Service for you and your organisation.
				</p>
				<p>
					You are responsible for Your Content and for ensuring you
					have the rights to submit it. We may remove content that
					violates these Terms or applicable law.
				</p>
			</section>

			<section>
				<h2 id="beta">6. Beta, disclaimers</h2>
				<p>
					THE SERVICE IS PROVIDED &quot;AS IS&quot; AND &quot;AS
					AVAILABLE&quot; WITHOUT WARRANTIES OF ANY KIND, WHETHER
					EXPRESS, IMPLIED, OR STATUTORY, INCLUDING IMPLIED WARRANTIES
					OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND
					NON-INFRINGEMENT, TO THE FULLEST EXTENT PERMITTED BY LAW.
				</p>
				<p>
					We do not warrant that the Service will be uninterrupted,
					error-free, or free of harmful components. You use the
					Service at your own risk.
				</p>
			</section>

			<section>
				<h2 id="liability">7. Limitation of liability</h2>
				<p>
					TO THE FULLEST EXTENT PERMITTED BY LAW, BUILDINC AND ITS
					AFFILIATES, OFFICERS, DIRECTORS, EMPLOYEES, AND AGENTS WILL
					NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL,
					CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS,
					DATA, GOODWILL, OR BUSINESS OPPORTUNITY, ARISING OUT OF OR
					RELATED TO YOUR USE OF THE SERVICE, EVEN IF WE HAVE BEEN
					ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
				</p>
				<p>
					TO THE FULLEST EXTENT PERMITTED BY LAW, OUR TOTAL LIABILITY
					FOR ANY CLAIMS ARISING OUT OF OR RELATED TO THE SERVICE WILL
					NOT EXCEED THE GREATER OF (A) THE AMOUNTS YOU PAID US FOR THE
					SERVICE IN THE TWELVE (12) MONTHS BEFORE THE CLAIM OR (B)
					FIFTY POUNDS STERLING (GBP £50), IF YOU HAVE NOT PAID US
					ANYTHING IN THAT PERIOD.
				</p>
				<p>
					Some jurisdictions do not allow certain limitations; in those
					cases, our liability is limited to the maximum extent
					permitted by law.
				</p>
			</section>

			<section>
				<h2 id="indemnity">8. Indemnity</h2>
				<p>
					You will defend and indemnify BuildInc and its affiliates
					against any claims, damages, losses, and expenses (including
					reasonable legal fees) arising from Your Content, your use of
					the Service in violation of these Terms, or your violation of
					any law or third-party rights.
				</p>
			</section>

			<section>
				<h2 id="termination">9. Termination</h2>
				<p>
					You may stop using the Service at any time. We may suspend or
					terminate access to the Service for breach of these Terms,
					legal requirements, or operational reasons, with or without
					notice where permitted by law.
				</p>
				<p>
					Upon termination, your right to use the Service ceases.
					Provisions that by their nature should survive (including
					ownership, disclaimers, limitation of liability, and
					indemnity) will survive.
				</p>
			</section>

			<section>
				<h2 id="general">10. General</h2>
				<p>
					These Terms constitute the entire agreement between you and
					BuildInc regarding the Service and supersede prior
					agreements on the same subject. If any provision is
					unenforceable, the remaining provisions remain in effect.
				</p>
				<p>
					Our failure to enforce a provision is not a waiver. You may
					not assign these Terms without our consent; we may assign
					them in connection with a merger, acquisition, or sale of
					assets.
				</p>
				<p>
					For privacy practices, see our{" "}
					<a href="/privacy">Privacy Policy</a> and{" "}
					<a href="/cookies">Cookie notice</a>.
				</p>
			</section>

			<section>
				<h2 id="contact">11. Contact</h2>
				<p>
					Questions about these Terms:{" "}
					<a href="mailto:support@buildinc.app">support@buildinc.app</a>
					.
				</p>
			</section>
		</LegalDocument>
	);
}
