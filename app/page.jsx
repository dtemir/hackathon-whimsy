import Quiz from '../components/quiz';  // Adjust the path as necessary based on your project structure

export default function Page() {
    return (
        <main className="flex flex-col gap-8 sm:gap-16">
            <section className="flex flex-col items-start gap-3 sm:gap-4">
                <h1 className="mb-0">What Hackathon are You?</h1>
                <p className="text-lg">You ever ask yourself, what should I do with my life?</p>
            </section>
            <Quiz />
        </main>
    );
}
