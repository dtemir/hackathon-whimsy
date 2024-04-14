'use state'
import Quiz from '../components/quiz';

export default function Page() {
    return (
        <main className="flex flex-col gap-2 sm:gap-16">
            <section className="flex flex-col items-start gap-1 sm:gap-4">
                <h1 className="mb-0">What Hackathon are You?</h1>
                {/* <p className="text-lg">You ever ask yourself, what should I do with my life?</p> */}
            </section>
            <Quiz />
        </main>
    );
}
