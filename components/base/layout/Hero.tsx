import Link from "next/link";

export function Hero() {
	return (
		<div>
			{/* Hero intro */}
			<section className=" min-h-screen min-w-scren flex items-center justify-center bg-secondary">
				<div className=" text-center">
					<h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white">
						Work Smarter, Build Faster
					</h1>

					<p className="mt-4 text-base sm:text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
						with BuildInc
					</p>

					<div className="mt-8 flex flex-row gap-4 items-center justify-center">
						<Link
							href="/auth/login"
							className="inline-block"
						>
							<div
								className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-white text-black font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition"
								aria-label="Get started"
							>
								Log In
							</div>
						</Link>

						<Link
							href="/auth/sign-up"
							className="inline-block"
						>
							<div
								className="inline-flex items-center justify-center px-5 py-3 rounded-lg border border-white/30 text-white hover:bg-white/10 transition"
								aria-label="View documentation"
							>
								Sign Up
							</div>
						</Link>
					</div>
				</div>
			</section>
		</div>
	);
}
