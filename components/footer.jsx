import Link from 'next/link';

export function Footer() {
    return (
        <footer className="pt-16 pb-12 sm:pt-24 sm:pb-16">
            <p className="text-sm">
                <Link href="https://github.com/dtemir/hackathon-whimsy" className="underline transition decoration-dashed text-primary underline-offset-8 hover:opacity-80">
                    Built with ❤️ for HackKU 2024
                </Link>
            </p>
        </footer>
    );
};
