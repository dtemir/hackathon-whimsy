'use state'
import Quiz from '../components/quiz';

export default function Page() {
    return (
        <main className="flex flex-col gap-2 sm:gap-16">
            <Quiz />
        </main>
    );
}
