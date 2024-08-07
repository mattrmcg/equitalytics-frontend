import { GitHubLogoIcon } from "@radix-ui/react-icons"
import { LinkedInLogoIcon } from "@radix-ui/react-icons"
import { buttonVariants } from "@/components/ui/button"

export const Footer = () => {
    return (
        <footer id="footer">
            <hr className="min-w-full mx-auto" />

            <section className="container p-8 text-center">
                <h3>
                    &copy; 2024 Equitalytics made by {" "}
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