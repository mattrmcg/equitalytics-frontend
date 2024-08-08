import { GitHubLogoIcon } from "@radix-ui/react-icons"
import { LinkedInLogoIcon } from "@radix-ui/react-icons"
import { buttonVariants } from "@/components/ui/button"

export const Footer = () => {
    return (
        <footer id="footer">
            <hr className="min-w-full mx-auto" />

            <section className="container text-center p-2 pb-0 max-w-[65%]">
                <p className="text-sm text-muted-foreground">
                    <span className="text-sm font-bold">Disclaimer:</span> Data is sourced directly from the SEC and is extracted from each reporting entity&apos;s latest yearly filings. Data is not
                    guaranteed to be accurate or up-to-date, and inconsistencies in the availability of data may occur. Equitalytics
                    is intended to be used solely as an educational tool and should not be construed as financial or investment advice.
                    Equitalytics and any affiliated parties disclaim any responsibility for errors or omissions in the information provided or for any actions taken
                    based upon this information.

                </p>
            </section>
            <section className="container p-4 text-center">
                <h3>
                    &copy; 2024 Equitalytics built by {" "}
                    <a
                        rel="noreferrer noopener"
                        target="_blank"
                        href="https://github.com/mattrmcg"
                        className="text-primary transition-all border-primary hover:border-b-2"
                    >
                        Matt McGuire
                    </a>
                </h3>
                <section className="container text-center p-1">
                    <a
                        rel="noreferrer noopener"
                        target="_blank"
                        href="https://www.linkedin.com/in/mattmgr/"
                        className={`${buttonVariants({ variant: "ghost" })}`}
                    >
                        <LinkedInLogoIcon className="w-8 h-8" />
                    </a>
                    <a
                        rel="noreferrer noopener"
                        target="_blank"
                        href="https://github.com/mattrmcg"
                        className={`${buttonVariants({ variant: "ghost" })}`}
                    >
                        <GitHubLogoIcon className="w-8 h-8"/>
                    </a>

                </section>
                {/* <h3>
                    Follow me on {" "}
                    <a
                        rel="noreferrer noopener"
                        target="_blank"
                        href="https://www.linkedin.com/in/mattmgr/"
                        className="text-primary transition-all border-primary hover:border-b-2"
                    >
                        LinkedIn
                    </a>
                    
                </h3> */}
            </section>
        </footer>
    );
};