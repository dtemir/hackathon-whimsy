import Image from 'next/image';
import Link from 'next/link';
import hackerWhimsy from 'public/hackerwhimsy.png';

const navItems = [];

export function Header() {
    return (
        <nav className="flex flex-wrap items-center gap-4 pt-6 pb-12 sm:pt-6 sm:pb-12">
            <Link href="/">
                <Image src={hackerWhimsy} alt="Hacker Whimsy" width={700} height={500}/>
            </Link>
            {!!navItems?.length && (
                <ul className="flex flex-wrap gap-x-4 gap-y-1">
                    {navItems.map((item, index) => (
                        <li key={index}>
                            <Link
                                href={item.href}
                                className="inline-block px-1.5 py-1 transition hover:opacity-80 sm:px-3 sm:py-2"
                            >
                                {item.linkText}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </nav>
    );
}
